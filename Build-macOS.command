#!/bin/bash
# Double-click on a Mac (or run in Terminal). Builds MH-Apps-Gallery .dmg into ./release
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "Install Node.js LTS first: https://nodejs.org/"; read -p "Press Enter"; exit 1; }
[ -d node_modules ] || npm install || exit 1
npm run desktop:mac && open release
