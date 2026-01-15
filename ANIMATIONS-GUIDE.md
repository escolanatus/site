# 🎨 ANIMATIONS GUIDE - FLAG OS V3

**Padrão:** Escola Natus → Replicável em 4 clientes  
**Tech:** Tailwind V4 + CSS Variables  
**Atualizado:** 10 Jan 2026

---

## 🎯 QUANDO USAR CADA ANIMAÇÃO

### fade-up
**Uso:** Textos, cards, seções ao scroll  
**Timing:** 260ms (--dur-3)  
**Classe:** `animate-[fade-up]`

**Exemplo:**
```html
<div class="animate-[fade-up]" data-animate>
  Conteúdo aparece suavemente
</div>
```

---

### scale-pop
**Uso:** Modais, CTAs importantes  
**Timing:** 260ms (--dur-3)  
**Efeito:** Zoom sutil (0.96 → 1)

**Exemplo:**
```html
<dialog class="animate-[scale-pop]">
  Modal com entrada premium
</dialog>
```

---

### blur-in
**Uso:** Hero sections, imagens de destaque  
**Timing:** 420ms (--dur-4)  
**Efeito:** Desfoque → nítido

**Exemplo:**
```html
<div class="animate-[blur-in] delay-200">
  Imagem hero premium
</div>
```

---

### shimmer
**Uso:** Loading states, skeletons  
**Timing:** 1.2s infinito  
**Efeito:** Brilho deslizante

**Exemplo:**
```html
<div class="relative overflow-hidden">
  <div class="absolute inset-0 animate-[shimmer]"></div>
</div>
```

---

## 🎨 TOKENS DISPONÍVEIS

### Durações
```css
--dur-instant: 80ms    /* Micro-interações */
--dur-1: 120ms         /* Tooltips, highlights */
--dur-2: 180ms         /* Buttons, cards */
--dur-3: 260ms         /* Entrada de elementos */
--dur-4: 420ms         /* Modais, drawers */
--dur-slow: 600ms      /* Efeitos especiais */
```

### Easings
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)      /* Padrão saída */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0)       /* Entrada */
--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1)  /* Premium */
```

### Glassmorphism
```css
--glass-bg: rgba(255, 255, 255, 0.06)
--glass-blur: 14px
--glass-border: rgba(255, 255, 255, 0.12)
```

**Classe:** `.glass-card`

---

## 🚀 STAGGER (Entrada Sequencial)

Adicione `data-animate` para entrada automática com delay:

```html
<div data-animate>Item 1</div>  <!-- 0ms -->
<div data-animate>Item 2</div>  <!-- 60ms -->
<div data-animate>Item 3</div>  <!-- 120ms -->
```

**Configuração:** `stagger-observer.js`

---

## ♿ ACESSIBILIDADE

Sistema 100% compatível com `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 MOBILE

- Touch feedback: `active:scale-98`
- Delays reduzidos (40-60ms vs 80ms desktop)
- Transforms sutis (2deg max)

---

## 🎯 EXEMPLOS PRÁTICOS

### Card com Glass + Stagger + Hover
```html
<div class="glass-card card" data-animate>
  <h3>Título</h3>
  <p>Conteúdo</p>
</div>
```

### Botão com Gradient Animado + Press
```html
<button class="btn-primary animated-gradient">
  Clique aqui
</button>
```

### Modal com @starting-style
```html
<dialog>
  Abre/fecha automaticamente com CSS
</dialog>
```

---

**📖 Showcase:** `/showcase.html`  
**📋 Roadmap:** `SONNET 4.5/SITE-UPDATE-V3-ANIMATIONS.md`
