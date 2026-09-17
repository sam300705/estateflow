# EstateFlow

EstateFlow is a demo-first real-estate sales CRM for brokers, agencies, and property teams. It centralizes incoming leads, tracks pipeline stages, records budgets and preferred locations, and highlights follow-ups that need attention.

## Current MVP

- Lead dashboard with pipeline KPIs
- Search and stage filtering
- Add-lead workflow
- Lead priority, budget, source, property type, and follow-up tracking
- Responsive UI built with Next.js + TypeScript
- PostgreSQL production schema in `db/schema.sql`
- Demo data included so the app runs without external services

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production roadmap

The checked-in PostgreSQL schema is the persistence contract for the next production phase: authentication, organization workspaces, database-backed leads, activity history, reminders, assignments, and reporting.

## Stack

Next.js, React, TypeScript, PostgreSQL-ready data model.

> This repository currently ships a functional portfolio/demo MVP. Demo records are stored in browser state and reset on refresh; production persistence is intentionally separated into the database schema for the next integration step.
