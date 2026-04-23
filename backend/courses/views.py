from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Category, Course, Review, Favorite
from .serializers import CategorySerializer, CourseSerializer, ReviewSerializer, FavoriteSerializer
#FBV1
@api_view(['GET'])
@permission_classes([permissions.AllowAny]) 
def category_list(request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

#FBV2
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CategorySerializer(category)
    return Response(serializer.data)

#ModelViewSet
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
#ModelViewSet
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        queryset = Review.objects.all()
        course_id = self.request.query_params.get('course') 
        if course_id is not None:
            queryset = queryset.filter(course_id=course_id) 
        return queryset

#CBV1
class FavoriteListAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated] 

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        serializer = FavoriteSerializer(favorites, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#CBV2
class FavoriteDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, pk, user):
        try:
            return Favorite.objects.get(pk=pk, user=user)
        except Favorite.DoesNotExist:
            raise Http404

    def delete(self, request, pk):
        favorite = self.get_object(pk, request.user)
        favorite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)