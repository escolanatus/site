# 📖 Documentação de Animações - Escola Natus

## Índice
1. [Motion Foundation](#motion-foundation)
2. [Hover Physics](#hover-physics)
3. [Glassmorphism 2.0](#glassmorphism-20)
4. [Bordas Animadas](#bordas-animadas)
5. [Parallax & Mouse](#parallax--mouse)
6. [Acessibilidade](#acessibilidade)
7. [Performance](#performance)

---

## Motion Foundation

### Arquivo: `src/motion.css` (262 linhas)

#### Classes de Reveal

**`.reveal`** - Fade in up (padrão)
```css
opacity: 0;
transform: translateY(24px);
transition: all 420ms cubic-bezier(0.16, 1, 0.3, 1);
```

**Aplicação:**
```html
<div class="reveal">Conteúdo surge suavemente</div>
```

**Variantes:**
- `.reveal-fade` - Apenas fade, sem movimento
- `.reveal-scale` - Scale de 0.9 → 1
- `.reveal-slide-left` - Desliza da direita
- `.reveal-slide-right` - Desliza da esquerda

#### Stagger Delays

**`.stagger-1` a `.stagger-6`**
- Delays de 0ms a 500ms
- Para sequências de elementos

```html
<div class="reveal stagger-1">Aparece primeiro</div>
<div class="reveal stagger-2">Aparece 100ms depois</div>
<div class="reveal stagger-3">Aparece 200ms depois</div>
```

---

## Hover Physics

### Classes de Hover

**`.hover-lift`**
```css
transition: transform 240ms ease-out, box-shadow 240ms ease-out;

&:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
```

**`.hover-scale`**
```css
&:hover {
  transform: scale(1.02);
}
```

**`.hover-glow`**
```css
&:hover {
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
}
```

**Aplicação:**
```html
<button class="btn btn-primary hover-glow">
  CTA com glow verde
</button>

<div class="glass-card hover-lift">
  Card que eleva no hover
</div>
```

---

## Glassmorphism 2.0

### Classe: `.glass`

**Especificações Apple-style:**
```css
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.5) inset;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top-color: rgba(255, 255, 255, 0.5);
}

.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}
```

**Onde aplicado:**
- Header (navbar)
- Formulário de contato
- Container de vídeo
- Cards com `.glass-card`

---

## Bordas Animadas

### Arquivo: `src/border-gradient.css` (118 linhas)

#### Tecnologia: CSS @property (Houdini)

```css
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-border {
  to { --angle: 360deg; }
}
```

#### Classes disponíveis:

**`.border-gradient-spin`** (4s)
```css
background: conic-gradient(
  from var(--angle),
  #10b981 0deg,
  #fbbf24 90deg,
  #ec4899 180deg,
  #8b5cf6 270deg,
  #10b981 360deg
);
animation: spin-border 4s linear infinite;
```

**`.border-gradient-premium`** (6s)
- Cores: Verde → Laranja → Verde
- Velocidade média

**`.border-gradient-subtle`** (8s)
- Cores: Verde suave → Laranja claro
- Opacidades reduzidas (0.3-0.5)
- Aplicado no badge "18 vagas"

**Hover Effect:**
```css
.border-gradient-spin:hover {
  animation-duration: 2s; /* Acelera */
}
```

---

## Parallax & Mouse

### Arquivo: `src/parallax.js` (180 linhas)

#### 1. Mouse Parallax

**Classe:** `MouseParallax`

```javascript
new MouseParallax('.hero-section', {
  intensity: 0.02,
  reverse: true  // Background move oposto
});

new MouseParallax('.hero-content', {
  intensity: 0.05,
  reverse: false  // Texto segue mouse
});
```

**Como funciona:**
- Rastreia posição do mouse
- Calcula offset relativo ao centro
- Aplica transform com intensidade configurável

#### 2. Floating Elements

**Classe:** `FloatingElement`

```javascript
new FloatingElement('.border-gradient-subtle');
```

**Keyframe:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
}
```

#### 3. Magnetic Buttons

**Classe:** `MagneticButton`

```javascript
new MagneticButton('.btn-primary.btn-lg');
```

**Efeito:**
- Botão "puxa" 30% em direção ao mouse
- Retorna suavemente ao sair

#### 4. Scroll Parallax

**Classe:** `ScrollParallax`

```javascript
new ScrollParallax('.parallax-image', 0.3);
```

**Para aplicar:**
```html
<img class="parallax-image" src="foto.jpg">
```

---

## Acessibilidade

### Arquivo: `src/accessibility.js` (185 linhas)

#### Recursos Implementados

**1. Skip to Main Content**
```javascript
// Link invisível que aparece no :focus
// Permite pular navegação
```

**2. Focus Trap (Modais)**
```javascript
const trap = new FocusTrap(modalElement);
trap.activate();  // Prende foco dentro do modal
trap.deactivate();  // Libera
```

**3. Keyboard Navigation**
- Todos elementos clicáveis têm `tabindex="0"`
- Suporte para `Enter` e `Space`
- ARIA roles adicionados dinamicamente

**4. Live Regions**
```javascript
// Notificações anunciadas para screen readers
element.setAttribute('aria-live', 'polite');
```

**5. Reduced Motion**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance

### Otimizações Aplicadas

#### 1. Intersection Observer

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 100);
      
      observer.unobserve(entry.target);  // ✅ Para de observar
    }
  });
}, { threshold: 0.1 });
```

**Benefícios:**
- Executa animação apenas quando visível
- Desativa observer após reveal
- Reduz carga de CPU/GPU

#### 2. GPU Acceleration

```css
.hover-lift {
  will-change: transform;
  transform: translateZ(0);  /* Force GPU */
}
```

#### 3. Debounce & Throttle

```javascript
// Parallax usa requestAnimationFrame
// Mouse tracking limitado a 60fps
```

#### 4. Lazy Loading

```html
<img loading="lazy" src="imagem.webp">
```

---

## Cheat Sheet Rápido

### Classes Mais Usadas

```html
<!-- Reveal Animation -->
<div class="reveal">Surge suavemente</div>

<!-- Hover Effects -->
<button class="btn hover-glow">CTA</button>
<div class="card hover-lift">Card</div>

<!-- Glassmorphism -->
<div class="glass">Efeito vidro premium</div>

<!-- Bordas Animadas -->
<div class="border-gradient-subtle">Badge especial</div>

<!-- Parallax -->
<img class="parallax-image" src="foto.jpg">
```

### Tokens de Tempo

```css
--dur-1: 120ms;  /* Micro */
--dur-2: 240ms;  /* Rápido */
--dur-3: 360ms;  /* Médio */
--dur-4: 420ms;  /* Smooth */

--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Lighthouse Targets

- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 95+
- **SEO:** 100

---

## Contato

**Executado por:** Sony 4.5 (Claude Sonnet)  
**Data:** 2026-01-14  
**Projeto:** Escola Natus - Educação com Valores Cristãos

---

*Documentação gerada automaticamente pelo OPUS CDO*
