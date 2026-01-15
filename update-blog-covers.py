#!/usr/bin/env python3
"""Script to add featured images to blog posts"""
import re
from pathlib import Path

base_dir = Path("/Users/onasantos/Library/CloudStorage/GoogleDrive-pr.onasousa@gmail.com/Meu Drive/FLAGGY/3CLIENTES FLAGGY/ESCOLA NATUS/escola-natus-site/blog/posts")

posts = [
    ("alfabetiz acao-aos-6-anos.html", "blog-alfabetizacao.webp", "Criança em processo de alfabetização"),
    ("rotina-saudavel-criancas.html", "blog-rotina-saudavel.webp", "Rotina saudável de criança"),
    ("devocional-em-familia.html", "blog-devocional-familia.webp", "Família realizando devocional cristão"),
    ("inteligencia-emocional.html", "blog-inteligencia-emocional.webp", "Desenvolvimento de inteligência emocional infantil"),
    ("limites-com-amor.html", "blog-limites-amor.webp", "Disciplina bíblica com amor e firmeza"),
]

for filename, image, alt in posts:
    file_path = base_dir / filename
    if not file_path.exists():
        print(f"❌ {filename} não encontrado")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern: Featured Image section with gradient
    pattern = r'<!-- Featured Image -->\s*<div\s+class="aspect-video[^>]*?gradient[^>]*?>\s*<span class="text-9xl">.+?</span>\s*</div>'
    
    replacement = f'''<!-- Featured Image -->
        <div class="aspect-video rounded-2xl overflow-hidden mb-12" data-animate>
          <img src="/assets/images/fotos/{image}" alt="{alt}" class="w-full h-full object-cover" loading="eager">
        </div>'''
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filename} updated")

print("\n🎉 All blog posts updated!")
