#!/usr/bin/env bash
set -euo pipefail

BRANCH="ci/fix-assets-deploy"
PR_TITLE="chore(ci): fix asset paths + add build-and-deploy workflow"

PR_BODY="$(cat <<'EOF'
This PR makes the site build & deploy pipeline consistent and production-ready:

- Move vvv-theme.css -> assets/css/vvv-theme.css
- Move custom.css -> assets/css/custom.css
- Move main.js -> assets/js/main.js
- Remove legacy .github/workflows/jekyll-gh-pages.yml (if present)
- Add .github/workflows/build-and-deploy.yml which:
  - runs npm ci
  - runs npm run build (builds CSS/JS/HTML into ./dist)
  - uploads ./dist and deploys to GitHub Pages

Why: index.html references assets/* and package.json build expects assets/*; aligning actual files fixes the build, and the Action deploys dist/ to Pages.

Notes:
- Run `npm ci && npm run build` locally to verify dist/ before merging.
- After merge, Actions will build and deploy the site automatically on pushes to main.
EOF
)"

echo "==> Starting: prepare branch '${BRANCH}'"

# Checkout or create branch
if git rev-parse --verify --quiet "$BRANCH" >/dev/null; then
  echo "Branch '$BRANCH' exists locally — checking it out."
  git checkout "$BRANCH"
else
  echo "Creating branch '$BRANCH' from origin/main (fetching)..."
  git fetch origin main:main || true
  git checkout -b "$BRANCH"
fi

# Ensure directories
mkdir -p assets/css assets/js .github/workflows

# Helper: move if exists and not already moved
move_if_present() {
  local src="$1" dest="$2"
  if [ -f "$src" ] && [ ! -f "$dest" ]; then
    echo " - moving $src -> $dest"
    git mv "$src" "$dest"
  elif [ -f "$dest" ]; then
    echo " - target exists, skipping move for $src"
  else
    echo " - $src not found, skipping"
  fi
}

move_if_present "vvv-theme.css" "assets/css/vvv-theme.css"
move_if_present "custom.css" "assets/css/custom.css"
move_if_present "main.js" "assets/js/main.js"

# Remove legacy Jekyll workflow if present
if [ -f ".github/workflows/jekyll-gh-pages.yml" ]; then
  echo "Removing legacy .github/workflows/jekyll-gh-pages.yml"
  git rm -f ".github/workflows/jekyll-gh-pages.yml"
else
  echo "No legacy Jekyll workflow found"
fi

# Create build-and-deploy workflow
cat > .github/workflows/build-and-deploy.yml <<'YML'
name: Build and Deploy (static site)

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
YML

# Stage changes
git add -A

# Commit if any staged changes
if ! git diff --cached --quiet; then
  git commit -m "chore(ci): move assets into assets/ and add build-and-deploy workflow"
else
  echo "No changes to commit (maybe already applied)."
fi

# Push branch
git push -u origin "$BRANCH"

# Create PR if gh exists
if command -v gh >/dev/null 2>&1; then
  echo "Creating PR via gh..."
  gh pr create --title "$PR_TITLE" --body "$PR_BODY" --base main --head "$BRANCH"
  echo "PR created (via gh)."
else
  echo "gh CLI not found. Branch pushed: $BRANCH"
  echo "Create PR manually at:"
  echo "https://github.com/Bridgette013/VVVD-Sitebuild/pull/new/$BRANCH"
fi

echo "Done."
