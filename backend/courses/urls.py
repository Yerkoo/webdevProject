from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, ReviewViewSet, FavoriteListAPIView, FavoriteDetailAPIView
from . import views

router = DefaultRouter()
path('categories/', views.category_list, name='category-list'),
path('categories/<int:pk>/', views.category_detail, name='category-detail'),
router.register(r'courses', CourseViewSet)
router.register(r'reviews', ReviewViewSet)
path('favorites/', views.FavoriteListAPIView.as_view(), name='favorite-list'),
path('favorites/<int:pk>/', views.FavoriteDetailAPIView.as_view(), name='favorite-detail'),


urlpatterns = [
    path('', include(router.urls)),
]