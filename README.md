# FocusTime - Sistema de Estudos para TDAH

Sistema completo de cronograma de estudos personalizado para alunos com TDAH, com interface web e CLI.

## 🚀 Características

### Interface Web
- **Wizard interativo** com 6 etapas de configuração
- **Cronograma fracionado** usando técnica Pomodoro (25 min)
- **Questões personalizadas** baseadas nas dificuldades
- **Acompanhamento de progresso** com gráficos e métricas
- **Design otimizado para TDAH**: limpo, focado, sem distrações

### CLI (Command Line Interface)
- **Geração de cronogramas** via IA (Claude Opus 4.6)
- **Questões personalizadas** geradas dinamicamente
- **Múltiplos perfis** de estudantes
- **Armazenamento local** de dados

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# Adicionar tsx para executar TypeScript
pnpm add -D tsx
```

## 🔑 Configuração da API Key

O CLI usa Claude API (Anthropic) para gerar conteúdo personalizado.

```bash
export ANTHROPIC_API_KEY=your-api-key-here
```

Ou adicione ao seu `.bashrc` / `.zshrc`:

```bash
echo 'export ANTHROPIC_API_KEY=your-api-key-here' >> ~/.bashrc
source ~/.bashrc
```

## 🖥️ Uso da CLI

### 1. Criar Perfil de Estudos

```bash
pnpm focustime setup
```

Responda as perguntas interativas:
- Nome do estudante
- Objetivo (prova, conteúdo, vestibular)
- Matérias a estudar
- Matérias com dificuldade
- Estilo de aprendizagem
- Tempo disponível por dia
- Prazo (opcional)

### 2. Gerar Cronograma Personalizado

```bash
# Usar o último perfil criado
pnpm focustime schedule

# Usar perfil específico
pnpm focustime schedule --id 1234567890
```

O cronograma é gerado por IA considerando:
- ✅ Priorização de matérias fracas (60% do tempo)
- ✅ Sessões de 25 minutos (ideal para TDAH)
- ✅ Distribuição balanceada ao longo do dia
- ✅ Dicas específicas para manter o foco

### 3. Praticar com Questões

```bash
# 5 questões (padrão)
pnpm focustime practice

# Número específico de questões
pnpm focustime practice --num 10

# Perfil específico
pnpm focustime practice --id 1234567890 --num 8
```

### 4. Listar Perfis

```bash
pnpm focustime profiles
```

## 🌐 Interface Web

A aplicação web já está configurada e pode ser acessada através do Figma Make.

**Recursos:**
- Tela de boas-vindas animada
- Wizard de onboarding passo a passo
- Dashboard com 3 seções:
  - 📅 **Cronograma**: visualização de sessões diárias
  - 📝 **Praticar**: questões interativas com feedback
  - 📊 **Progresso**: gráficos e estatísticas

## 📁 Estrutura de Dados

Os dados da CLI são armazenados em `.focustime-data/`:

```
.focustime-data/
└── profiles.json  # Perfis de estudantes
```

**Formato do perfil:**
```json
{
  "id": "1234567890",
  "studentName": "Maria Silva",
  "studyGoal": "vestibular",
  "subjects": ["Matemática", "Física", "Química"],
  "weakSubjects": ["Física", "Química"],
  "preferredStudyMethod": "visual",
  "availableHoursPerDay": 4,
  "deadline": "2026-11-01",
  "createdAt": "2026-04-12T10:30:00.000Z"
}
```

## 🤖 IA e Personalização

O sistema usa **Claude Opus 4.6** com:
- **Adaptive Thinking**: IA decide dinamicamente quando e quanto "pensar"
- **High Effort**: máxima qualidade nas respostas
- **Prompts especializados**: otimizados para educação e TDAH

### Geração de Cronograma
A IA analisa:
- Objetivo do aluno (prova, conteúdo, vestibular)
- Matérias fracas (prioriza automaticamente)
- Estilo de aprendizagem (adapta abordagem)
- Tempo disponível (distribui sessões)
- Prazo (planeja ritmo de estudo)

### Geração de Questões
A IA cria:
- Questões focadas nas dificuldades
- Múltipla escolha com 4 alternativas
- Explicações detalhadas
- Níveis de dificuldade progressivos

## 🎨 Design para TDAH

**Princípios aplicados:**
- ✅ Uma tarefa por vez
- ✅ Hierarquia visual clara
- ✅ Feedback imediato
- ✅ Gamificação (conquistas, sequências)
- ✅ Sessões curtas (25 min)
- ✅ Pausas obrigatórias
- ✅ Cores calmas e layout respirável
- ✅ Eliminação de distrações

## 🔄 Próximos Passos

### Integração com Supabase (Backend)
Quando conectar o Supabase, o sistema terá:
- ✅ Persistência de dados na nuvem
- ✅ Sincronização entre web e CLI
- ✅ Histórico completo de progresso
- ✅ Geração de questões mais avançadas
- ✅ Análise de desempenho ao longo do tempo
- ✅ Recomendações adaptativas baseadas em uso

## 📝 Comandos Úteis

```bash
# Ver help de qualquer comando
pnpm focustime --help
pnpm focustime setup --help

# Ver versão
pnpm focustime --version

# Executar CLI diretamente
tsx cli.ts setup
```

## 🐛 Troubleshooting

**Erro: ANTHROPIC_API_KEY não configurada**
```bash
export ANTHROPIC_API_KEY=your-key
```

**Erro: comando não encontrado**
```bash
# Use pnpm focustime em vez de apenas focustime
pnpm focustime setup
```

**JSON inválido na resposta da IA**
- A IA pode retornar texto antes/depois do JSON
- O código extrai automaticamente o JSON usando regex
- Se persistir, tente novamente (adaptive thinking pode variar)

## 📄 Licença

Projeto educacional - FocusTime © 2026
