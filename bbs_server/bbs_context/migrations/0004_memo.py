# Generated by Django 2.1.2 on 2018-11-27 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bbs_context', '0003_auto_20181127_2131'),
    ]

    operations = [
        migrations.CreateModel(
            name='Memo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(default='메모장 제목', max_length=200)),
                ('context', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
