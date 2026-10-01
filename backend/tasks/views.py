from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Tag, Task
from .serializers import TagSerializer, TaskSerializer


class TaskViewSet(ReadOnlyModelViewSet):
    queryset = Task.objects.select_related("tag").all()
    serializer_class = TaskSerializer


class TagViewSet(ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
