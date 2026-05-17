# AGENTS.md

## Project Overview

This is a game tools website built with Next.js.

Main goals:

- Provide fast and lightweight game tools
- Maintain excellent UX and UI design
- Support mobile-first responsive design
- Keep the site SEO-friendly
- Prioritize simplicity and maintainability

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React
- shadcn/ui
- Zustand
- pnpm

---

## Core Principles

### Think First

Before editing code:

- Read related files and existing patterns
- Understand the current architecture
- Avoid immediately rewriting implementations
- Prefer understanding over guessing

### Minimal Changes

Keep diffs as small as possible.

- Prefer modifying existing code
- Avoid unrelated refactors
- Do not rewrite working code without clear reason
- Preserve existing architecture and conventions

### Keep It Simple

Do not:

- Over-abstract
- Prematurely optimize
- Create unnecessary hooks or components
- Create unnecessary state or context

Do:

- Write readable and straightforward code
- Maintain a scalable and maintainable architecture

### Transparent Assumptions

If requirements are unclear:

- Explicitly state assumptions
- Do not invent business logic
- Explain limitations and tradeoffs
- Ask for clarification when necessary

---

## Delivery Format

When completing tasks, provide:

1. Goal summary
2. Files changed
3. What was modified
4. Validation steps
5. Known limitations or follow-up suggestions (if any)

---

## Repository Structure

```txt
├── app
│   ├── components
│   │   ├── home-page.tsx
│   │   └── ...
│   ├── page.tsx
│   └── ...
├── components
│   ├── ui
│   │   ├── Button.tsx
│   │   └── ...
│   └── ...
├── utils
│   └── ...
├── styles
│   ├── globals.css
│   └── ...
├── public
│   ├── images
│   └── ...
├── biome.json
├── tsconfig.json
├── package.json
└── ...