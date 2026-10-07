# ix-taskboard-frontend — Routes & Navigation

## How to run
cd /workspace/frontend_runs/e66bdc10-7513-45e4-962b-27b16fb3b7ec/project
npm install --legacy-peer-deps && npm run dev
Then open http://localhost:53181

## Routes

| Route | Page file | Description |
|-------|-----------|-------------|
| /     | redirects | Redirects to /tasks |
| /tasks | src/pages/TaskboardPage.tsx | Main taskboard: add/edit/complete/delete/filter tasks, API health in header |
| *     | src/pages/NotFound.tsx | Catch-all 404 page with a "Go Home" link |

## Navigation map
- Header -> displays live API health status (fetched on load, no navigation)
- TaskboardPage -> AddTaskForm creates a task, which is prepended to the visible list (no route change)
- TaskboardPage -> FilterTabs switches between All / Active / Completed (client-side state, no route change)
- TaskboardPage -> TaskItem edit button opens an inline edit form in place (no route change)
- TaskboardPage -> TaskItem delete button opens a ConfirmDialog before the DELETE request is sent
- Any unknown URL -> NotFound -> "Go Home" link returns to "/" which redirects to /tasks

This is a single-page app with no sidebar/tab navigation between multiple
screens — all task management happens on one page, matching the original
business requirements (single-page Taskboard).

## Shared components
- src/components/Header.tsx — app title and live API health indicator
- src/components/ErrorBanner.tsx — dismissible error banner for failed requests/validation errors
- src/components/AddTaskForm.tsx — create-task form (title, description, priority) with validation
- src/components/FilterTabs.tsx — All / Active / Completed filter control
- src/components/ActiveTaskCounter.tsx — count of tasks with completed=false
- src/components/TaskList.tsx — renders the filtered task array or an EmptyState
- src/components/TaskItem.tsx — single task row: checkbox, title, description, priority badge, timestamp, edit/delete actions
- src/components/InlineEditForm.tsx — inline title/description/priority editor used by TaskItem
- src/components/ConfirmDialog.tsx — confirmation modal used before deleting a task
- src/components/LoadingSpinner.tsx — loading indicator shown while tasks are fetched
- src/components/EmptyState.tsx — "No tasks yet" / filtered empty-state message

## Design tokens
- primary: #0066cc
- success: #28a745
- warning: #ff9800
- danger: #dc3545
- info: #6c757d
- background: #f8f9fa
- surface: #ffffff
- text-dark: #212529
- muted: #6c757d
- border: #dee2e6

Spacing scale: xs 4px, sm 8px, md 16px, lg 24px, xl 32px.
Typography scale: h1 28px/700, h2 20px/700, body 14px, small 12px, button 14px/500.

## Known test notes
`npx vitest run` passes (2/2 smoke tests). React Router logs its standard
v7 future-flag warnings to stderr during tests; these are informational only
and do not indicate a failure.
