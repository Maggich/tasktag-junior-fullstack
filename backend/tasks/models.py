from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=40, unique=True)
    color = models.CharField(max_length=7, default="#64748b")

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True)
    tag = models.ForeignKey(
        Tag,
        on_delete=models.SET_NULL,
        related_name="tasks",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self):
        return self.title
