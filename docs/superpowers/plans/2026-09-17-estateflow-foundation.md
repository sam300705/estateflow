# EstateFlow Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a verified, testable production foundation for EstateFlow before authentication, tenancy, or real CRM persistence is added.

**Architecture:** Keep the current Next.js App Router demo UI working while adding deterministic dependency management, quality gates, CI, typed configuration, Supabase SSR client boundaries, and versioned database migrations. No later-phase feature is allowed to bypass these foundations.

**Tech Stack:** Next.js 15, React 19, TypeScript 5.8, PostgreSQL/Supabase, GitHub Actions, Vitest, ESLint.

**Spec:** `docs/superpowers/specs/2026-09-17-estateflow-production-foundation-design.md`

## Global Constraints

- Work only on `feature/production-hardening` until verification succeeds.
- Do not claim browser-state demo functionality is production functionality.
- Do not expose Supabase service-role/secret credentials to client bundles.
- Preserve the existing demo UI while foundation work is introduced.
- Every phase ends in actual verification before the next phase starts.

---

### Task 1: Baseline CI gate

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `package.json`

**Interfaces:**
- Consumes: existing `npm run typecheck` and `npm run build` scripts.
- Produces: a GitHub Actions workflow that proves whether the existing app installs, typechecks, and builds remotely.

- [ ] **Step 1:** Add a CI workflow triggered on pushes and pull requests to run checkout, Node 22 setup, dependency install, typecheck, and build.
- [ ] **Step 2:** Trigger the workflow with the commit and inspect the run result.
- [ ] **Step 3:** If baseline fails, inspect logs and fix only the failure required to make the current app build.
- [ ] **Step 4:** Re-run/trigger CI until baseline install/typecheck/build succeeds.

### Task 2: Deterministic dependencies and quality scripts

**Files:**
- Modify: `package.json`
- Create/update: `package-lock.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `tests/smoke/business-metrics.test.ts`
- Create: `lib/crm/metrics.ts`

**Interfaces:**
- Produces: `npm run lint`, `npm run test`, `npm run typecheck`, `npm run build`; `calculateOpenPipelineValue(leads)` and related pure CRM metric helpers.

- [ ] **Step 1:** Write a failing unit test proving Won/Lost leads are excluded from open pipeline value.
- [ ] **Step 2:** Implement the minimal metric helper and refactor the dashboard calculation to use it.
- [ ] **Step 3:** Pin production/dev dependency versions and generate a lockfile via remote npm-capable execution.
- [ ] **Step 4:** Add ESLint and Vitest configuration and scripts.
- [ ] **Step 5:** Update CI to use deterministic install and run lint/test/typecheck/build.
- [ ] **Step 6:** Verify all CI checks pass.

### Task 3: Typed environment configuration

**Files:**
- Modify: `.env.example`
- Create: `lib/env.ts`
- Create: `tests/env.test.ts`

**Interfaces:**
- Produces: validated server/public Supabase configuration accessors; no privileged client secret accessor.

- [ ] **Step 1:** Write tests for missing/invalid Supabase environment configuration.
- [ ] **Step 2:** Implement minimal typed environment validation without leaking server-only secrets.
- [ ] **Step 3:** Document required public URL/publishable key variables in `.env.example`.
- [ ] **Step 4:** Run tests/typecheck/build in CI.

### Task 4: Supabase SSR client boundaries

**Files:**
- Modify: `package.json`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/types.ts` (temporary minimal/generated-type boundary until DB generation is wired)

**Interfaces:**
- Produces: browser client factory and server client factory following current Supabase SSR guidance.

- [ ] **Step 1:** Verify current Supabase changelog/docs for Next.js SSR/auth client setup.
- [ ] **Step 2:** Add pinned `@supabase/supabase-js` and `@supabase/ssr` dependencies.
- [ ] **Step 3:** Implement browser/server client factories using publishable credentials only where browser-visible.
- [ ] **Step 4:** Ensure server module is not imported into client components.
- [ ] **Step 5:** Run lint/test/typecheck/build in CI.

### Task 5: Versioned initial database migration

**Files:**
- Create: `supabase/migrations/20260917_initial_crm_foundation.sql`
- Modify: `db/schema.sql` (mark as legacy/reference or remove after migration parity is confirmed)
- Create: `docs/database.md`

**Interfaces:**
- Produces: versioned SQL migration representing the current organizations/users/leads/activities baseline, including deterministic `updated_at` handling and safer same-organization relationship groundwork.

- [ ] **Step 1:** Translate the existing schema into a migration without inventing Phase 2 RLS policies prematurely.
- [ ] **Step 2:** Add timestamp update trigger/function and necessary constraints/indexes.
- [ ] **Step 3:** Validate SQL against a connected Supabase/Postgres project if available.
- [ ] **Step 4:** Run Supabase advisors if the connected project allows it and record/fix relevant findings.
- [ ] **Step 5:** Document migration workflow and the fact that RLS/auth linkage is Phase 2.
- [ ] **Step 6:** Run final Phase 1 CI verification.

### Task 6: Phase 1 gate report

**Files:**
- Create: `docs/phase-reports/phase-01-foundation.md`

**Interfaces:**
- Produces: evidence-based status used to decide whether Phase 2 may start.

- [ ] **Step 1:** Record exact CI/build/test results and any external configuration still required.
- [ ] **Step 2:** List DONE AND VERIFIED, DONE BUT NEEDS EXTERNAL CONFIGURATION, NOT DONE, and NEXT PHASE.
- [ ] **Step 3:** Start Phase 2 only if all mandatory Phase 1 checks are green.
