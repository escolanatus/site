# 📸 ESPECIFICAÇÕES TÉCNICAS DE IMAGENS - ESCOLA NATUS

## 🎯 OBJETIVO

Este documento define os padrões técnicos e organizacionais para todas as imagens do site da Escola Natus, garantindo performance, SEO e manutenibilidade.

---

## 📏 ESPECIFICAÇÕES TÉCNICAS

### **Formato e Compressão**
- **Formato obrigatório**: `.webp`
- **Tamanho máximo**: 150KB por imagem
- **Compressão**: 80-85% de qualidade
- **Dimensões recomendadas**:
  - Hero images: 1920x1080px (16:9)
  - Portfolio grid: 800x600px (4:3)
  - Cards: 600x400px (3:2)
  - Thumbnails: 400x300px (4:3)

### **Performance**
- **Lazy loading**: Obrigatório (`loading="lazy"`)
- **Aspectratio**: Definir sempre para evitar CLS (Cumulative Layout Shift)
- **Placeholder**: Usar `background-color` suave durante carregamento

### **SEO (CRÍTICO)**
- **Alt text obrigatório**: Sempre descritivo + keywords
- **Estrutura de alt text**:
  ```
  "[Descrição específica] + [contexto Escola Natus] + [keyword natural]"
  ```

**Exemplos de alt text corretos:**
- ✅ "Crianças no devocional matinal na Escola Natus Goiânia educação cristã"
- ✅ "Sala de aula com ensino individualizado Escola Natus Jardim Guanabara"
- ✅ "Playground seguro certificado INMETRO na Escola Natus Goiânia"

**Exemplos INCORRETOS:**
- ❌ "Foto 1" (genérico, sem contexto)
- ❌ "Crianças brincando" (sem contexto da escola)
- ❌ "" (vazio - NUNCA deixar vazio!)

---

## 🗂️ ESTRUTURA DE PASTAS (11 CATEGORIAS HERO'S JOURNEY)

Todas as imagens do portfolio seguem a **estrutura narrativa do Hero's Journey** (Jornada do Herói):

```
/assets/images/portfolio/
├── 01-entrada-seguranca/          (Mundo Comum - Segurança)
├── 02-acolhimento/                 (Chamado à Aventura - Acolhimento)
├── 03-sala-aula-aprendizado/      (Teste/Desafio - Aprendizado)
├── 04-valores-devocionais/         (Mentor - Valores)
├── 05-projetos-especiais/          (Aliados - Projetos)
├── 06-atividades-extras/           (Provação - Atividades)
├── 07-alimentacao-nutricao/        (Recompensa - Alimentação)
├── 08-psicologia-individual/       (Caminho de Volta - Psicologia)
├── 09-eventos-familia/             (Ressurreição - Eventos)
├── 10-crescimento-conquistas/      (Retorno - Crescimento)
└── 11-infraestrutura/              (Elixir - Infraestrutura)
```

### **Nomenclatura de Arquivos**

**Padrão obrigatório:**
```
[categoria]-[numero-sequencial].webp

Exemplos:
- entrada-001.webp
- acolhimento-005.webp
- sala-010.webp
```

**Regras:**
- Apenas minúsculas
- Hífens para separar palavras
- Números com 3 dígitos (001, 002, 010, etc.)
- Nomes descritivos e consistentes

---

## 🎨 CATEGORIAS DETALHADAS

### **1. Entrada e Segurança** (`01-entrada-seguranca/`)
- Portão, recepção, câmeras, protocolos de segurança
- **Keywords**: segurança, controle de acesso, monitoramento

### **2. Acolhimento** (`02-acolhimento/`)
- Chegada das crianças, abraços, professoras recebendo
- **Keywords**: acolhimento, chegada, professoras

### **3. Sala de Aula e Aprendizado** (`03-sala-aula-aprendizado/`)
- Crianças em atividades, alfabetização, matemática, ciências
- **Keywords**: alfabetização, aprendizado, sala de aula

### **4. Valores e Devocionais** (`04-valores-devocionais/`)
- Devocionais matinais, orações, ensino bíblico
- **Keywords**: devocional, valores cristãos, oração

### **5. Projetos Especiais** (`05-projetos-especiais/`)
- Horta, experimentos, projetos temáticos
- **Keywords**: projetos pedagógicos, horta, experimentos

### **6. Atividades Extras** (`06-atividades-extras/`)
- Karatê, ballet, música, educação física
- **Keywords**: karatê, ballet, música, atividades extras

### **7. Alimentação e Nutrição** (`07-alimentacao-nutricao/`)
- Refeitório, lanches, refeições balanceadas
- **Keywords**: alimentação, nutrição, refeitório

### **8. Psicologia Individual** (`08-psicologia-individual/`)
- Atendimento individual, sala de psicologia, acompanhamento
- **Keywords**: psicologia, acompanhamento individual, emocional

### **9. Eventos e Família** (`09-eventos-familia/`)
- Festa da Família, Semana Bíblica, celebrações, formaturas
- **Keywords**: eventos, família, festa, celebração

### **10. Crescimento e Conquistas** (`10-crescimento-conquistas/`)
- Evoluções, conquistas acadêmicas, certificados, formatura
- **Keywords**: conquistas, evolução, certificado, formatura

### **11. Infraestrutura** (`11-infraestrutura/`)
- Quadra, playground, biblioteca, salas climatizadas
- **Keywords**: infraestrutura, quadra, playground, biblioteca

---

## 🔧 FERRAMENTAS RECOMENDADAS

### **Compressão de Imagens**
- **Squoosh** (https://squoosh.app) - Web, gratuito
- **ImageOptim** (macOS) - App gratuito
- **TinyPNG** (https://tinypng.com) - Web, gratuito

### **Conversão para WebP**
```bash
# Usando cwebp (Google)
cwebp -q 85 input.jpg -o output.webp

# Batch conversion (pasta inteira)
for file in *.jpg; do cwebp -q 85 "$file" -o "${file%.jpg}.webp"; done
```

### **Validação de Tamanho**
```bash
# Encontrar imagens maiores que 150KB
find /assets/images -name "*.webp" -size +150k
```

---

## ✅ CHECKLIST ANTES DE ADICIONAR IMAGEM

- [ ] Formato WebP
- [ ] Tamanho < 150KB
- [ ] Nome seguindo padrão `categoria-001.webp`
- [ ] Alt text descritivo com keywords
- [ ] Lazy loading habilitado
- [ ] Pasta correta (01 a 11)
- [ ] Aspect ratio mantido
- [ ] Testado em mobile e desktop

---

## 🚫 ERROS COMUNS A EVITAR

1. ❌ **Alt text vazio ou genérico** → Prejudica SEO
2. ❌ **Imagens JPG/PNG** → Usar WebP (menor tamanho)
3. ❌ **Arquivos > 150KB** → Comprimir antes de subir
4. ❌ **Nomes aleatórios** (`IMG_1234.webp`) → Seguir padrão
5. ❌ **Pasta errada** → Seguir estrutura Hero's Journey
6. ❌ **Lazy loading desabilitado** → Prejudica performance
7. ❌ **Dimensões inconsistentes** → Seguir especificações

---

## 📊 MÉTRICAS DE QUALIDADE

**Performance alvo:**
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**SEO alvo:**
- 100% de imagens com alt text
- 0 imagens quebradas (404)
- 100% formato WebP

---

## 🔄 MANUTENÇÃO

**Revisão trimestral:**
- Verificar imagens quebradas
- Atualizar alt texts com novas keywords
- Remover imagens não utilizadas
- Otimizar imagens maiores que 150KB

**Versionamento:**
- Nunca sobrescrever imagens existentes
- Criar nova versão com sufixo (`entrada-001-v2.webp`)
- Documentar mudanças no commit Git

---

## 📞 SUPORTE

**Dúvidas ou problemas?**
- Contato técnico: [seu-email]
- Documentação: `/COMO-ADICIONAR-FOTOS.md`
- Guia Hero's Journey: `/docs/hero-journey-structure.md`

---

**Última atualização:** 2026-01-10
**Versão:** 1.0
**Autor:** Claude Sonnet 4.5 (FLAG OS)
