from django.core.management.base import BaseCommand

from tasks.models import Tag, Task


class Command(BaseCommand):
    help = "Create example tags and tasks for local development."

    def handle(self, *args, **options):
        examples = [
            ("Frontend", "#7c3aed"),
            ("Backend", "#2563eb"),
            ("Документация", "#0891b2"),
        ]
        tags = {
            name: Tag.objects.get_or_create(name=name, defaults={"color": color})[0]
            for name, color in examples
        }
        tasks = [
            ("Добавить фильтр задач", "Дать пользователю возможность быстро найти задачу.", tags["Frontend"]),
            ("Проверить обработку ошибок API", "Вернуть понятный ответ при неверном запросе.", tags["Backend"]),
            ("Описать локальный запуск", "Добавить инструкции для новых участников команды.", tags["Документация"]),
            ("Реализовать назначение тегов", "Эта задача специально оставлена без тега.", None),
        ]
        created = 0
        for title, description, tag in tasks:
            _, was_created = Task.objects.get_or_create(
                title=title,
                defaults={"description": description, "tag": tag},
            )
            created += was_created
        self.stdout.write(self.style.SUCCESS(f"Demo data ready ({created} new tasks)."))
