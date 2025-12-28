#!/bin/bash
echo "🚀 Loading NVM and starting server..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
echo "Node version: $(node -v)"
echo "Starting Next.js dev server..."
echo "Open http://localhost:3000 in your browser!"
echo ""
npm run dev
