# AGENTS.md — LineHouse repository guidance

## Project snapshot
- This repository is a Next.js marketing site for LineHouse, a construction and renovation business.
- The public homepage is the primary app surface and lives in `src/app/page.tsx`.
- Supporting API routes live under `src/app/api/projects/[id]/updates`, but they are not the default scope for routine homepage edits.
- Branding assets are stored in `public/images`; keep visual changes consistent with the existing design language.

## Required workflow
- Audit the repository and propose a plan before editing files.
- Do not edit files until the user explicitly approves the plan.
- Work only on the current feature branch.
- Never commit, push, merge, or open a pull request without explicit permission.
- Keep changes small and explain which files are being touched and why.
- Never claim a test or build passed unless it was run successfully in this environment.

## Default scope
- Focus on the public LineHouse homepage unless the task explicitly requires something else.
- Preserve existing routes, layout structure, and marketing messaging unless the user asks for a change.
- Avoid broad refactors or unrelated cleanup in the same change.
- Do not add or remove dependencies without permission.
- Do not edit `src/app/page.local-backup.tsx` unless a user specifically requests it.

## Protected areas — explicit permission required
Do not inspect deeply, edit, rename, or delete these areas without specific permission:
- Login, logout, authentication, authorization, sessions, and accounts
- Admin, customer, and other dashboards or protected routes
- Database access, SQL, schema, migrations, and database configuration
- Payments, subscriptions, licensing, and account entitlements
- Environment files, API credentials, tokens, and secrets
- Camera, device, and hardware integrations

If a task requires touching a protected area, stop and ask first.

## Secrets and confidentiality
- Never print, copy, transmit, or commit secret values.
- Never read or display the contents of `.env` files, credential files, private keys, or API-key files.
- Treat `.env.local`, API keys, and credentials as confidential.
- Never place secrets in source code, prompts, logs, or documentation.

## Project commands
- Install dependencies: `npm install`
- Start local development: `npm run dev`
- Production build: `npm run build`
- Lint the app: `npm run lint`

## Verification expectations
- Before making changes, report the issue, likely files involved, and the planned validation.
- After changes, run the smallest relevant command that checks correctness for the edited area.
- For homepage and UI text changes, `npm run lint` is the minimum safe validation; use `npm run build` when the change affects rendering or app behavior.
- Separate confirmed facts from assumptions in the final update.
- If the repository state is unclear or a change may affect protected areas, stop and ask instead of guessing.

## Coding conventions for this repo
- Prefer targeted edits in the existing page structure rather than introducing new abstractions.
- Keep styling consistent with the current warm neutral palette, large typography, and Indonesian copy used on the homepage.
- Preserve existing CTA links, especially WhatsApp and Instagram contact flows.
- Respect the current app-router conventions in `src/app` and avoid unrelated route churn.
