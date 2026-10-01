from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from tasks.views import TagViewSet, TaskViewSet

router = DefaultRouter()
router.register("tasks", TaskViewSet)
router.register("tags", TagViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
