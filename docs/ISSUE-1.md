# Issue #1: Add tag assignment to tasks

**Type:** Feature  
**Difficulty:** Junior Fullstack  
**Areas:** Django REST API, React + TypeScript

## Problem

The task list shows the current tag, and the API exposes available tags. However, a user cannot assign a tag to a task or clear its current tag. The task detail endpoint is read-only and the UI has no control for changing a tag.

## Expected behavior

As a user, I want to choose one existing tag for a task, or remove its tag, so that I can organize the task list.

## Acceptance criteria

- [ ] Add a `PATCH /api/tasks/{id}/` operation that accepts `{"tag_id": <id>}`.
- [ ] Accept `{"tag_id": null}` to remove the assigned tag.
- [ ] Return the updated task with its nested `tag` object in the response.
- [ ] Return HTTP 400 for a tag ID that does not exist; return HTTP 404 for a task that does not exist.
- [ ] Add a tag selector to each task in the React UI, including a "Без тега" option.
- [ ] Show the updated tag after a successful save, and show an understandable error if saving fails.
- [ ] Add backend tests for assigning a tag, clearing a tag, and an invalid tag ID.
- [ ] Verify the app still starts with `docker compose up --build`.

## API example

```http
PATCH /api/tasks/4/
Content-Type: application/json

{"tag_id": 2}
```

Expected response (shape):

```json
{
  "id": 4,
  "title": "Реализовать назначение тегов",
  "description": "Эта задача специально оставлена без тега.",
  "tag": {"id": 2, "name": "Backend", "color": "#2563eb"},
  "created_at": "2026-01-01T10:00:00Z"
}
```

To clear the tag, send `{"tag_id": null}`.

## Hints

- The relation already exists as nullable `Task.tag`; no migration should be needed.
- Look at `backend/tasks/serializers.py` and `backend/tasks/views.py` for the API change.
- The UI loads both task and tag data. See `frontend/src/App.tsx`.
- Keep the existing response field `tag` as a nested object for display; the request field can be `tag_id`.
