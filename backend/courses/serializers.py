from rest_framework import serializers
from .models import Category, Course, Review, Favorite

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True) 
    name = serializers.CharField(max_length=255) 

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class CourseSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'video_url', 'avatar_url', 'category', 'category_name', 'author', 'author_name', 'created_at']
        read_only_fields = ['author']

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'course', 'user', 'user_name', 'created_at']
        read_only_fields = ['user']

class FavoriteSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True) 
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    def create(self, validated_data):
        return Favorite.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.course = validated_data.get('course', instance.course)
        instance.save()
        return instance