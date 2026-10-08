# ix-taskboard-frontend

A single-page Taskboard app for creating, editing, completing, filtering, and
deleting tasks. It shows API health in the header, a live count of active
tasks, and loading/empty/error states while talking to a REST backend.

## Tech stack
React + TypeScript, Vite, Tailwind CSS, React Router, fetch (no axios).

## Getting started
```
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```
Then open http://localhost:53181

## Environment variables
See .env.example. REACT_APP_API_URL is the base URL of the real backend
(e.g. `GET {REACT_APP_API_URL}/api/tasks`). It is optional for local
development — the app runs on local mock data (USE_MOCK = true in
src/data/store.ts) seeded into localStorage until REACT_APP_API_URL is set
and USE_MOCK is flipped to false in src/data/store.ts.

## Project structure
- src/pages — route-level screens (TaskboardPage, NotFound)
- src/components — shared UI building blocks (Header, AddTaskForm, FilterTabs,
  ActiveTaskCounter, TaskList, TaskItem, InlineEditForm, ConfirmDialog,
  ErrorBanner, LoadingSpinner, EmptyState)
- src/data — mock data, localStorage-backed CRUD store (store.ts)
- src/api — fetch-based API client with error-toast handling
- src/types — shared TypeScript types
- src/constants — shared literal values (priorities, filters, labels)
- src/validation — reusable field validators
- src/utils — generic stateless helpers (date formatting)
