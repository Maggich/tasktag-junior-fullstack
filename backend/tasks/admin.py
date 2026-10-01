from django.contrib import admin

from .models import Tag, Task


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ["name", "color"]
    search_fields = ["name"]


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ["title", "tag", "created_at"]
    list_filter = ["tag"]
    search_fields = ["title", "description"]
