#!/bin/bash

# ============================================================================
# 🚀 ESCOLA NATUS - SCRIPT DE INICIALIZAÇÃO LOCAL
# ============================================================================
# Baseado no FLAG OS V2.0
# Adaptado para: Escola Natus Site (Vite 7.x + Tailwind V4)
# Data: 2026-01-13
#
# USO:
#   chmod +x START-NATUS.sh
#   ./START-NATUS.sh
#
# FEATURES:
#   ✅ Detecta e mata processos zumbis automaticamente
#   ✅ Tenta 3 métodos de servidor (Vite → Python → npx http-server)
#   ✅ Logs detalhados para debug
#   ✅ Abre Chrome automaticamente
#   ✅ Health check a cada 30s
# ============================================================================

set -e

# ============================================================================
# CONFIGURAÇÃO
# ============================================================================
PROJECT_NAME="Escola Natus"
PROJECT_DIR="/Users/onasantos/Library/CloudStorage/GoogleDrive-pr.onasousa@gmail.com/Meu Drive/FLAGGY/3CLIENTES FLAGGY/ESCOLA NATUS/escola-natus-site"
LOG_FILE="/tmp/escola-natus-startup-$(date +%Y%m%d-%H%M%S).log"
VITE_LOG="/tmp/escola-natus-vite.log"
PORT=5174
FALLBACK_PORT=8001
MAX_RETRIES=3
HEALTH_CHECK_INTERVAL=30

# 🔧 REMOTE DEBUGGING - Para IAs (Claude/MCP) inspecionarem o browser
CHROME_DEBUG_PORT=9223
CHROME_DEBUG_ENABLED=true

# Cores para logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# ============================================================================
# FUNÇÕES UTILITÁRIAS
# ============================================================================

log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${GREEN}[$timestamp]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${RED}[$timestamp] ❌ ERROR:${NC} $1" | tee -a "$LOG_FILE"
}

log_warning() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${YELLOW}[$timestamp] ⚠️  WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

log_info() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${CYAN}[$timestamp] ℹ️  INFO:${NC} $1" | tee -a "$LOG_FILE"
}

log_debug() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${PURPLE}[$timestamp] 🐛 DEBUG:${NC} $1" | tee -a "$LOG_FILE"
}

# ============================================================================
# VERIFICAÇÕES
# ============================================================================
kill_port() {
    local port=$1
    log_info "Verificando porta $port..."

    local pid=$(lsof -ti :$port 2>/dev/null)

    if [ -n "$pid" ]; then
        log_warning "Porta $port ocupada por PID: $pid"
        log_info "Matando processo $pid..."
        kill -9 $pid 2>/dev/null || true
        sleep 2

        if lsof -ti :$port > /dev/null 2>&1; then
            log_error "Processo $pid NÃO morreu! Tentando killall..."
            killall -9 node 2>/dev/null || true
            sleep 2
        else
            log "✅ Porta $port liberada!"
        fi
    else
        log "✅ Porta $port livre!"
    fi
}

check_directory() {
    log_info "Verificando diretório do projeto..."

    if [ ! -d "$PROJECT_DIR" ]; then
        log_error "Diretório do projeto NÃO EXISTE: $PROJECT_DIR"
        exit 1
    fi

    cd "$PROJECT_DIR" || {
        log_error "Não foi possível acessar o diretório: $PROJECT_DIR"
        exit 1
    }

    log "✅ Diretório OK: $(pwd)"

    if [ ! -f "index.html" ]; then
        log_error "index.html NÃO ENCONTRADO!"
        exit 1
    fi

    if [ ! -f "package.json" ]; then
        log_warning "package.json NÃO ENCONTRADO!"
    fi

    log "✅ Arquivos essenciais presentes"
}

check_dependencies() {
    log_info "Verificando dependências..."

    if ! command -v node &> /dev/null; then
        log_error "Node.js NÃO INSTALADO!"
        exit 1
    fi
    log "✅ Node.js: $(node --version)"

    if ! command -v npm &> /dev/null; then
        log_error "npm NÃO INSTALADO!"
        exit 1
    fi
    log "✅ npm: $(npm --version)"

    if ! command -v npx &> /dev/null; then
        log_error "npx NÃO INSTALADO!"
        exit 1
    fi
    log "✅ npx disponível"

    if command -v python3 &> /dev/null; then
        log "✅ Python3: $(python3 --version)"
    fi
}

kill_zombie_processes() {
    log_info "Matando processos zumbis..."
    
    pkill -f "remote-debugging-port=$CHROME_DEBUG_PORT" 2>/dev/null || true
    pkill -f "vite.*$PORT" 2>/dev/null || true
    pkill -f "vite.*$FALLBACK_PORT" 2>/dev/null || true

    sleep 2
    log "✅ Processos zumbis eliminados"
}

# ============================================================================
# SERVIDOR
# ============================================================================
start_server_with_fallback() {
    local attempt=1
    local server_started=false

    # MÉTODO 1: Vite
    while [ $attempt -le $MAX_RETRIES ] && [ "$server_started" = false ]; do
        log_info "Tentativa $attempt/$MAX_RETRIES: Iniciando Vite na porta $PORT..."

        > "$VITE_LOG"

        npx vite --host 0.0.0.0 --port $PORT > "$VITE_LOG" 2>&1 &
        VITE_PID=$!

        log_debug "Vite PID: $VITE_PID"
        log_info "Aguardando 8 segundos para Vite inicializar..."
        sleep 8

        if lsof -ti :$PORT > /dev/null 2>&1; then
            log "✅ Vite ONLINE na porta $PORT!"
            server_started=true
            SERVER_URL="http://localhost:$PORT"
            break
        else
            log_error "Vite NÃO subiu na tentativa $attempt"
            tail -n 10 "$VITE_LOG" | tee -a "$LOG_FILE"
            kill -9 $VITE_PID 2>/dev/null || true
            attempt=$((attempt + 1))
            sleep 3
        fi
    done

    # MÉTODO 2: Vite porta alternativa
    if [ "$server_started" = false ]; then
        log_warning "Tentando porta $FALLBACK_PORT..."

        npx vite --host 0.0.0.0 --port $FALLBACK_PORT > "$VITE_LOG" 2>&1 &
        VITE_PID=$!
        sleep 8

        if lsof -ti :$FALLBACK_PORT > /dev/null 2>&1; then
            log "✅ Vite ONLINE na porta $FALLBACK_PORT!"
            server_started=true
            SERVER_URL="http://localhost:$FALLBACK_PORT"
        else
            kill -9 $VITE_PID 2>/dev/null || true
        fi
    fi

    # MÉTODO 3: Python HTTP Server
    if [ "$server_started" = false ]; then
        log_warning "Usando Python HTTP Server..."

        if command -v python3 &> /dev/null; then
            python3 -m http.server $FALLBACK_PORT > /dev/null 2>&1 &
            SERVER_PID=$!
            sleep 3

            if lsof -ti :$FALLBACK_PORT > /dev/null 2>&1; then
                log "✅ Python HTTP Server ONLINE!"
                server_started=true
                SERVER_URL="http://localhost:$FALLBACK_PORT"
            fi
        fi
    fi

    if [ "$server_started" = false ]; then
        log_error "TODOS OS MÉTODOS FALHARAM!"
        exit 1
    fi

    echo "$server_started"
}

# ============================================================================
# HEALTH CHECK
# ============================================================================
health_check() {
    while true; do
        sleep $HEALTH_CHECK_INTERVAL

        if ! lsof -ti :$PORT > /dev/null 2>&1 && ! lsof -ti :$FALLBACK_PORT > /dev/null 2>&1; then
            log_error "Servidor CAIU! Reiniciando..."
            start_server_with_fallback
        else
            log_debug "Health check OK ($(date +%H:%M:%S))"
        fi
    done
}

# ============================================================================
# MAIN
# ============================================================================
main() {
    clear

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🏫 $PROJECT_NAME - SERVIDOR DE DESENVOLVIMENTO"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    log "🔥 Iniciando $PROJECT_NAME..."
    log_info "Log: $LOG_FILE"
    echo ""

    # ETAPA 1: Verificações
    log_info "━━━ ETAPA 1/5: VERIFICAÇÕES ━━━"
    check_directory
    check_dependencies
    echo ""

    # ETAPA 2: Limpar processos
    log_info "━━━ ETAPA 2/5: LIMPEZA ━━━"
    kill_zombie_processes
    echo ""

    # ETAPA 3: Liberar portas
    log_info "━━━ ETAPA 3/5: PORTAS ━━━"
    kill_port $PORT
    kill_port $FALLBACK_PORT
    echo ""

    # ETAPA 4: Iniciar servidor
    log_info "━━━ ETAPA 4/5: SERVIDOR ━━━"
    start_server_with_fallback
    echo ""

    # ETAPA 5: Abrir Chrome
    log_info "━━━ ETAPA 5/5: NAVEGADOR ━━━"
    log_info "URL: $SERVER_URL"
    sleep 2

    if [ "$CHROME_DEBUG_ENABLED" = true ]; then
        pkill -f "remote-debugging-port=$CHROME_DEBUG_PORT" 2>/dev/null || true
        sleep 1

        log_info "🔧 Chrome com Remote Debugging (porta $CHROME_DEBUG_PORT)..."

        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
            --remote-debugging-port=$CHROME_DEBUG_PORT \
            --user-data-dir="/tmp/chrome-debug-natus" \
            --no-first-run \
            --no-default-browser-check \
            "$SERVER_URL" &

        CHROME_PID=$!
        log "✅ Chrome aberto com Debug!"
    else
        open -a "Google Chrome" "$SERVER_URL"
        log "✅ Chrome aberto!"
    fi
    echo ""

    # Banner de sucesso
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}✅ $PROJECT_NAME RODANDO!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${CYAN}🌐 Site:${NC} $SERVER_URL"
    echo -e "${CYAN}🔧 Chrome Debug:${NC} http://localhost:$CHROME_DEBUG_PORT"
    echo -e "${CYAN}📋 Log:${NC} $LOG_FILE"
    echo ""
    echo -e "${PURPLE}🤖 PARA IAs (Claude/Playwright MCP):${NC}"
    echo -e "${PURPLE}   → Conectar em: http://localhost:$CHROME_DEBUG_PORT${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  DEIXE ESTE TERMINAL ABERTO${NC}"
    echo -e "${YELLOW}⚠️  Para parar: Ctrl+C${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Health check em background
    health_check &
    HEALTH_PID=$!

    # Cleanup ao encerrar
    trap "log_warning 'Encerrando...'; kill $VITE_PID 2>/dev/null; kill $HEALTH_PID 2>/dev/null; kill $CHROME_PID 2>/dev/null; exit 0" SIGINT SIGTERM

    wait
}

# ============================================================================
# EXECUÇÃO
# ============================================================================
main
