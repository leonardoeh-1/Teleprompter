#!/usr/bin/env bash
# Publica este proyecto en GitHub.
# Uso:  ./push.sh [nombre-repo] [private|public]
# Requiere autenticarte una vez con:  gh auth login
set -e

REPO_NAME="${1:-decagon-va-teleprompter}"
VISIBILITY="${2:-private}"

# Inicializa git y hace el commit inicial si aún no existe historial
if [ ! -d .git ]; then
  git init -q
  git add -A
  git -c commit.gpgsign=false commit -q -m "Initial commit"
fi
git branch -M main 2>/dev/null || true

if command -v gh >/dev/null 2>&1; then
  echo "Creando y subiendo el repositorio '$REPO_NAME' ($VISIBILITY)…"
  gh repo create "$REPO_NAME" --"$VISIBILITY" --source=. --remote=origin --push
  echo "Listo ✓"
else
  echo "No se encontró GitHub CLI (gh)."
  echo "Opción A — instala gh y vuelve a ejecutar este script."
  echo "Opción B — hazlo manualmente:"
  echo "  1) Crea un repositorio VACÍO en github.com llamado: $REPO_NAME"
  echo "  2) Ejecuta:"
  echo "       git remote add origin https://github.com/<tu-usuario>/$REPO_NAME.git"
  echo "       git push -u origin main"
fi
