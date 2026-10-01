# TaskTag — учебное задание для Junior Fullstack-разработчика

Небольшой трекер задач на Django REST Framework и React + Vite + TypeScript. Проект намеренно подготовлен как starter repository: список задач и справочник тегов уже работают, но назначить или снять тег с задачи пока нельзя.

## Задача

Реализуйте назначение существующего тега задаче и снятие тега. Описание задачи, критерии приёмки и ожидаемый API находятся в [`docs/ISSUE-1.md`](docs/ISSUE-1.md).

**Сейчас API не принимает `tag_id` при изменении задачи, а интерфейс только отображает текущий тег.** Не добавляйте отдельную сущность или таблицу связи: у задачи может быть ноль или один тег.

## Стек и структура

- `backend/` — Django, Django REST Framework, PostgreSQL
- `frontend/` — React, Vite, TypeScript
- `compose.yaml` — PostgreSQL, API и Vite dev server
- `docs/ISSUE-1.md` — формулировка issue, которую можно перенести в GitHub

## Запуск через Docker Compose

Требуются Docker Engine и Docker Compose.

```powershell
Copy-Item .env.example .env
docker compose up --build
```

После старта:

- UI: <http://localhost:5173>
- API: <http://localhost:8000/api/tasks/>
- Теги: <http://localhost:8000/api/tags/>
- Django admin: <http://localhost:8000/admin/>

Контейнер API автоматически применяет миграции и добавляет демонстрационные данные. Команда `seed_demo` идемпотентна. Для остановки используйте `docker compose down`; данные PostgreSQL сохраняются в Docker volume. Чтобы удалить и контейнеры, и локальные данные БД, выполните `docker compose down -v`.

## Локальный запуск без Docker

Нужны Python 3.12+, Node.js 20+ и PostgreSQL 16+. Создайте базы/пользователя согласно `.env.example`, затем в первом терминале:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item ..\.env.example ..\.env
# Для запуска Django напрямую, а не в Compose:
# (укажите POSTGRES_HOST=localhost в .env)
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

Во втором терминале:

```powershell
cd frontend
npm install
npm run dev
```

## Проверки

Backend:

```powershell
cd backend
python manage.py test --settings=config.test_settings
```

Frontend:

```powershell
cd frontend
npm run build
```

## Переменные окружения

Скопируйте `.env.example` в `.env`. Значения в примере предназначены только для локальной разработки и не должны использоваться в production.
