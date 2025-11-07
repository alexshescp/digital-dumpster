# Digital Dumpster

Digital Dumpster is a front-end prototype for an IMAP backup assistant. The
interface walks users through connecting to an email server, validating
credentials, estimating storage requirements, and choosing how long the dump
should remain available for download. The project is built with modern React
tooling (Vite, TypeScript, Tailwind CSS, and shadcn/ui) to provide a fast,
responsive development experience.

> **Important:** This repository focuses on the client experience. No real IMAP
> connectivity or download pipeline is implemented yet—API integrations still
> need to be connected to a backend that performs the email export.

## Features

- **Guided IMAP connection flow** – Collect server, credential, and date-range
  details and provide feedback on connection progress.
- **Simulated storage estimation** – Display an estimated dump size after a
  successful connection check.
- **Configurable retention plans** – Present selectable storage durations with
  associated pricing tiers.
- **Delivery method selection** – Allow users to pick how they receive the dump
  (e.g., email or Telegram).
- **Toast notifications** – Use shadcn/ui toast components to communicate
  success, failure, and background progress.

## Tech stack

| Category        | Tools |
| --------------- | ----- |
| Framework       | [React 18](https://react.dev/), [React Router](https://reactrouter.com/) |
| Build tooling   | [Vite](https://vitejs.dev/) with TypeScript |
| UI components   | [shadcn/ui](https://ui.shadcn.com/) on top of [Radix UI](https://www.radix-ui.com/) |
| Styling         | [Tailwind CSS](https://tailwindcss.com/) with custom utility classes |
| State/data      | [@tanstack/react-query](https://tanstack.com/query/latest) |
| Icons & charts  | [Lucide](https://lucide.dev/), [Recharts](https://recharts.org/) |

## Prerequisites

- Node.js **18.18+** or **20+** (the project is tested with the Active LTS
  release)
- npm **9+** (installed automatically with Node). Yarn, pnpm, or bun will also
  work if you prefer, but the commands below assume npm.

If you do not have Node installed, we recommend installing via
[nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to quickly switch
between versions.

## Getting started

```bash
# 1. Clone the repository
https://github.com/alexshescp/digital-dumpster.git

# 2. Move into the project directory
cd digital-dumpster

# 3. Install dependencies
npm install

# 4. Start the development server (http://localhost:5173 by default)
npm run dev
```

Vite will display a local URL. Open it in your browser to explore the
application. As you edit files the dev server hot-reloads changes instantly.

### Available npm scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Launch the Vite development server with hot module replacement. |
| `npm run build` | Generate an optimized production build in `dist/`. |
| `npm run build:dev` | Build using the development mode settings (useful for debugging builds). |
| `npm run preview` | Preview the production build locally using Vite's preview server. |
| `npm run lint` | Run ESLint across the project to catch common issues. |

## Project structure

```
├── public/               # Static assets copied as-is to the final build
├── src/
│   ├── components/       # Reusable UI primitives and the EmailDumpForm
│   ├── hooks/            # Custom hooks (toast utilities, etc.)
│   ├── pages/            # Route-level components (Index, NotFound)
│   ├── App.tsx           # Router and providers (React Query, tooltips, toasts)
│   └── main.tsx          # Application bootstrap and React entry point
├── tailwind.config.ts    # Tailwind design tokens and plugin configuration
├── tsconfig*.json        # TypeScript compiler settings
└── vite.config.ts        # Vite build and dev-server configuration
```

## Connecting to a backend

The demo currently mocks the IMAP connection process and dump size estimation.
To wire the UI to a real backend:

1. Replace the simulated delay in `EmailDumpForm.tsx` with an API request to a
   secure backend endpoint that performs the IMAP authentication and export.
2. Update the toast notifications to reflect server responses (success, failure,
   validation errors).
3. Store only short-lived session tokens or references client-side—never persist
   raw IMAP credentials in the browser or logs.
4. Ensure the backend provides signed, time-limited download URLs for the dump
   and enforces retention policies that match the selected plan.

## Development tips

- Tailwind styles are colocated with components. Use utility classes or create
  extracted components if markup becomes complex.
- shadcn/ui components are customizable—duplicate components under `src/components/ui`
  if you need to adjust styling or behavior.
- React Query is already configured; wrap API interactions with its hooks to get
  caching, loading states, and retries for free.
- Run `npm run lint` before committing to keep code consistent.

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/my-idea`.
2. Make your changes, add tests or stories if applicable, and ensure linting
   passes.
3. Commit with clear messages and open a pull request summarizing the work and
   any follow-up tasks.
