# 🎬 TESTES PLAYWRIGHT - ANIMATION V3

## 📋 O QUE É TESTADO

### 1. Home Page (Desktop)
- ✅ Carregamento e título
- ✅ Logo animado visível
- ✅ Hero section funcional
- ✅ Botões CTA com hover physics
- ✅ Stagger em cards de depoimentos
- ✅ Glass cards com radial spotlight

### 2. Menu Mobile
- ✅ Responsividade (375x667)
- ✅ Abertura/fechamento smooth
- ✅ Animações do sandwich menu

### 3. Blog
- ✅ Index carrega com stagger
- ✅ Navegação entre posts
- ✅ Filtros de categoria
- ✅ Scroll suave

### 4. Respiros (Spacing)
- ✅ Auditoria visual de espaçamentos
- ✅ Consistência entre seções

### 5. Showcase
- ✅ Página de demonstração funcional
- ✅ Todas as animações visíveis

### 6. Performance
- ✅ Tempo de carregamento < 5s
- ✅ Reduced-motion accessibility

### 7. Viewports
- ✅ Mobile (iPhone 375x667)
- ✅ Tablet (iPad 768x1024)
- ✅ Desktop (1920x1080)

### 8. Interações
- ✅ Scroll com stagger progressivo
- ✅ Inputs com glow no focus

---

## 🚀 COMO RODAR

### Instalar Playwright
```bash
npm install -D @playwright/test
npx playwright install
```

### Rodar todos os testes
```bash
npx playwright test
```

### Rodar teste específico
```bash
npx playwright test animations.spec.ts
```

### Modo debug (com UI)
```bash
npx playwright test --debug
```

### Gerar relatório
```bash
npx playwright show-report
```

---

## 📸 SCREENSHOTS

Os testes geram **16 screenshots** automáticos:
- `01-home-desktop.png` - Home completa
- `02-button-hover.png` - CTA com hover
- `03-stagger-cards.png` - Cards animados
- `04-glass-spotlight.png` - Glass effect
- `05-mobile-menu-open.png` - Menu mobile
- `06-blog-index.png` - Blog completo
- `07-blog-post.png` - Post individual
- `08-blog-filter.png` - Filtros
- `09-spacing-audit.png` - Espaçamentos
- `10-showcase.png` - Showcase page
- `11-reduced-motion.png` - Acessibilidade
- `12-mobile-iphone.png` - Mobile
- `13-tablet-ipad.png` - Tablet
- `14-desktop-large.png` - Desktop 1920px
- `15-scroll-stagger.png` - Scroll animado
- `16-input-glow.png` - Inputs com focus

---

## ✅ RESULTADO ESPERADO

**Total:** 18 testes  
**Passando:** 18/18 ✅  
**Tempo:** ~2-3min

Se algum teste falhar, verifique:
1. Dev server rodando (`npm run dev -- --port 3333`)
2. Animações implementadas
3. Classes CSS corretas
