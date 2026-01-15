#!/bin/bash

echo "🧹 LIMPEZA PROFUNDA - ESCOLA NATUS"
echo "=================================="

# 1. Matar todos os processos
echo "1️⃣ Matando processos Node/Vite..."
pkill -f vite 2>/dev/null || true
pkill -f node 2>/dev/null || true
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# 2. Limpar caches NPM (4 camadas)
echo "2️⃣ Limpando caches NPM..."
npm cache clean --force
npm cache verify

# 3. Remover node_modules e package-lock
echo "3️⃣ Removendo node_modules e locks..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf yarn.lock
rm -rf pnpm-lock.yaml

# 4. Limpar cache Vite (dist, .vite, temp)
echo "4️⃣ Limpando cache Vite..."
rm -rf dist
rm -rf .vite
rm -rf .cache
rm -rf .temp
rm -rf .parcel-cache

# 5. Limpar cache do navegador via headers
echo "5️⃣ Preparando headers anti-cache..."
cat > public/.htaccess << 'EOF'
<IfModule mod_headers.c>
  Header set Cache-Control "no-cache, no-store, must-revalidate"
  Header set Pragma "no-cache"
  Header set Expires "0"
</IfModule>
EOF

# 6. Reinstalar dependências limpas
echo "6️⃣ Reinstalando dependências..."
npm install --legacy-peer-deps

# 7. Build de produção limpo
echo "7️⃣ Build de produção..."
npm run build

# 8. Adicionar timestamp de versão
echo "8️⃣ Adicionando versionamento..."
VERSION=$(date +%Y%m%d%H%M%S)
echo "export const BUILD_VERSION = '$VERSION';" > src/version.js
echo "BUILD_VERSION=$VERSION" > .env.local

echo ""
echo "✅ LIMPEZA COMPLETA!"
echo "📦 Build: dist/"
echo "🔢 Versão: $VERSION"
echo ""
echo "Próximos passos:"
echo "  npm run dev    - Rodar local"
echo "  npm run preview - Preview do build"
echo ""
