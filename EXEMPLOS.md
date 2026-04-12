# 📚 Exemplos de Uso - FocusTime CLI

## Exemplo Completo: Fluxo de Uso

### 1. Configuração Inicial

```bash
# Configurar API key
export ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Criar primeiro perfil
pnpm focustime setup
```

**Entrada interativa:**
```
Qual é o seu nome? João Pedro

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
  6. História
  7. Geografia
  8. Inglês
Escolha: 1,2,3,4,5,6

Quais dessas matérias você sente mais dificuldade?
  1. Matemática
  2. Português
  3. Física
  4. Química
  5. Biologia
  6. História
Escolha: 3,4,5

Como você aprende melhor?
  1. Visual (gráficos, diagramas, mapas mentais)
  2. Auditivo (vídeos, podcasts, explicações)
  3. Prático (exercícios, simulações, prática)
  4. Leitura/Escrita (textos, resumos, anotações)
Escolha (número): 1

Quantas horas por dia você tem disponível? (ex: 3.5) 4

Prazo final (opcional, formato YYYY-MM-DD): 2026-11-01

✓ Perfil criado com sucesso! ID: 1712926800000
```

### 2. Gerar Cronograma

```bash
pnpm focustime schedule
```

**Saída esperada:**
```
Usando perfil: João Pedro (1712926800000)
⠋ Gerando cronograma personalizado com IA...
✓ Cronograma gerado!

📅 SEU CRONOGRAMA DE ESTUDOS

🔴 Sessão 1 - 08:00
   Matéria: Física
   Tópico: Conceitos fundamentais - Cinemática e MRU
   Duração: 25 minutos

🔴 Sessão 2 - 08:30
   Matéria: Química
   Tópico: Tabela periódica e propriedades periódicas
   Duração: 25 minutos

🔴 Sessão 3 - 09:00
   Matéria: Biologia
   Tópico: Citologia - Estrutura celular
   Duração: 25 minutos

🟡 Sessão 4 - 09:30
   Matéria: Matemática
   Tópico: Revisão de funções do 1º grau
   Duração: 25 minutos

[PAUSA LONGA - 15 minutos]

🔴 Sessão 5 - 10:00
   Matéria: Física
   Tópico: Leis de Newton e aplicações
   Duração: 25 minutos

🔴 Sessão 6 - 10:30
   Matéria: Química
   Tópico: Ligações químicas - Iônica e covalente
   Duração: 25 minutos

🟡 Sessão 7 - 11:00
   Matéria: Português
   Tópico: Interpretação de texto e figuras de linguagem
   Duração: 25 minutos

🟡 Sessão 8 - 11:30
   Matéria: História
   Tópico: Brasil Colonial - Ciclo do açúcar
   Duração: 25 minutos

💡 DICAS PARA MANTER O FOCO:

1. Elimine distrações: desligue notificações do celular e redes sociais
2. Use um timer digital ou aplicativo Pomodoro para acompanhar cada sessão
3. Nas pausas de 5 minutos: levante, beba água, estique o corpo
4. A cada 2 horas (4 sessões), faça pausa de 15-20 minutos
5. Recompense-se ao completar o cronograma diário
```

### 3. Praticar Questões

```bash
pnpm focustime practice --num 3
```

**Saída esperada:**
```
Usando perfil: João Pedro (1712926800000)
⠋ Gerando questões personalizadas com IA...
✓ Questões geradas!

📝 MODO PRÁTICA

Questão 1/3 [Física]
Um carro parte do repouso e acelera uniformemente a 2 m/s². 
Qual será sua velocidade após 5 segundos?

  A. 5 m/s
  B. 10 m/s
  C. 15 m/s
  D. 20 m/s

Sua resposta (A/B/C/D): B

✓ CORRETO!

💡 Usando a equação v = v₀ + at, onde v₀ = 0 (repouso), a = 2 m/s² 
e t = 5s, temos: v = 0 + 2×5 = 10 m/s
────────────────────────────────────────────────────────────

Questão 2/3 [Química]
Qual das alternativas apresenta APENAS elementos do grupo dos metais alcalinos?

  A. Li, Na, K
  B. He, Ne, Ar
  C. F, Cl, Br
  D. C, N, O

Sua resposta (A/B/C/D): A

✓ CORRETO!

💡 Os metais alcalinos são os elementos do grupo 1A da tabela periódica: 
Li (lítio), Na (sódio), K (potássio), Rb, Cs e Fr. São muito reativos 
e formam bases fortes quando reagem com água.
────────────────────────────────────────────────────────────

Questão 3/3 [Biologia]
Qual é a principal função das mitocôndrias?

  A. Síntese de proteínas
  B. Produção de energia (ATP)
  C. Digestão celular
  D. Armazenamento de água

Sua resposta (A/B/C/D): B

✓ CORRETO!

💡 As mitocôndrias são as "usinas de energia" da célula. Elas realizam 
a respiração celular, convertendo glicose e oxigênio em ATP 
(adenosina trifosfato), a moeda energética celular.
────────────────────────────────────────────────────────────

🎉 Resultado: 3/3 (100%)
```

## Exemplos de Diferentes Perfis

### Perfil 1: Prova de Matemática

```bash
pnpm focustime setup

# Respostas:
Nome: Ana Clara
Objetivo: 1 (Preparar para uma prova específica)
Matérias: 1 (Matemática)
Dificuldades: 1 (Matemática)
Estilo: 3 (Prático)
Horas/dia: 2
Prazo: 2026-04-20
```

**Cronograma gerado:**
- Foco 100% em Matemática
- 4 sessões de 25 min
- Exercícios práticos priorizados
- Revisão antes da prova

### Perfil 2: Dominar Inglês

```bash
pnpm focustime setup

# Respostas:
Nome: Carlos Eduardo
Objetivo: 2 (Dominar um conteúdo)
Matérias: 8 (Inglês)
Dificuldades: 8 (Inglês)
Estilo: 2 (Auditivo)
Horas/dia: 1.5
Prazo: (deixar vazio)
```

**Cronograma gerado:**
- 3 sessões diárias
- Ênfase em listening
- Podcasts e vídeos sugeridos
- Sem pressão de prazo

### Perfil 3: ENEM Completo

```bash
pnpm focustime setup

# Respostas:
Nome: Beatriz Santos
Objetivo: 3 (Preparação para vestibular/ENEM)
Matérias: 1,2,3,4,5,6,7,8,9,10,11,12 (todas)
Dificuldades: 3,4,5 (Física, Química, Biologia)
Estilo: 1 (Visual)
Horas/dia: 6
Prazo: 2026-11-01
```

**Cronograma gerado:**
- 12 sessões diárias
- 60% em exatas (dificuldades)
- 40% em humanas e linguagens
- Rotação balanceada
- Mapas mentais sugeridos

## Comandos Avançados

### Múltiplos Perfis

```bash
# Criar perfis para diferentes objetivos
pnpm focustime setup  # Perfil 1: ENEM
pnpm focustime setup  # Perfil 2: Prova de Matemática
pnpm focustime setup  # Perfil 3: Inglês

# Listar todos
pnpm focustime profiles

# Usar perfil específico
pnpm focustime schedule --id 1712926800000
pnpm focustime practice --id 1712927000000 --num 10
```

### Personalização de Questões

```bash
# Poucas questões (aquecimento)
pnpm focustime practice --num 3

# Sessão média (revisão)
pnpm focustime practice --num 10

# Simulado completo
pnpm focustime practice --num 20
```

## Fluxo de Estudo Diário Recomendado

### Manhã (08:00 - 12:00)

```bash
# 1. Gerar cronograma do dia
pnpm focustime schedule

# 2. Seguir sessões Pomodoro
# (fazer manualmente, seguindo cronograma impresso/anotado)

# 3. Após 4 sessões - pausa longa
```

### Tarde (14:00 - 16:00)

```bash
# 4. Continuar cronograma
# (sessões 5-8)

# 5. Praticar questões das matérias estudadas
pnpm focustime practice --num 10
```

### Noite (19:00 - 20:00)

```bash
# 6. Revisão leve
# (ler resumos, revisar anotações)

# 7. Questões finais
pnpm focustime practice --num 5
```

## Dicas de Uso Efetivo

### Para Máximo Aproveitamento

1. **Gere cronograma toda manhã**
   ```bash
   pnpm focustime schedule > cronograma-hoje.txt
   ```

2. **Imprima ou anote** o cronograma
   - Ter físico ajuda no foco

3. **Use timer externo**
   - App Pomodoro no celular (modo avião)
   - Timer de cozinha
   - Relógio

4. **Pratique após estudar**
   - Fixação imediata
   - Feedback rápido

5. **Revise explicações**
   - Mesmo acertando, leia a explicação
   - Aprofunde o conhecimento

### Para Pais/Tutores

```bash
# Verificar progresso
pnpm focustime profiles

# Ver cronograma do filho
pnpm focustime schedule --id [ID-DO-PERFIL]

# Fazer questões juntos
pnpm focustime practice --num 5
```

## Integração com Outras Ferramentas

### Exportar Cronograma

```bash
# Salvar em arquivo texto
pnpm focustime schedule > meu-cronograma.txt

# Salvar em markdown
pnpm focustime schedule > cronograma.md
```

### Automatização

```bash
# Script para gerar cronograma diário
#!/bin/bash
echo "Cronograma de $(date +%d/%m/%Y)" > cronograma-diario.txt
pnpm focustime schedule >> cronograma-diario.txt
cat cronograma-diario.txt
```

## Troubleshooting de Cenários Específicos

### Cenário: Questões muito difíceis

**Problema:** IA gerando questões muito avançadas

**Solução:**
1. Crie novo perfil com objetivo "dominar conteúdo"
2. Especifique nível no setup
3. Comece com menos questões (3-5)

### Cenário: Cronograma muito puxado

**Problema:** Muitas sessões, difícil completar

**Solução:**
1. Reduza horas disponíveis no perfil
2. Gere novo cronograma
3. Foque apenas em matérias prioritárias

### Cenário: Respostas repetindo

**Problema:** IA gerando questões parecidas

**Solução:**
1. Gere em horários diferentes
2. Use perfis diferentes
3. Adaptive thinking varia resultados

## Próximos Passos

Após dominar a CLI:

1. **Use a interface web**
   - Visualização mais rica
   - Gráficos de progresso
   - Gamificação

2. **Conecte Supabase**
   - Sincronização entre dispositivos
   - Histórico completo
   - Análises avançadas

3. **Compartilhe**
   - Ajude outros alunos com TDAH
   - Compartilhe cronogramas que funcionaram
   - Dê feedback para melhorias
