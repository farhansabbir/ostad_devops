# Next Japan

A modern web application built with [Next.js](https://nextjs.org/) (App Router), React 19, and Tailwind CSS 4, designed for robust, scalable, and maintainable deployments. This README is tailored for DevOps engineers responsible for CI/CD, infrastructure, and operational excellence.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Local Development](#local-development)
- [Build & Production](#build--production)
- [CI/CD Workflow](#cicd-workflow)
- [Linting & Code Quality](#linting--code-quality)
- [Environment Variables](#environment-variables)
- [Deployment Notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

This project is a Next.js 15+ application using the App Router, React 19, and Tailwind CSS 4. It features modular UI components, dynamic routing, and a modern developer experience. The codebase is structured for scalability and maintainability.

## Tech Stack

- **Framework:** Next.js 15.3.5 (App Router)
- **Language:** JavaScript (ES2022+)
- **UI:** React 19, Tailwind CSS 4, DaisyUI
- **Icons:** @tabler/icons-react, lucide-react
- **Animation:** motion
- **Linting:** ESLint 9, eslint-config-next
- **CI/CD:** GitHub Actions, Docker, Nginx, SonarQube

## Directory Structure

```
next-japan/
├── .github/workflows/  # GitHub Actions CI/CD workflows
├── src/app/            # Main application code (pages, components, features)
├── public/             # Static assets (images, fonts, CSS, JS)
├── lib/                # Utility functions
├── Dockerfile          # Docker configuration for production deployment
├── nginx.conf          # Nginx configuration for serving the application
├── sonar-project.properties # SonarQube project configuration
├── package.json        # Project metadata and scripts
├── next.config.mjs     # Next.js configuration
└── README.md           # This file
```

## Local Development

### Prerequisites

- Node.js v18+ (recommended: LTS)
- npm v9+ or yarn

### Install Dependencies

```sh
npm install
```

### Start Development Server

```sh
npm run dev
```

- App runs at: [http://localhost:3000](http://localhost:3000)

## Build & Production

### Build for Static Export

This project is configured for a static export, which generates a standalone `out` directory that can be served by any static web server.

```sh
npm run build
```

- Output: `out/` directory

## CI/CD Workflow

This project uses a two-stage CI/CD pipeline defined in `.github/workflows/analyze_build_push_docker.yml`.

### Stage 1: Code Analysis & Docker Build

1.  **Code Analysis:** The workflow runs a SonarQube scan to analyze code quality, find bugs, and identify security vulnerabilities.
2.  **Docker Build & Push:** Upon successful analysis, the workflow builds a production Docker image using the multi-stage `Dockerfile`. This image uses Nginx to serve the statically exported Next.js application.
3.  **Push to Docker Hub:** The newly built image is pushed to Docker Hub, ready for deployment.

### Stage 2: EC2 Deployment Trigger

This stage is responsible for deploying the new image to a running EC2 instance. It is triggered after the first stage completes successfully.

1.  **Trigger EC2:** The workflow connects to the target EC2 instance.
2.  **Pull & Run:** It instructs the instance to pull the latest Docker image from Docker Hub and restart the container to serve the updated application.

## Linting & Code Quality

- Run ESLint:

```sh
npm run lint
```

- ESLint config: `eslint.config.mjs`, `eslint-config-next`
- SonarQube analysis is integrated into the CI/CD pipeline.

## Environment Variables

- Place environment variables in `.env.local` (not committed).
- **CI/CD Secrets:** The following secrets must be configured in the GitHub repository settings for the workflow to succeed:
  - `SONAR_TOKEN`: A token for authenticating with SonarQube.
  - `DOCKERHUB_USERNAME`: Your Docker Hub username.
  - `DOCKERHUB_TOKEN`: A Docker Hub access token.
  - `EC2_HOST`: The IP address or DNS name of the deployment server.
  - `EC2_USERNAME`: The username for connecting to the EC2 instance.
  - `EC2_SSH_KEY`: The private SSH key for connecting to the EC2 instance.

## Deployment Notes

- **Deployment Model:** The application is deployed as a static site within a Docker container, served by Nginx.
- **Static Export:** The `output: 'export'` option in `next.config.mjs` is critical for this deployment model.
- **Build Artifacts:** The primary build artifact is the Docker image. The `out/` directory is generated during the build but is not directly used outside the Docker build process.

## Troubleshooting

- **Build Failures:**
  - **`out` directory not found:** Ensure `output: 'export'` is set in `next.config.mjs`.
  - **`generateStaticParams` missing:** Dynamic pages (`[slug]`) require this function for static export.
- **Dependency issues:** Delete `node_modules` and `package-lock.json`, then run `npm install`.

---

## Contact

For DevOps or deployment issues, contact the project maintainer or DevOps lead.