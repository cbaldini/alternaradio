#!/bin/bash
# Actualizar todos los archivos HTML que aún tengan "programas/"
find . -name "*.html" ! -name "*~" -type f | while read file; do
  if grep -q "programas/" "$file" 2>/dev/null; then
    sed -i '' 's/programas\//archivo\//g' "$file"
    echo "✓ Fixed: $file"
  fi
done
echo "✓ Completado"
