# 🚀 Guia Rápido - CLI FocusTime

## Configuração Inicial

### 1. Obter API Key da Anthropic

1. Acesse: https://console.anthropic.com/
2. Crie uma conta ou faça login
3. Vá em "API Keys"
4. Crie uma nova chave
5. Copie a chave (começa com `sk-ant-...`)

### 2. Configurar Variável de Ambiente

**Linux/Mac:**
```bash
export ANTHROPIC_API_KEY=sk-ant-api03-...
```

Para tornar permanente, adicione ao `~/.bashrc` ou `~/.zshrc`:
```bash
echo 'export ANTHROPIC_API_KEY=sk-ant-api03-...' >> ~/.bashrc
source ~/.bashrc
```

**Windows (PowerShell):**
```powershell
$env:ANTHROPIC_API_KEY="sk-ant-api03-..."
```

Para tornar permanente:
```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-api03-...", "User")
```

## Uso da CLI

### Criar Perfil

```bash
pnpm focustime setup
```

**Exemplo de sessão:**
```
╔════════════════════════════════════════╗
║      FocusTime - Perfil de Estudos     ║
╚════════════════════════════════════════╝

Qual é o seu nome? Maria Silva

Qual é seu objetivo?
  1. Preparar para uma prova específica
  2. Dominar um conteúdo
  3. Preparação para vestibular/ENEM

Escolha (número): 3

Quais matérias você precisa estudar?
Digite os números separados por vírgula (ex: 1,3,5)
  1. Matemática
  2. Português
  3. Física
  4. Química
  5. Biologia
  ...

Escolha: 1,2,3,4,5

Quais dessas matérias você sente mais dificuldade?
...
```

### Gerar Cronograma

```bash
# Usar último perfil
pnpm focustime schedule

# Perfil específico
pnpm focustime schedule --id 1234567890
```

**Saída:**
```
📅 SEU CRONOGRAMA DE ESTUDOS

🔴 Sessão 1 - 08:00
   Matéria: Física
   Tópico: Conceitos fundamentais de Física
   Duração: 25 minutos

🔴 Sessão 2 - 08:30
   Matéria: Química
   Tópico: Tabela periódica e ligações químicas
   Duração: 25 minutos
   
...

💡 DICAS PARA MANTER O FOCO:

1. Elimine todas as distrações: silencie o celular
2. Use um timer visível para cada sessão
3. Nas pausas: levante, beba água, movimente-se
4. Recompense-se após completar 4 sessões
```

### Praticar com Questões

```bash
# 5 questões (padrão)
pnpm focustime practice

# 10 questões
pnpm focustime practice --num 10

# Perfil específico, 8 questões
pnpm focustime practice --id 1234567890 --num 8
```

**Exemplo de prática:**
```
📝 MODO PRÁTICA

Questão 1/5 [Física]
Um objeto em queda livre possui aceleração de quantos m/s²?

  A. 5 m/s²
  B. 8 m/s²
  C. 10 m/s²
  D. 12 m/s²

Sua resposta (A/B/C/D): C

✓ CORRETO!

💡 Na superfície da Terra, a aceleração da gravidade 
é aproximadamente 10 m/s²
────────────────────────────────────────────────────────

...

🎉 Resultado: 4/5 (80%)
```

### Listar Perfis

```bash
pnpm focustime profiles
```

**Saída:**
```
📚 PERFIS DE ESTUDOS

Maria Silva (ID: 1712926800000)
  Objetivo: vestibular
  Matérias: Matemática, Português, Física, Química, Biologia
  Dificuldades: Física, Química
  Criado em: 12/04/2026
```

## Recursos da IA

### O que a IA faz?

**Geração de Cronograma:**
- ✅ Prioriza automaticamente matérias fracas (60% do tempo)
- ✅ Cria sessões de 25 minutos (Pomodoro para TDAH)
- ✅ Distribui matérias ao longo do dia
- ✅ Adapta ao estilo de aprendizagem do aluno
- ✅ Considera prazo e objetivo
- ✅ Gera dicas personalizadas

**Geração de Questões:**
- ✅ Foca nas matérias com dificuldade
- ✅ Adapta ao nível do aluno
- ✅ Cria explicações detalhadas
- ✅ Varia dificuldade progressivamente
- ✅ Considera estilo de aprendizagem

### Modelo Usado

- **Claude Opus 4.6**: modelo mais inteligente da Anthropic
- **Adaptive Thinking**: IA decide quanto "pensar" em cada resposta
- **High Effort**: máxima qualidade nas respostas

## Dicas de Uso

### Para Alunos com TDAH

1. **Siga o cronograma rigorosamente**
   - Sessões de 25 minutos são ideais para TDAH
   - Não estenda as sessões
   - Pausas são obrigatórias

2. **Elimine distrações**
   - Silencie celular
   - Use fones de ouvido com som branco
   - Trabalhe em ambiente limpo

3. **Use timer visível**
   - Relógio ou app de Pomodoro
   - Ajuda a manter o foco

4. **Recompensas**
   - Após 4 sessões (2 horas): pausa maior
   - Após completar dia: recompensa escolhida

### Para Pais/Tutores

1. **Acompanhe o progresso**
   ```bash
   pnpm focustime profiles
   ```

2. **Gere novo cronograma semanalmente**
   - Ajuste baseado no progresso
   - Mude matérias de foco se necessário

3. **Use modo prática junto**
   - Pratique questões com o aluno
   - Discuta as explicações

## Custos da API

A CLI usa Claude Opus 4.6:
- **Input**: $5.00 por 1M tokens
- **Output**: $25.00 por 1M tokens

**Estimativa de uso:**
- Gerar cronograma: ~$0.05-0.10
- Gerar 5 questões: ~$0.10-0.20
- Custo total mensal (uso diário): ~$5-15

## Troubleshooting

### Erro: ANTHROPIC_API_KEY não configurada

```bash
# Verifique se está configurada
echo $ANTHROPIC_API_KEY

# Configure novamente
export ANTHROPIC_API_KEY=sk-ant-...
```

### Erro: JSON inválido

A IA às vezes retorna texto antes/depois do JSON. O código já trata isso automaticamente com regex. Se persistir:

1. Tente novamente (adaptive thinking pode variar)
2. Verifique se sua API key é válida
3. Verifique se tem créditos na conta

### Comando não encontrado

Use `pnpm focustime` em vez de apenas `focustime`:

```bash
# ✓ Correto
pnpm focustime setup

# ✗ Errado (a menos que instalado globalmente)
focustime setup
```

### Respostas em inglês

Isso não deve acontecer (prompts são em português), mas se acontecer:
1. Tente novamente
2. Adicione "Responda SEMPRE em português" no início da pergunta

## Dados Armazenados

Os perfis são salvos localmente em:
```
.focustime-data/
└── profiles.json
```

**Não contém:**
- ❌ Dados sensíveis
- ❌ Respostas de questões
- ❌ Histórico de uso

**Para limpar dados:**
```bash
rm -rf .focustime-data/
```

## Integração Futura com Supabase

Quando conectar o Supabase:
- ✅ Sincronização entre web e CLI
- ✅ Histórico completo de progresso
- ✅ Múltiplos dispositivos
- ✅ Backup automático
- ✅ Análises avançadas

## Suporte

Problemas? Sugestões?
- Verifique o README.md
- Consulte a documentação da Anthropic: https://docs.anthropic.com/
