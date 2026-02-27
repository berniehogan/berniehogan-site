#!/bin/bash

# Usage: ./updateblog.sh -c "Your commit message"
# Stages all changes, commits, and pushes to main to trigger deploy.

set -e

COMMIT_MSG=""

while getopts "c:" opt; do
  case $opt in
    c) COMMIT_MSG="$OPTARG" ;;
    *) echo "Usage: $0 -c \"Commit message\"" && exit 1 ;;
  esac
done

if [ -z "$COMMIT_MSG" ]; then
  echo "Error: commit message required."
  echo "Usage: $0 -c \"Commit message\""
  exit 1
fi

cd "$(dirname "$0")"

echo "Building site..."
npm run build --silent

echo "Staging changes..."
git add -A

if git diff --cached --quiet; then
  echo "Nothing to commit."
  exit 0
fi

echo "Committing..."
git commit -m "$COMMIT_MSG"

echo "Pushing to main..."
git push origin main

echo "Done. Deploy will run via GitHub Actions."
