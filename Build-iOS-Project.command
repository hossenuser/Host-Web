#!/bin/bash
# Mac only. Creates the Xcode project and opens it. Needs Xcode from the App Store.
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "Install Node.js LTS first: https://nodejs.org/"; read -p "Press Enter"; exit 1; }
[ -d node_modules ] || npm install || exit 1
[ -d ios ] || npx cap add ios || exit 1
npm run assets:native || true
npx cap sync ios && npx cap open ios
