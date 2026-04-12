#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import Anthropic from '@anthropic-ai/sdk';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.focustime-data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

type StudyProfile = {
  id: string;
  studentName: string;
  studyGoal: 'prova' | 'conteudo' | 'vestibular';
  subjects: string[];
  weakSubjects: string[];
  preferredStudyMethod: 'visual' | 'auditivo' | 'pratico' | 'leitura';
  availableHoursPerDay: number;
  deadline?: string;
  createdAt: string;
};

type Schedule = {
  sessions: {
    id: string;
    subject: string;
    topic: string;
    duration: number;
    time: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  tips: string[];
};

type Question = {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory exists
  }
}

async function loadProfiles(): Promise<StudyProfile[]> {
  try {
    const data = await fs.readFile(PROFILES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveProfile(profile: StudyProfile) {
  await ensureDataDir();
  const profiles = await loadProfiles();
  profiles.push(profile);
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profiles, null, 2));
}

async function ask(question: string): Promise<string> {
  const rl = createInterface({ input, output });
  const answer = await rl.question(chalk.cyan(`\n${question} `));
  rl.close();
  return answer.trim();
}

async function select(question: string, options: string[]): Promise<number> {
  console.log(chalk.cyan(`\n${question}`));
  options.forEach((opt, i) => {
    console.log(chalk.gray(`  ${i + 1}. ${opt}`));
  });

  const answer = await ask('Escolha (número):');
  const index = parseInt(answer) - 1;

  if (index >= 0 && index < options.length) {
    return index;
  }

  console.log(chalk.red('Opção inválida. Tente novamente.'));
  return select(question, options);
}

async function multiSelect(question: string, options: string[]): Promise<string[]> {
  console.log(chalk.cyan(`\n${question}`));
  console.log(chalk.gray('Digite os números separados por vírgula (ex: 1,3,5)'));
  options.forEach((opt, i) => {
    console.log(chalk.gray(`  ${i + 1}. ${opt}`));
  });

  const answer = await ask('Escolha:');
  const indices = answer.split(',').map(s => parseInt(s.trim()) - 1);
  const selected = indices
    .filter(i => i >= 0 && i < options.length)
    .map(i => options[i]);

  if (selected.length === 0) {
    console.log(chalk.red('Nenhuma opção válida selecionada. Tente novamente.'));
    return multiSelect(question, options);
  }

  return selected;
}

async function createProfile(): Promise<StudyProfile> {
  console.log(chalk.bold.blue('\n╔════════════════════════════════════════╗'));
  console.log(chalk.bold.blue('║      FocusTime - Perfil de Estudos     ║'));
  console.log(chalk.bold.blue('╚════════════════════════════════════════╝\n'));

  const studentName = await ask('Qual é o seu nome?');

  const goalIndex = await select('Qual é seu objetivo?', [
    'Preparar para uma prova específica',
    'Dominar um conteúdo',
    'Preparação para vestibular/ENEM',
  ]);
  const studyGoal = ['prova', 'conteudo', 'vestibular'][goalIndex] as StudyProfile['studyGoal'];

  const commonSubjects = [
    'Matemática', 'Português', 'Física', 'Química', 'Biologia',
    'História', 'Geografia', 'Inglês', 'Filosofia', 'Sociologia',
    'Literatura', 'Redação',
  ];

  const subjects = await multiSelect('Quais matérias você precisa estudar?', commonSubjects);
  const weakSubjects = await multiSelect(
    'Quais dessas matérias você sente mais dificuldade?',
    subjects
  );

  const methodIndex = await select('Como você aprende melhor?', [
    'Visual (gráficos, diagramas, mapas mentais)',
    'Auditivo (vídeos, podcasts, explicações)',
    'Prático (exercícios, simulações, prática)',
    'Leitura/Escrita (textos, resumos, anotações)',
  ]);
  const preferredStudyMethod = ['visual', 'auditivo', 'pratico', 'leitura'][methodIndex] as StudyProfile['preferredStudyMethod'];

  const hoursStr = await ask('Quantas horas por dia você tem disponível? (ex: 3.5)');
  const availableHoursPerDay = parseFloat(hoursStr) || 3;

  const deadline = await ask('Prazo final (opcional, formato YYYY-MM-DD):');

  return {
    id: Date.now().toString(),
    studentName,
    studyGoal,
    subjects,
    weakSubjects,
    preferredStudyMethod,
    availableHoursPerDay,
    deadline: deadline || undefined,
    createdAt: new Date().toISOString(),
  };
}

async function generateSchedule(profile: StudyProfile): Promise<Schedule> {
  const spinner = ora('Gerando cronograma personalizado com IA...').start();

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'high' },
      system: `Você é um especialista em educação e TDAH. Crie cronogramas de estudo fracionados usando a técnica Pomodoro (25 min de foco + 5 min pausa).

IMPORTANTE:
- Priorize matérias fracas (60% do tempo)
- Sessões de 25 minutos são ideais para TDAH
- Distribua matérias ao longo do dia
- Inclua dicas específicas para manter o foco`,
      messages: [
        {
          role: 'user',
          content: `Crie um cronograma de estudos para:
- Nome: ${profile.studentName}
- Objetivo: ${profile.studyGoal}
- Matérias: ${profile.subjects.join(', ')}
- Dificuldades: ${profile.weakSubjects.join(', ')}
- Estilo de aprendizagem: ${profile.preferredStudyMethod}
- Tempo disponível: ${profile.availableHoursPerDay}h/dia
${profile.deadline ? `- Prazo: ${profile.deadline}` : ''}

Retorne um JSON com:
{
  "sessions": [
    {
      "id": "session-1",
      "subject": "Matemática",
      "topic": "Conceitos fundamentais de Matemática",
      "duration": 25,
      "time": "08:00",
      "priority": "high"
    }
  ],
  "tips": ["dica 1", "dica 2", "dica 3", "dica 4", "dica 5"]
}`,
        },
      ],
    });

    spinner.succeed('Cronograma gerado!');

    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === 'text');
    if (!textBlock) throw new Error('Resposta sem conteúdo');

    // Extract JSON from response
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    spinner.fail('Erro ao gerar cronograma');
    throw error;
  }
}

async function generateQuestions(profile: StudyProfile, count: number = 5): Promise<Question[]> {
  const spinner = ora('Gerando questões personalizadas com IA...').start();

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 16000,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'high' },
      system: `Você é um professor especializado em criar questões educacionais. Crie questões focadas nas dificuldades do aluno, com explicações claras.`,
      messages: [
        {
          role: 'user',
          content: `Crie ${count} questões de múltipla escolha focadas nas matérias fracas do aluno:
- Matérias com dificuldade: ${profile.weakSubjects.join(', ')}
- Estilo de aprendizagem: ${profile.preferredStudyMethod}

Retorne um JSON array com:
[
  {
    "id": "q1",
    "subject": "Matemática",
    "question": "Qual é o resultado de 2x + 5 = 13?",
    "options": ["x = 3", "x = 4", "x = 5", "x = 6"],
    "correctAnswer": 1,
    "explanation": "Explicação detalhada da resposta",
    "difficulty": "easy"
  }
]`,
        },
      ],
    });

    spinner.succeed('Questões geradas!');

    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === 'text');
    if (!textBlock) throw new Error('Resposta sem conteúdo');

    const jsonMatch = textBlock.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('JSON não encontrado na resposta');

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    spinner.fail('Erro ao gerar questões');
    throw error;
  }
}

async function displaySchedule(schedule: Schedule) {
  console.log(chalk.bold.green('\n📅 SEU CRONOGRAMA DE ESTUDOS\n'));

  schedule.sessions.forEach((session, index) => {
    const icon = session.priority === 'high' ? '🔴' : session.priority === 'medium' ? '🟡' : '🟢';
    console.log(chalk.bold(`${icon} Sessão ${index + 1} - ${session.time}`));
    console.log(chalk.cyan(`   Matéria: ${session.subject}`));
    console.log(chalk.gray(`   Tópico: ${session.topic}`));
    console.log(chalk.gray(`   Duração: ${session.duration} minutos\n`));
  });

  console.log(chalk.bold.yellow('💡 DICAS PARA MANTER O FOCO:\n'));
  schedule.tips.forEach((tip, i) => {
    console.log(chalk.yellow(`${i + 1}. ${tip}`));
  });
  console.log();
}

async function practiceQuestions(questions: Question[]) {
  console.log(chalk.bold.green('\n📝 MODO PRÁTICA\n'));

  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(chalk.bold.cyan(`\nQuestão ${i + 1}/${questions.length} [${q.subject}]`));
    console.log(chalk.white(q.question + '\n'));

    q.options.forEach((opt, idx) => {
      console.log(chalk.gray(`  ${String.fromCharCode(65 + idx)}. ${opt}`));
    });

    const answer = await ask('\nSua resposta (A/B/C/D):');
    const answerIndex = answer.toUpperCase().charCodeAt(0) - 65;

    if (answerIndex === q.correctAnswer) {
      console.log(chalk.bold.green('✓ CORRETO!'));
      score++;
    } else {
      console.log(chalk.bold.red('✗ INCORRETO'));
      console.log(chalk.yellow(`Resposta correta: ${String.fromCharCode(65 + q.correctAnswer)}`));
    }

    console.log(chalk.gray(`\n💡 ${q.explanation}`));
    console.log(chalk.gray('─'.repeat(60)));
  }

  const percentage = Math.round((score / questions.length) * 100);
  console.log(chalk.bold.green(`\n🎉 Resultado: ${score}/${questions.length} (${percentage}%)\n`));
}

// CLI Commands
const program = new Command();

program
  .name('focustime')
  .description('Sistema de cronograma de estudos para alunos com TDAH')
  .version('1.0.0');

program
  .command('setup')
  .description('Criar novo perfil de estudos')
  .action(async () => {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log(chalk.red('\n❌ ANTHROPIC_API_KEY não configurada!'));
      console.log(chalk.yellow('Configure com: export ANTHROPIC_API_KEY=your-key\n'));
      process.exit(1);
    }

    const profile = await createProfile();
    await saveProfile(profile);

    console.log(chalk.green(`\n✓ Perfil criado com sucesso! ID: ${profile.id}\n`));
  });

program
  .command('schedule')
  .description('Gerar cronograma de estudos')
  .option('-i, --id <id>', 'ID do perfil')
  .action(async (options) => {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log(chalk.red('\n❌ ANTHROPIC_API_KEY não configurada!\n'));
      process.exit(1);
    }

    const profiles = await loadProfiles();
    if (profiles.length === 0) {
      console.log(chalk.yellow('\n⚠ Nenhum perfil encontrado. Execute: focustime setup\n'));
      process.exit(1);
    }

    let profile: StudyProfile;
    if (options.id) {
      profile = profiles.find(p => p.id === options.id)!;
      if (!profile) {
        console.log(chalk.red(`\n❌ Perfil ${options.id} não encontrado\n`));
        process.exit(1);
      }
    } else {
      profile = profiles[profiles.length - 1];
      console.log(chalk.gray(`Usando perfil: ${profile.studentName} (${profile.id})`));
    }

    const schedule = await generateSchedule(profile);
    displaySchedule(schedule);
  });

program
  .command('practice')
  .description('Praticar com questões personalizadas')
  .option('-i, --id <id>', 'ID do perfil')
  .option('-n, --num <number>', 'Número de questões', '5')
  .action(async (options) => {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log(chalk.red('\n❌ ANTHROPIC_API_KEY não configurada!\n'));
      process.exit(1);
    }

    const profiles = await loadProfiles();
    if (profiles.length === 0) {
      console.log(chalk.yellow('\n⚠ Nenhum perfil encontrado. Execute: focustime setup\n'));
      process.exit(1);
    }

    let profile: StudyProfile;
    if (options.id) {
      profile = profiles.find(p => p.id === options.id)!;
      if (!profile) {
        console.log(chalk.red(`\n❌ Perfil ${options.id} não encontrado\n`));
        process.exit(1);
      }
    } else {
      profile = profiles[profiles.length - 1];
      console.log(chalk.gray(`Usando perfil: ${profile.studentName} (${profile.id})`));
    }

    const count = parseInt(options.num);
    const questions = await generateQuestions(profile, count);
    await practiceQuestions(questions);
  });

program
  .command('profiles')
  .description('Listar perfis salvos')
  .action(async () => {
    const profiles = await loadProfiles();

    if (profiles.length === 0) {
      console.log(chalk.yellow('\n⚠ Nenhum perfil encontrado.\n'));
      return;
    }

    console.log(chalk.bold.blue('\n📚 PERFIS DE ESTUDOS\n'));
    profiles.forEach(p => {
      console.log(chalk.bold(`${p.studentName} (ID: ${p.id})`));
      console.log(chalk.gray(`  Objetivo: ${p.studyGoal}`));
      console.log(chalk.gray(`  Matérias: ${p.subjects.join(', ')}`));
      console.log(chalk.gray(`  Dificuldades: ${p.weakSubjects.join(', ')}`));
      console.log(chalk.gray(`  Criado em: ${new Date(p.createdAt).toLocaleDateString('pt-BR')}\n`));
    });
  });

program.parse();
