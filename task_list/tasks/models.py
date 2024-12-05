from django.contrib.auth.models import User
from django.db import models


class Task(models.Model):
    """
    Модель задачи.
    Эта модель представляет собой задачу, которая включает в себя
    заголовок, описание, статус выполнения, дату создания и
    связь с пользователем. Каждая задача уникальна для каждого
    пользователя по заголовку.
    """
    title = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['title', 'user'], name='unique_task_user')
        ]

    def __str__(self):
        return self.title
