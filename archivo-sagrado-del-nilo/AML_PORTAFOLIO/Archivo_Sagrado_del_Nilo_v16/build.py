from pathlib import Path
import shutil

# El archivo final ya está compilado y autocontenido en dist/index.html.
# Este script prepara una copia en la raíz para abrirla o publicarla fácilmente.
ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "dist" / "index.html"
TARGET = ROOT / "index.html"
if not SOURCE.exists():
    raise SystemExit("No se encuentra dist/index.html. Extrae el proyecto completo antes de ejecutar este script.")
shutil.copy2(SOURCE, TARGET)
print(f"Página lista: {TARGET}")
