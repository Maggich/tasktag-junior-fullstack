from django.test import TestCase
from rest_framework.test import APIClient

from .models import Tag, Task


class TaskApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.tag = Tag.objects.create(name="Backend", color="#2563eb")
        self.task = Task.objects.create(
            title="Подготовить API",
            description="Добавить endpoint",
            tag=self.tag,
        )

    def test_task_list_includes_read_only_tag_details(self):
        response = self.client.get("/api/tasks/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["results"][0]["tag"]["name"], "Backend")

    def test_tag_list_is_available(self):
        response = self.client.get("/api/tags/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["results"][0]["id"], self.tag.id)
