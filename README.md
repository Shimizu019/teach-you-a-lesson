# Teach You a Lesson

An educational learning platform currently under active development. This project provides a student-oriented learning interface with frontend-only prototyping using static/mock data. Backend integration, authentication, and database functionality are planned but not yet implemented.

## Description

Teach You a Lesson is an educational platform designed to help classes continue when face-to-face lessons are disrupted. This repository contains the **frontend prototype** only — a UI mockup using static data with no backend, API, authentication, or database integration.

**Current state:** Frontend prototype with mock/static data. No backend functionality, API endpoints, authentication, or persistent storage is implemented yet.

## Current Features

The following features are implemented in the frontend prototype:

- **Dashboard** — main entry point with overview of class progress
- **Dashboard interactions** — navigation, filtering, and UI controls
- **My Lessons** — student-oriented lesson browsing interface
- **Lesson search and filtering** — search and filter lessons within the prototype
- **Subjects** — subject browsing and display
- **Subject search and category filtering** — filter subjects by category
- **Progress** — progress tracking UI (using mock data)
- **Responsive UI** — layouts adapt to mobile and desktop sizes
- **Mock learning data** — static data used throughout; no real content
- **Student-oriented learning interface** — designed for student use cases only

## Technology Stack

The frontend is built with modern web technologies:

- **React** — ^19.2.8
- **TypeScript** — ~6.0.2
- **Vite** — ^8.3.0 (dev server and build)
- **Tailwind CSS** — ^4.1.0 (utility-first styling)

Additional dev dependencies: oxlint, @vitejs/plugin-react, @types/react, @types/react-dom, @types/node.

## Project Structure

```text
frontend/    React + TypeScript + Vite app (UI prototype with mock data)
backend/     Laravel backend (not implemented yet)
docs/        Architecture, database, API, and feature specs
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Available scripts from `frontend/package.json`:

- `dev` — start Vite development server
- `build` — build for production
- `lint` — lint with oxlint
- `preview` — preview the production build

## Current Development Status

This project is **under active development**. The current implementation is a **frontend-only prototype** using static/mock data. No backend, API, authentication, or database integration is available yet. Features marked as "mock" use placeholder data and do not persist. The project structure and UI components are in place, but real lesson content, teacher functionality, student accounts, and persistent progress tracking are not implemented.

## Future Development

Planned future work includes:

- Backend integration (Laravel + PHP + MySQL)
- Authentication ( Sanctum or similar)
- Real lesson content from database
- Database integration and persistent storage
- Teacher functionality (class creation, enrollment, management)
- Student functionality (accounts, progress tracking, submissions)
- Quiz functionality
- Persistent progress tracking

These features are not yet implemented and will be developed in subsequent phases.
