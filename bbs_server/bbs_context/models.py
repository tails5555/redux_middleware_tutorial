from django.db import models
from django.utils import timezone

class Type(models.Model) :
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, default='게시판 이름')

class Post(models.Model) :
    id = models.AutoField(primary_key=True)
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default='게시글 제목')
    writer = models.CharField(max_length=20, default='작성자')
    context = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Image(models.Model) :
    id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image_file = models.ImageField(upload_to='images/', blank=True, default='images/image.jpg')