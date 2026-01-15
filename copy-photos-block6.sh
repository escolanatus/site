#!/bin/bash
BASE_SRC="/Users/onasantos/Library/CloudStorage/GoogleDrive-pr.onasousa@gmail.com/Meu Drive/FLAGGY/3CLIENTES FLAGGY/ESCOLA NATUS/FOTOS/V3-WEBP"
BASE_DST="/Users/onasantos/Library/CloudStorage/GoogleDrive-pr.onasousa@gmail.com/Meu Drive/FLAGGY/3CLIENTES FLAGGY/ESCOLA NATUS/escola-natus-site/public/assets/images/pdf-fotos"

# Bloco 6 FINAL (101-108)
cp "$BASE_SRC/27.3.webp" "$BASE_DST/101-ferias-escolares.webp"
cp "$BASE_SRC/27.4.webp" "$BASE_DST/102-feriados-nacionais.webp"
cp "$BASE_SRC/27.5.webp" "$BASE_DST/103-datas-comemorativas.webp"
cp "$BASE_SRC/28.1.webp" "$BASE_DST/104-localizacao-escola-goiania.webp"
cp "$BASE_SRC/29.1.webp" "$BASE_DST/105-contato-whatsapp-natus.webp"
cp "$BASE_SRC/30.1.webp" "$BASE_DST/106-redes-sociais-escola.webp"
cp "$BASE_SRC/31.1.webp" "$BASE_DST/107-instagram-escola-natus.webp"
cp "$BASE_SRC/32.1.webp" "$BASE_DST/108-agende-visita-escola-crista-goiania.webp"

echo "🎉 COMPLETO! 108 fotos copiadas com sucesso!"
ls "$BASE_DST" | wc -l
