# EstateFlow Production Foundation Design

## Goal

Transform EstateFlow from a browser-state demo into a production-oriented SaaS foundation without pretending unfinished features are complete. This first sub-project covers Phase 0 (audit/baseline) and Phase 1 (foundation) of the approved production roadmap. Later phases will be designed and implemented only after this foundation is verified.

## Current baseline

EstateFlow is a small Next.js 15 + React 19 + TypeScript application. The current dashboard and lead form are implemented in `app/page.tsx` using hard-coded seed leads and local React state. `db/schema.sql` is not connected to runtime application code. There is no authentication, tenant enforcement, API/domain layer, migration workflow, automated test suite, lint script, CI workflow, or connected deployment for this repository.

## Foundation architecture

- Preserve Next.js App Router and TypeScript.
- Keep the existing demo UI functional while the backend foundation is introduced.
- Introduce Supabase as the target PostgreSQL/Auth platform, but do not expose privileged credentials to the browser.
- Use `@supabase/ssr` + `@supabase/supabase-js` for browser/server clients once current official documentation is checked.
- Move database lifecycle management from the one-off `db/schema.sql` file to versioned `supabase/migrations` files.
- Add shared environment validation and typed configuration so invalid production configuration fails clearly.
- Add test/lint/build tooling before adding business features.
- Add CI so every change has an independently visible build/type/test result.
- Keep production data paths separate from demo seed data until authentication/tenancy is implemented in Phase 2.

## Phase 0 acceptance gate

Phase 0 passes when:

1. All tracked files and visible behavior have been audited.
2. Known fake/mock/hard-coded behavior is documented.
3. A dedicated `feature/production-hardening` branch exists.
4. A reproducible CI baseline runs typecheck and Next.js production build.
5. Baseline failures, if any, are fixed before Phase 1 begins.

## Phase 1 acceptance gate

Phase 1 passes when:

1. Dependency versions are pinned and a lockfile exists.
2. Linting, unit-test, typecheck, and production-build commands exist.
3. Supabase browser/server client modules exist and follow current SSR guidance.
4. Environment variables are validated and documented.
5. The original schema is represented by a versioned migration, with production-safe corrections that do not pre-empt Phase 2 tenancy/RLS design.
6. CI runs install, lint, unit tests, typecheck, and build.
7. No production code uses a Supabase service-role/secret credential in a client bundle.
8. All Phase 1 checks pass before Phase 2 authentication/tenancy work starts.

## Non-goals for this sub-project

Do not implement login, organizations, RLS, team invitations, durable lead CRUD, tasks, site visits, billing, AI, WhatsApp, or marketing pages in Phase 1. Those belong to later verified phases. The foundation must make those features safe to build rather than front-loading more UI.

## Verification strategy

Because the execution sandbox cannot directly reach GitHub/npm, verification will use connected GitHub and remote CI/build systems. Every phase must leave evidence from an actual build/test run; successful file creation alone does not count as verification.
