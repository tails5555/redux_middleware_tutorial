from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Type, Post, Image
from .serializers import TypeSerializer, PostSerializer, ImageSerializer
from .utils import ListPagination

class TypeViewSet(viewsets.ModelViewSet) :
    queryset = Type.objects.all()
    serializer_class = TypeSerializer

class PostViewSet(viewsets.ModelViewSet) :
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter,)
    filter_fields = ('type',)
    search_fields = ('title', 'context', 'writer',)
    ordering_fields = ('updated_at',)
    ordering = ('-updated_at',)
    pagination_class = ListPagination

class ImageViewSet(viewsets.ModelViewSet) :
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('post',)