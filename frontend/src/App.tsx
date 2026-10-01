import { useEffect, useState } from "react";
import { getTags, getTasks, type Tag, type Task } from "./api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getTasks(), getTags()])
      .then(([taskItems, tagItems]) => {
        setTasks(taskItems);
        setTags(tagItems);
      })
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Не удалось загрузить данные.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="TaskTag, главная">
          <span className="brand-mark">T</span>
          <span>tasktag</span>
        </a>
        <span className="workspace-label">Рабочее пространство / Моя команда</span>
        <div className="avatar" aria-label="Профиль пользователя">А</div>
      </header>

      <section className="content">
        <div className="intro">
          <div>
            <p className="eyebrow">ПРОЕКТ · ВНУТРЕННИЕ ИНСТРУМЕНТЫ</p>
            <h1>Задачи команды</h1>
            <p className="subtitle">Соберите работу в одном месте и ничего не упустите.</p>
          </div>
          <div className="task-count"><span>{tasks.length}</span> активные задачи</div>
        </div>

        <div className="section-heading">
          <h2>Все задачи</h2>
          <span className="section-note">Недавно добавленные</span>
        </div>

        {loading && <div className="notice">Загружаем задачи…</div>}
        {!loading && error && <div className="notice notice-error" role="alert">{error}</div>}
        {!loading && !error && tasks.length === 0 && (
          <div className="notice">Пока нет задач.</div>
        )}

        {!loading && !error && (
          <div className="task-list">
            {tasks.map((task, index) => (
              <article className="task-card" key={task.id}>
                <div className="task-check" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
                <div className="task-copy">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="task-meta">
                  {task.tag ? (
                    <span className="tag-chip">
                      <span className="tag-dot" style={{ backgroundColor: task.tag.color }} />
                      {task.tag.name}
                    </span>
                  ) : (
                    <span className="no-tag">Без тега</span>
                  )}
                  <span className="task-date">{new Date(task.created_at).toLocaleDateString("ru-RU")}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="tag-legend" aria-label="Доступные теги">
            <span className="tag-legend-label">ТЕГИ ПРОЕКТА</span>
            {tags.map((tag) => (
              <span className="tag-chip" key={tag.id}>
                <span className="tag-dot" style={{ backgroundColor: tag.color }} />
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <aside className="challenge">
          <div className="challenge-icon">✦</div>
          <div>
            <strong>Первое задание</strong>
            <p>Добавьте возможность назначать тег задаче. Подробности — в <code>docs/ISSUE-1.md</code>.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default App;
