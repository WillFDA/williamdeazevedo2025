#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <iterations>"
  echo "Example: $0 10"
  exit 1
fi

PRD_FILE="docs/PRD-BLOG-REFACTOR.md"
PROGRESS_FILE="docs/progress.txt"

# Check if PRD exists
if [ ! -f "$PRD_FILE" ]; then
  echo "Error: PRD file not found at $PRD_FILE"
  exit 1
fi

# Create progress file if it doesn't exist
if [ ! -f "$PROGRESS_FILE" ]; then
  echo "# Blog Refactor Progress Log" > "$PROGRESS_FILE"
  echo "Started: $(date)" >> "$PROGRESS_FILE"
  echo "---" >> "$PROGRESS_FILE"
fi

echo "Starting PRD implementation with $1 iterations..."
echo ""

for ((i=1; i<=$1; i++)); do
  echo "=== Iteration $i/$1 ==="

  result=$(claude --permission-mode acceptEdits -p "@$PRD_FILE @$PROGRESS_FILE \
  Tu es un développeur expert. Implémente le PRD de refactoring du blog.

  Instructions:
  1. Lis le PRD et le fichier progress.txt pour comprendre ce qui a déjà été fait.
  2. Trouve la tâche de PLUS HAUTE PRIORITÉ qui n'est pas encore complétée.
  3. Implémente cette tâche unique (ne fais qu'UNE seule tâche).
  4. Lance les tests: bun run test
  5. Mets à jour la checklist dans le PRD (coche [x] ce qui est fait).
  6. Ajoute une entrée dans progress.txt avec: date, tâche complétée, fichiers modifiés.
  7. Commit tes changements avec un message descriptif.

  IMPORTANT:
  - Ne travaille que sur UNE SEULE tâche par itération.
  - Si toutes les tâches sont complétées, output exactement: <promise>COMPLETE</promise>
  - Sois méthodique et teste ton code avant de commit.")

  echo "$result"
  echo ""

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "✅ PRD complete after $i iterations!"
    echo "Completed: $(date)" >> "$PROGRESS_FILE"
    exit 0
  fi

  echo "--- Iteration $i completed ---"
  echo ""
done

echo "⚠️  Reached maximum iterations ($1). PRD may not be complete."
echo "Check $PROGRESS_FILE for details."
