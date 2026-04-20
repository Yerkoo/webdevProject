from rest_framework import serializers
from .models import Category, Course, Review

# Переводчик для Категорий
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

# Переводчик для Курсов
class CourseSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'video_url', 'avatar_url', 'category', 'category_name', 'author', 'author_name', 'created_at']
        read_only_fields = ['author']

# Переводчик для Отзывов
class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'course', 'user', 'user_name', 'created_at']
        read_only_fields = ['user']