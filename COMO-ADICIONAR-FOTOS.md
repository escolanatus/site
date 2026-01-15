# 📸 COMO ADICIONAR FOTOS NO SITE DA ESCOLA NATUS
## Guia Passo a Passo (Para Não-Desenvolvedores)

---

## 🎯 ANTES DE COMEÇAR

**Você vai precisar de:**
- [ ] As fotos originais (JPG, PNG ou qualquer formato)
- [ ] Acesso à pasta `/assets/images/portfolio/` no projeto
- [ ] 10 minutos de tempo

**Não precisa saber programar!** Este guia é para qualquer pessoa da equipe.

---

## 🗺️ PASSO 1: ESCOLHER A CATEGORIA CERTA

**As fotos são organizadas em 11 categorias temáticas:**

| Categoria | O que vai aqui? | Exemplos |
|-----------|-----------------|----------|
| `01-entrada-seguranca` | Portão, recepção, câmeras | Entrada principal, controle de acesso |
| `02-acolhimento` | Chegada das crianças, abraços | Professoras recebendo alunos |
| `03-sala-aula-aprendizado` | Atividades em sala | Alfabetização, leitura, matemática |
| `04-valores-devocionais` | Momentos espirituais | Oração, devocional matinal, ensino bíblico |
| `05-projetos-especiais` | Projetos temáticos | Horta, experimentos, feira de ciências |
| `06-atividades-extras` | Atividades complementares | Karatê, ballet, música, educação física |
| `07-alimentacao-nutricao` | Refeições e lanches | Refeitório, café da manhã, almoço |
| `08-psicologia-individual` | Atendimento psicológico | Sala de psicologia, acompanhamento |
| `09-eventos-familia` | Eventos e celebrações | Festa da Família, Semana Bíblica, Natal |
| `10-crescimento-conquistas` | Evoluções e conquistas | Certificados, formatura, progresso |
| `11-infraestrutura` | Estrutura física | Quadra, playground, biblioteca, salas |

**Dica:** Se tiver dúvida, pense: "Essa foto conta qual parte da história da criança na escola?"

---

## 🔧 PASSO 2: PREPARAR A FOTO

### **2.1. Comprimir e Converter para WebP**

#### **Opção A: Usando Squoosh (Recomendado - Online e Gratuito)**

1. Acesse **https://squoosh.app** no navegador
2. Arraste sua foto para a tela
3. No lado direito, escolha:
   - **Compress**: `WebP`
   - **Quality**: `85`
4. Verifique se o tamanho final (embaixo) é **menor que 150KB**
   - Se for maior, reduza Quality para `75` ou `70`
5. Clique em **Download** (ícone de seta para baixo)

#### **Opção B: Usando TinyPNG (Online)**

1. Acesse **https://tinypng.com**
2. Arraste suas fotos (até 20 de uma vez)
3. Aguarde a compressão
4. Baixe os arquivos comprimidos
5. **Depois**, converta para WebP usando Squoosh (Opção A)

#### **Opção C: Usando ImageOptim (macOS)**

1. Baixe **ImageOptim** (https://imageoptim.com)
2. Arraste suas fotos no app
3. Ele vai comprimir automaticamente
4. **Depois**, converta para WebP usando Squoosh

---

### **2.2. Renomear o Arquivo**

**Padrão obrigatório:**
```
[categoria]-[numero].webp

Exemplos corretos:
✅ entrada-007.webp
✅ acolhimento-012.webp
✅ sala-003.webp

Exemplos ERRADOS:
❌ IMG_1234.webp (não fale sentido)
❌ foto da entrada.webp (espaços não permitidos)
❌ entrada_7.webp (use hífen, não underscore)
```

**Como escolher o número:**
1. Abra a pasta da categoria
2. Veja o último número usado (ex: `entrada-006.webp`)
3. Use o próximo número (ex: `entrada-007.webp`)

---

## 📂 PASSO 3: COLOCAR NA PASTA CERTA

1. Navegue até: `/assets/images/portfolio/`
2. Abra a pasta da categoria escolhida (ex: `01-entrada-seguranca/`)
3. Arraste ou copie a foto preparada para dentro da pasta

**Estrutura esperada:**
```
/assets/images/portfolio/
├── 01-entrada-seguranca/
│   ├── entrada-001.webp
│   ├── entrada-002.webp
│   ├── entrada-003.webp
│   └── entrada-007.webp  ← Sua foto nova aqui!
├── 02-acolhimento/
│   ├── acolhimento-001.webp
│   └── ...
```

---

## 💬 PASSO 4: ESCREVER O ALT TEXT (DESCRIÇÃO DA IMAGEM)

**Por que é importante?**
- Google "lê" essa descrição para ranquear o site
- Pessoas com deficiência visual dependem disso
- Melhora o SEO (aparecer nas buscas)

**Estrutura do alt text:**
```
[O que a foto mostra] + [contexto Escola Natus] + [palavra-chave]
```

**Exemplos práticos:**

| Foto | Alt Text Correto |
|------|-----------------|
| Crianças orando antes do lanche | "Crianças em oração antes das refeições na Escola Natus educação cristã Goiânia" |
| Entrada da escola | "Fachada da Escola Natus em Goiânia educação cristã Jardim Guanabara" |
| Aula de karatê | "Crianças em aula de karatê na Escola Natus Goiânia atividade extracurricular" |
| Sala de aula | "Sala de aula com ensino individualizado na Escola Natus educação infantil" |

**Dicas para um bom alt text:**
- ✅ Seja específico (o que está acontecendo?)
- ✅ Inclua "Escola Natus" ou "Goiânia"
- ✅ Adicione keywords naturais (educação cristã, Jardim Guanabara, etc.)
- ✅ Tamanho ideal: 8-12 palavras
- ❌ Não comece com "Imagem de..." ou "Foto de..."
- ❌ Não use palavras genéricas como "crianças brincando"
- ❌ **NUNCA deixe vazio!**

---

## 🌐 PASSO 5: ADICIONAR NO CÓDIGO HTML

**Você vai precisar editar o arquivo `portfolio.html`**

### **Encontrar o lugar certo:**

1. Abra `/portfolio.html` no editor de código
2. Procure pela seção da categoria (ex: `Entrada e Segurança`)
3. Você vai ver um bloco como este:

```html
<div class="card card-hover overflow-hidden" data-animate>
  <img src="/assets/images/portfolio/01-entrada-seguranca/entrada-006.webp"
       alt="Fachada da Escola Natus em Goiânia"
       class="w-full h-64 object-cover rounded-t-xl cursor-pointer hover:scale-105 transition-transform duration-500"
       loading="lazy" />
  <div class="p-4">
    <h3 class="text-lg font-heading font-bold text-verde-escuro mb-1">Nossa Fachada</h3>
    <p class="text-xs text-cinza-texto">Ambiente acolhedor desde a chegada.</p>
  </div>
</div>
```

### **Copiar e adaptar:**

1. **Copie todo o bloco** acima
2. Cole logo abaixo (para adicionar uma nova foto)
3. **Modifique 4 coisas:**
   - `src`: Caminho da sua foto (`entrada-007.webp`)
   - `alt`: Descrição que você escreveu no Passo 4
   - `<h3>`: Título curto (2-3 palavras)
   - `<p>`: Legenda curta (5-8 palavras)

**Exemplo pronto:**
```html
<div class="card card-hover overflow-hidden" data-animate>
  <img src="/assets/images/portfolio/01-entrada-seguranca/entrada-007.webp"
       alt="Portão de segurança com controle de acesso na Escola Natus Goiânia"
       class="w-full h-64 object-cover rounded-t-xl cursor-pointer hover:scale-105 transition-transform duration-500"
       loading="lazy" />
  <div class="p-4">
    <h3 class="text-lg font-heading font-bold text-verde-escuro mb-1">Portão Seguro</h3>
    <p class="text-xs text-cinza-texto">Controle rigoroso de entrada e saída.</p>
  </div>
</div>
```

---

## ✅ PASSO 6: TESTAR SE FUNCIONOU

### **No navegador:**

1. Abra o site localmente (ou atualize a página)
2. Vá até a seção Portfolio
3. Navegue até a categoria da foto
4. **Verifique:**
   - [ ] A foto apareceu?
   - [ ] O título está correto?
   - [ ] A legenda está correta?
   - [ ] A foto carrega rápido? (< 1 segundo)

### **Testar o alt text:**

1. Clique com botão direito na foto
2. Escolha **"Inspecionar"** (Inspect Element)
3. Procure por `alt="..."`
4. Confirme que o texto está lá

**Ou:**
- Desabilite as imagens no navegador temporariamente
- Você deve ver o texto alternativo no lugar da foto

---

## 🚨 RESOLUÇÃO DE PROBLEMAS

### **"A foto não aparece!"**

**Possíveis causas:**
- [ ] Caminho errado no `src` → Verifique se o nome está exato
- [ ] Arquivo não está na pasta → Confirme que copiou para `/assets/images/portfolio/`
- [ ] Formato errado → Tem que ser `.webp` (não `.jpg`, `.png`)
- [ ] Cache do navegador → Aperte `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)

### **"A foto está muito grande/pesada!"**

**Solução:**
- Comprima novamente com qualidade mais baixa (70% ou 60%)
- Redimensione para dimensões menores (ex: 800x600px)

### **"O alt text não aparece!"**

**Verifique:**
- [ ] Está dentro das aspas? `alt="texto aqui"`
- [ ] Não tem caracteres especiais estranhos? (só letras, números, espaços)
- [ ] Salvou o arquivo HTML depois de editar?

---

## 📋 CHECKLIST FINAL

Antes de considerar concluído, verifique:

- [ ] Foto comprimida < 150KB
- [ ] Formato WebP
- [ ] Nome seguindo padrão `categoria-NNN.webp`
- [ ] Arquivo na pasta correta
- [ ] Alt text escrito (mínimo 8 palavras)
- [ ] Código HTML adicionado
- [ ] Título (`<h3>`) preenchido
- [ ] Legenda (`<p>`) preenchida
- [ ] Testado no navegador
- [ ] Foto aparece corretamente
- [ ] Alt text validado

---

## 💡 DICAS EXTRAS

### **Quantas fotos adicionar por vez?**
- Recomendado: **3-5 fotos por sessão**
- Máximo: 10 fotos (para não sobrecarregar o site)

### **Com que frequência atualizar?**
- **Ideal:** A cada evento importante (Semana Bíblica, Festa da Família, etc.)
- **Mínimo:** 1 vez por trimestre

### **Posso remover fotos antigas?**
- **Sim**, mas com cuidado:
  1. Faça backup da foto antes de deletar
  2. Remova também o código HTML correspondente
  3. Teste o site depois para garantir que nada quebrou

---

## 🆘 PRECISA DE AJUDA?

**Se algo der errado ou tiver dúvidas:**

1. **Releia este guia** (geralmente a resposta está aqui!)
2. **Consulte SPECS-IMAGENS.md** para detalhes técnicos
3. **Entre em contato com suporte técnico:**
   - Email: [seu-email-de-suporte]
   - WhatsApp: [seu-numero]

---

## 📚 RECURSOS ÚTEIS

- **Squoosh** (compressão): https://squoosh.app
- **TinyPNG** (compressão): https://tinypng.com
- **ImageOptim** (macOS): https://imageoptim.com
- **Guia de Alt Text**: https://moz.com/learn/seo/alt-text
- **Conversor WebP online**: https://convertio.co/pt/jpg-webp/

---

**Última atualização:** 2026-01-10
**Versão:** 1.0
**Criado por:** Claude Sonnet 4.5 (FLAG OS)

**Feedback?** Se este guia ajudou ou se algo pode melhorar, avise!
