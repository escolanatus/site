#!/bin/bash

# ===================================================================
# TESTE LOCAL - ESCOLA NATUS SITE
# Chrome DevTools Remote Debugging + Vite Dev Server
# ===================================================================

echo "🚀 Iniciando ambiente de testes Escola Natus..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verifica se Vite já está rodando na porta 5173
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Vite já está rodando na porta 5173${NC}"
    echo "Pulando inicialização do servidor..."
else
    # Inicia Vite dev server em background
    echo -e "${BLUE}📦 Iniciando Vite dev server...${NC}"
    npm run dev &
    VITE_PID=$!
    echo "Vite PID: $VITE_PID"
    
    # Aguarda servidor iniciar
    sleep 3
fi

echo ""
echo -e "${GREEN}✅ Servidor Vite rodando em: http://127.0.0.1:5173${NC}"
echo ""

# Verifica se Chrome/Chromium está disponível
if command -v google-chrome &> /dev/null; then
    CHROME_BIN="google-chrome"
elif command -v chromium &> /dev/null; then
    CHROME_BIN="chromium"
elif command -v "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" &> /dev/null; then
    CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
else
    echo -e "${YELLOW}⚠️  Chrome não encontrado. Abrindo no navegador padrão...${NC}"
    open http://127.0.0.1:5173
    exit 0
fi

echo -e "${BLUE}🌐 Abrindo Chrome com Remote Debugging...${NC}"
echo ""

# Mata processos Chrome antigos com remote debugging (se existirem)
pkill -f "remote-debugging-port=9222" 2>/dev/null

# Diretório temporário para perfil Chrome (modo anônimo sem cache)
TEMP_PROFILE="/tmp/chrome-escola-natus-test-$(date +%s)"
mkdir -p "$TEMP_PROFILE"

# Abre Chrome com:
# - Remote debugging na porta 9222
# - Perfil temporário (sem cache, sem extensões)
# - Modo incognito
# - DevTools aberto automaticamente
"$CHROME_BIN" \
  --remote-debugging-port=9222 \
  --user-data-dir="$TEMP_PROFILE" \
  --incognito \
  --auto-open-devtools-for-tabs \
  --disable-extensions \
  --disable-plugins \
  --disable-sync \
  --no-first-run \
  --no-default-browser-check \
  http://127.0.0.1:5173 &

CHROME_PID=$!

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ AMBIENTE DE TESTE ATIVO${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  🌐 Site Local:        ${BLUE}http://127.0.0.1:5173${NC}"
echo -e "  🔧 DevTools Protocol: ${BLUE}http://127.0.0.1:9222${NC}"
echo -e "  🧪 Modo:              ${BLUE}Incognito (sem cache)${NC}"
echo -e "  📋 Chrome PID:        ${BLUE}$CHROME_PID${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📱 PÁGINAS PARA TESTAR:${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "  1️⃣  Home:        http://127.0.0.1:5173/"
echo "  2️⃣  Sobre:       http://127.0.0.1:5173/sobre.html"
echo "  3️⃣  Metodologia: http://127.0.0.1:5173/metodologia.html"
echo "  4️⃣  Modalidades: http://127.0.0.1:5173/modalidades.html"
echo "  5️⃣  Manifesto:   http://127.0.0.1:5173/portfolio.html"
echo "  6️⃣  Blog Index:  http://127.0.0.1:5173/blog/"
echo "  7️⃣  Blog Post:   http://127.0.0.1:5173/blog/posts/alfabetizacao-aos-6-anos.html"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}🧪 O QUE TESTAR:${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "  ✅ Header com blur 12px e opacidade 90%"
echo "  ✅ Nav link ativo com background gradiente laranja arredondado"
echo "  ✅ Blog index carregando corretamente (não home)"
echo "  ✅ Blog posts com estilos aplicados"
echo "  ✅ Componentes header/footer em todas as páginas"
echo "  ✅ Responsividade mobile (DevTools > Toggle device toolbar)"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}💡 DICA: DevTools já está aberto! Use:${NC}"
echo "   • Elements tab: inspecionar HTML/CSS"
echo "   • Console tab: ver erros JavaScript"
echo "   • Network tab: verificar requests (filtrar por CSS/JS)"
echo "   • Toggle device toolbar (Cmd+Shift+M): testar mobile"
echo ""
echo -e "${YELLOW}⚠️  Para PARAR o teste: Pressione Ctrl+C neste terminal${NC}"
echo ""

# Função de cleanup ao sair
cleanup() {
    echo ""
    echo -e "${YELLOW}🧹 Limpando ambiente de teste...${NC}"
    
    # Mata Chrome
    if ps -p $CHROME_PID > /dev/null 2>&1; then
        kill $CHROME_PID 2>/dev/null
        echo "   ✓ Chrome fechado (PID: $CHROME_PID)"
    fi
    
    # Remove perfil temporário
    if [ -d "$TEMP_PROFILE" ]; then
        rm -rf "$TEMP_PROFILE"
        echo "   ✓ Perfil temporário removido"
    fi
    
    # Mata Vite se foi iniciado por este script
    if [ ! -z "$VITE_PID" ]; then
        if ps -p $VITE_PID > /dev/null 2>&1; then
            kill $VITE_PID 2>/dev/null
            echo "   ✓ Vite dev server parado (PID: $VITE_PID)"
        fi
    fi
    
    echo ""
    echo -e "${GREEN}✅ Ambiente limpo! Até logo! 👋${NC}"
    echo ""
}

# Registra cleanup ao sair (Ctrl+C)
trap cleanup EXIT INT TERM

# Aguarda indefinidamente (usuário pode testar o quanto quiser)
echo -e "${GREEN}⏳ Aguardando testes... (Pressione Ctrl+C quando terminar)${NC}"
echo ""

# Loop infinito até Ctrl+C
while true; do
    sleep 1
done
