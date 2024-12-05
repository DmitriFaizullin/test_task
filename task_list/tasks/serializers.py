from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Task


class UserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели пользователя.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class TaskSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели задачи.
    """
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'completed', 'created_at')

    def validate(self, data):
        user = self.context['request'].user
        title = data.get('title')
        if Task.objects.filter(user=user, title=title).exists():
            raise serializers.ValidationError(
                "Задача с таким заголовком уже существует.")
        return data
