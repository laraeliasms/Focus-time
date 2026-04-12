#!/bin/bash

# FocusTime CLI Wrapper
# Facilita o uso do CLI sem precisar do pnpm

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se ANTHROPIC_API_KEY está configurada
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo -e "${RED}❌ ANTHROPIC_API_KEY não configurada!${NC}"
    echo -e "${YELLOW}Configure com: export ANTHROPIC_API_KEY=your-key${NC}"
    echo ""
    echo "Obtenha sua chave em: https://console.anthropic.com/"
    exit 1
fi

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ Dependências não instaladas. Instalando...${NC}"
    pnpm install
fi

# Executar CLI
pnpm tsx cli.ts "$@"
