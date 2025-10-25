# Contributing Workflow

This project uses a straightforward Git workflow so you can confidently refine the site and share changes.

## 1. Prepare your environment
- Make sure you have the project cloned locally and dependencies installed (`npm install`).
- Create a new branch for your change: `git checkout -b <your-branch-name>`.

## 2. Make your updates
- Edit HTML, CSS, or JS files as needed.
- Preview locally with a simple server (`npm run dev` or `python3 -m http.server`).

## 3. Review your work
- Run formatting or build scripts if available (`npm run build`).
- Verify pages look correct and links behave as expected.

## 4. Commit your changes
- Stage files: `git add <file>...`.
- Commit with a meaningful message: `git commit -m "Brief summary of change"`.

## 5. Open a pull request
- Push your branch: `git push origin <your-branch-name>`.
- Open a PR describing what changed, why, and how it was tested.

## 6. Iterate and merge
- Address review feedback by pushing additional commits to the same branch.
- Once approved, merge the PR and delete the branch if desired.

Following these steps keeps the repository history clear and helps collaborators understand the context behind each change.
