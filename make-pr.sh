#!/usr/bin/env bash
set -euo pipefail

BRANCH="ci/fix-assets-deploy"
PR_TITLE="chore(ci): fix asset paths + add build-and-deploy workflow"
read -r -d '' PR_BODY <<'EOF'
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

echo ">> Creating branch ${BRANCH}"
git fetch origin
git checkout -b "${BRANCH}"

echo ">> Ensuring assets dirs exist"
mkdir -p assets/css assets/js .github/workflows

# move if exist and not already in target
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
move_if_present "custom.css"    "assets/css/custom.css"
move_if_present "main.js"       "assets/js/main.js"

# Remove legacy jekyll workflow if present
if [ -f ".github/workflows/jekyll-gh-pages.yml" ]; then
  echo ">> Removing legacy .github/workflows/jekyll-gh-pages.yml"
  git rm -f .github/workflows/jekyll-gh-pages.yml
else
  echo ">> No legacy Jekyll workflow found (ok)"
fi

# Create the new workflow file
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

echo ">> Staging changes"
git add -A

# commit message
git commit -m "chore(ci): move assets into assets/ and add build-and-deploy workflow" || {
  echo "No changes to commit (maybe script already applied)."
}

echo ">> Pushing branch ${BRANCH} to origin"
git push -u origin "${BRANCH}"

# Create PR if gh is available
if command -v gh >/dev/null 2>&1; then
  echo ">> Creating PR via GitHub CLI"
  gh pr create --title "${PR_TITLE}" --body "${PR_BODY}" --base main --head "${BRANCH}"
  echo "PR created. Check GitHub to review & merge."
else
  echo "gh CLI not found. Branch pushed as ${BRANCH}."
  echo "Create a PR with title:"
  echo "  ${PR_TITLE}"
  echo "and the following body:"
  echo ""
  echo "${PR_BODY}"
fi

echo "Done."
