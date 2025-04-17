

# MFP – Micro Frontend Playground

This project demonstrates how to structure and build scalable **micro frontends (MFEs)** using Vue 3 and Webpack 5's Module Federation. It can serve as a technical reference for teams exploring distributed frontend architectures.

---

## Overview

While the app is themed as a financial planner, the core goal is to showcase effective strategies for:
- Micro frontend communication
- Independent development and deployment
- Shared state and design consistency

---

## Architecture

- **Shell App**: Hosts and dynamically loads MFEs.
- **MFE Modules**: Individual Vue apps (e.g. `dashboard`, `reports`, etc.).
- **Webpack Module Federation**: Used for runtime integration.
- **Shared Packages**: Components, styles, utilities.

---

## Packages

```
/packages
  ├── shell             # Main container
  ├── mfe-dashboard     # Dashboard micro frontend
  └── mfe-settings      # Settings micro frontend
```

---

## Getting Started

```bash
git clone https://github.com/abhijitpandey30/mfp.git
cd mfp
npm install
npm run dev
```

Each micro-app runs independently and is federated into the shell dynamically.

---

##  GitHub Actions (CI/CD)

CI is handled via **GitHub Actions**. Each MFE has its own workflow to:
- Install dependencies
- Run linters/tests
- Build the module
- Deploy to AWS (via S3/CloudFront or ECS)

### Example Workflow: `.github/workflows/deploy.yml`

```yaml
name: Deploy MFE Dashboard

on:
  push:
    paths:
      - 'packages/mfe-dashboard/**'
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install & Build
        run: |
          cd packages/mfe-dashboard
          npm ci
          npm run build
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl public-read --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'packages/mfe-dashboard/dist'
```

---

## AWS Deployment

Each micro app is deployed independently to **Amazon S3** with **CloudFront** used for CDN caching and routing. The shell app can fetch remote modules from these deployments using Module Federation's `remoteEntry.js`.

 **Benefits**:
- Independent deploys
- Rollbacks per MFE
- Caching via CloudFront



