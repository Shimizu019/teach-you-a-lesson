# Teach You a Lesson

An offline-capable learning continuity and classroom management system for teachers and students. It helps classes continue when face-to-face lessons are disrupted (typhoons, suspensions, emergencies, internet interruptions).

> "Teach You a Lesson" is the temporary project codename. The final product name is still undecided.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend (planned): Laravel + PHP + MySQL (REST API, Sanctum auth)
- Offline storage (planned): IndexedDB + sync queue

## Getting Started

Requirements: Node.js 24+, npm.

```bash
cd frontend
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Project Structure

```text
frontend/  React + TypeScript + Vite app (UI prototype with mock data)
backend/   Laravel backend (not implemented yet)
docs/      Architecture, database, API, and feature specs
```

## Status

Frontend UI prototype only (Dashboard, My Lessons, Subjects, Progress) using static mock data. No backend, API, auth, or database yet.
