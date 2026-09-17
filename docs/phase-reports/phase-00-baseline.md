# Phase 0 — Audit and Baseline

Date: 2026-09-17
Branch: `feature/production-hardening`
PR: #1

## Baseline verification

Remote GitHub Actions baseline on Node.js 22:

- Dependency installation: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS

The project therefore has a reproducible build baseline before production work begins.

## Implementation inventory

### EXISTS AND WORKS

- Next.js App Router application shell.
- Responsive dashboard styling.
- Client-side lead search.
- Client-side stage filtering.
- Client-side add-lead modal.
- Demo KPI rendering.
- TypeScript strict mode.
- PostgreSQL-oriented schema draft containing organizations, users, leads, and lead activities.

### EXISTS BUT INCOMPLETE

- Lead management exists only in browser memory.
- Pipeline visualization is derived from demo records only.
- Follow-up display is present but follow-ups are strings, not persisted timestamps/tasks.
- Database schema is disconnected from runtime code.
- Organization and role concepts exist only in SQL, not in application authorization.
- Responsive behavior exists, but the primary lead table remains a large horizontally scrolling table on small screens.

### FRONTEND-ONLY / MOCK

- Seed leads.
- `NorthStar Realty` workspace identity.
- User identity `Sambhav`.
- New lead owner assignment to `Sambhav`.
- Add lead operation.
- Dashboard counts/metrics.
- Priority follow-up list.
- Pipeline stage-health display.

### BROKEN / MISLEADING LOGIC

- Open pipeline value excludes `Lost` but includes `Won`, so closed-won value is incorrectly counted as open pipeline.
- The section labelled `TODAY` does not actually filter follow-ups by date.
- Priority follow-ups can include closed records because filtering is based on priority alone.
- Reports navigation points to `#reports`, but no reports section exists.
- Follow-up values are display strings instead of timestamps.
- Frontend IDs are numeric while the intended database schema uses UUIDs.

### MISSING

- Authentication.
- Password reset/session lifecycle.
- Multi-tenant runtime isolation.
- RBAC enforcement.
- Row Level Security.
- Supabase/database client.
- Server actions/API/domain services.
- Versioned migrations.
- Persistent CRUD.
- Lead detail page.
- Activity timeline implementation.
- Tasks/reminders.
- Site visits.
- Project/property inventory.
- Team invitation/management.
- CSV import/export.
- Lead capture API.
- Real reporting.
- Billing/entitlements.
- Audit logs.
- Error monitoring.
- Unit/integration/E2E tests.
- Lint command/configuration.
- Deterministic lockfile-based CI installation.
- Production deployment for this repository.

### SECURITY RISKS / PRODUCTION BLOCKERS

- No authentication or server-side authorization.
- No tenant isolation.
- No RLS.
- No persistent source of truth.
- No input validation boundary on the server because there is no server mutation path yet.
- No audit trail for business/security mutations.
- Public repository should be reviewed before proprietary commercial functionality expands significantly.

### NICE TO HAVE — DEFERRED

- AI lead summaries and drafting.
- WhatsApp/telephony provider integrations.
- Advanced inventory hierarchy.
- Advanced marketing automation.
- Customer portal.
- Post-sales workflows.

## Phase 0 decision

The baseline application builds successfully, but it is still a demo and must not be sold as a production CRM yet. Phase 1 may begin only after this report commit passes CI.
