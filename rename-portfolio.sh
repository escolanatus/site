#!/bin/zsh
# Script para renomear arquivos ausentes no portfolio

BASE="/Users/onasantos/Library/CloudStorage/GoogleDrive-pr.onasousa@gmail.com/Meu Drive/FLAGGY/3CLIENTES FLAGGY/ESCOLA NATUS/escola-natus-site/public/assets/images/portfolio"

echo "🔄 Renomeando arquivos..."

# Pasta 05
[[ -f "$BASE/05-projetos-especiais/5.1.webp" ]] && mv "$BASE/05-projetos-especiais/5.1.webp" "$BASE/05-projetos-especiais/projetos-001.webp" && echo "✅ projetos-001.webp"

# Pasta 06
[[ -f "$BASE/06-atividades-extras/6.1.webp" ]] && mv "$BASE/06-atividades-extras/6.1.webp" "$BASE/06-atividades-extras/atividades-001.webp" && echo "✅ atividades-001.webp"

# Pasta 07
[[ -f "$BASE/07-alimentacao-nutricao/7.1.webp" ]] && mv "$BASE/07-alimentacao-nutricao/7.1.webp" "$BASE/07-alimentacao-nutricao/alimentacao-001.webp" && echo "✅ alimentacao-001.webp"

# Pasta 08
[[ -f "$BASE/08-psicologia-individual/8.1.webp" ]] && mv "$BASE/08-psicologia-individual/8.1.webp" "$BASE/08-psicologia-individual/psico-001.webp" && echo "✅ psico-001.webp"
[[ -f "$BASE/08-psicologia-individual/8.2.webp" ]] && mv "$BASE/08-psicologia-individual/8.2.webp" "$BASE/08-psicologia-individual/psico-002.webp" && echo "✅ psico-002.webp"
[[ -f "$BASE/08-psicologia-individual/8.3.webp" ]] && mv "$BASE/08-psicologia-individual/8.3.webp" "$BASE/08-psicologia-individual/psico-003.webp" && echo "✅ psico-003.webp"

# Pasta 09
[[ -f "$BASE/09-eventos-familia/9.1.webp" ]] && mv "$BASE/09-eventos-familia/9.1.webp" "$BASE/09-eventos-familia/evento-001.webp" && echo "✅ evento-001.webp"
[[ -f "$BASE/09-eventos-familia/9.2.webp" ]] && mv "$BASE/09-eventos-familia/9.2.webp" "$BASE/09-eventos-familia/evento-002.webp" && echo "✅ evento-002.webp"
[[ -f "$BASE/09-eventos-familia/9.3.webp" ]] && mv "$BASE/09-eventos-familia/9.3.webp" "$BASE/09-eventos-familia/evento-003.webp" && echo "✅ evento-003.webp"
[[ -f "$BASE/09-eventos-familia/9.4.webp" ]] && mv "$BASE/09-eventos-familia/9.4.webp" "$BASE/09-eventos-familia/evento-004.webp" && echo "✅ evento-004.webp"
[[ -f "$BASE/09-eventos-familia/9.5.webp" ]] && mv "$BASE/09-eventos-familia/9.5.webp" "$BASE/09-eventos-familia/evento-005.webp" && echo "✅ evento-005.webp"

# Pasta 10
[[ -f "$BASE/10-crescimento-conquistas/10.1.webp" ]] && mv "$BASE/10-crescimento-conquistas/10.1.webp" "$BASE/10-crescimento-conquistas/crescimento-001.webp" && echo "✅ crescimento-001.webp"
[[ -f "$BASE/10-crescimento-conquistas/10.2.webp" ]] && mv "$BASE/10-crescimento-conquistas/10.2.webp" "$BASE/10-crescimento-conquistas/crescimento-002.webp" && echo "✅ crescimento-002.webp"
[[ -f "$BASE/10-crescimento-conquistas/10.3.webp" ]] && mv "$BASE/10-crescimento-conquistas/10.3.webp" "$BASE/10-crescimento-conquistas/crescimento-003.webp" && echo "✅ crescimento-003.webp"
[[ -f "$BASE/10-crescimento-conquistas/10.4.webp" ]] && mv "$BASE/10-crescimento-conquistas/10.4.webp" "$BASE/10-crescimento-conquistas/crescimento-004.webp" && echo "✅ crescimento-004.webp"
[[ -f "$BASE/10-crescimento-conquistas/10.5.webp" ]] && mv "$BASE/10-crescimento-conquistas/10.5.webp" "$BASE/10-crescimento-conquistas/crescimento-005.webp" && echo "✅ crescimento-005.webp"

# Pasta 11
[[ -f "$BASE/11-infraestrutura/11.1.webp" ]] && mv "$BASE/11-infraestrutura/11.1.webp" "$BASE/11-infraestrutura/infra-001.webp" && echo "✅ infra-001.webp"
[[ -f "$BASE/11-infraestrutura/11.2.webp" ]] && mv "$BASE/11-infraestrutura/11.2.webp" "$BASE/11-infraestrutura/infra-002.webp" && echo "✅ infra-002.webp"
[[ -f "$BASE/11-infraestrutura/11.3.webp" ]] && mv "$BASE/11-infraestrutura/11.3.webp" "$BASE/11-infraestrutura/infra-003.webp" && echo "✅ infra-003.webp"
[[ -f "$BASE/11-infraestrutura/11.4.webp" ]] && mv "$BASE/11-infraestrutura/11.4.webp" "$BASE/11-infraestrutura/infra-004.webp" && echo "✅ infra-004.webp"
[[ -f "$BASE/11-infraestrutura/11.5.webp" ]] && mv "$BASE/11-infraestrutura/11.5.webp" "$BASE/11-infraestrutura/infra-005.webp" && echo "✅ infra-005.webp"

echo ""
echo "🎉 RENOMEAÇÃO COMPLETA!"
