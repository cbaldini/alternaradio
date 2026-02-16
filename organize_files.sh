#!/bin/bash
# Crear carpetas
mkdir -p humana_resistencia
mkdir -p informe_economico_semanal
mkdir -p libertad_motosierra_licuadora
mkdir -p voz_en_off
# Mover archivos hr a humana_resistencia
for file in hr*.html; do
    [ -f "$file" ] && mv "$file" "humana_resistencia/"
done
# Mover archivos ies a informe_economico_semanal
for file in ies*.html; do
    [ -f "$file" ] && mv "$file" "informe_economico_semanal/"
done
# Mover archivos lml a libertad_motosierra_licuadora
for file in lml*.html; do
    [ -f "$file" ] && mv "$file" "libertad_motosierra_licuadora/"
done
# Mover archivos veo a voz_en_off
for file in veo*.html; do
    [ -f "$file" ] && mv "$file" "voz_en_off/"
done
# Mover archivos de respaldo también
for file in hr*.html~; do
    [ -f "$file" ] && mv "$file" "humana_resistencia/"
done
for file in ies*.html~; do
    [ -f "$file" ] && mv "$file" "informe_economico_semanal/"
done
for file in lml*.html~; do
    [ -f "$file" ] && mv "$file" "libertad_motosierra_licuadora/"
done
for file in veo*.html~; do
    [ -f "$file" ] && mv "$file" "voz_en_off/"
done
echo "Archivos organizados exitosamente"
