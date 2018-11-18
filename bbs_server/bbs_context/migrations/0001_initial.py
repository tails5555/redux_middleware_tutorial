# Generated by Django 2.1.2 on 2018-11-18 08:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image_file', models.ImageField(blank=True, default='images/image.jpg', upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(default='게시글 제목', max_length=100)),
                ('writer', models.CharField(default='작성자', max_length=20)),
                ('context', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default='게시판 이름', max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bbs_context.Type'),
        ),
        migrations.AddField(
            model_name='image',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bbs_context.Post'),
        ),
    ]