from rest_framework import serializers
from .models import Type, Post, Memo

class TypeSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Type
        fields = ('id', 'name')

class PostSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Post
        fields = ('id', 'type', 'title', 'writer', 'context', 'created_at', 'updated_at')

class MemoSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Memo
        fields = ('id', 'title', 'context', 'created_at', 'updated_at')