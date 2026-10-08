from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from .serializers import RegisterSerializar, FavoriteSerializer, SavedSerializer, SupportMessageSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .models import Favorite, Saved
# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        print('register view')
        serializer = RegisterSerializar(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('serializer valid')
            return Response(
                {'message': 'User Created successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request):
        return Response({
            'username' : request.user.username,
            'email' : request.user.email
        })
        
class LoginView(APIView):
    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            access_token = serializer.validated_data['access']
            refresh_token = serializer.validated_data['refresh']
            response = Response(
                {'access' : access_token, 'refresh': refresh_token},
                status=status.HTTP_200_OK
            )
            
            response.set_cookie(
                key = 'refresh',
                value= refresh_token,
                secure=False,
                samesite="Lax",
                httponly=True
            )
            
            return response;
        response = Response(
            serializer.errors,
            status=status.HTTP_401_UNAUTHORIZED
        )
    
class RefreshView(APIView):
    
    def post(self, request):
        refresh = request.COOKIES.get('refresh')
        if not refresh:
            return Response(
                {"detail": "Refresh token not found"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        try:
            refresh_token = RefreshToken(refresh)
            access_token = str(refresh_token.access_token)
            return Response(
                {"access": access_token},
                status=status.HTTP_200_OK
            )
        except TokenError:
            return Response(
                {"detail": "Invalid or expired refresh token"},
                status=status.HTTP_401_UNAUTHORIZED
            )
            
class LogoutView(APIView):

    def post(self, request):

        response = Response(
            {"message": "Logged out successfully"},
            status=status.HTTP_200_OK
        )

        response.delete_cookie(
            "refresh_token",
            samesite="Lax"
        )

        return response

class FavoriteView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(
            user=request.user
        )

        serializer = FavoriteSerializer(
            favorites,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = FavoriteSerializer(
        data=request.data
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    def delete(self, request, media_type, tmdb_id):
        try:
            favorite = Favorite.objects.get(
                user=request.user,
                media_type=media_type,
                tmdb_id=tmdb_id
            )

            favorite.delete()

            return Response(
                {"message": "Removed from favorites"},
                status=status.HTTP_200_OK
            )

        except Favorite.DoesNotExist:
            return Response(
                {"detail": "Favorite not found"},
                status=status.HTTP_404_NOT_FOUND
            )
class SavedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        saved = Saved.objects.filter(
            user=request.user
        )

        serializer = SavedSerializer(
            saved,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = SavedSerializer(
        data=request.data
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    def delete(self, request, media_type, tmdb_id):
        try:
            saved = Saved.objects.get(
                user=request.user,
                media_type=media_type,
                tmdb_id=tmdb_id
            )

            saved.delete()

            return Response(
                {"message": "Removed from saved"},
                status=status.HTTP_200_OK
            )

        except Saved.DoesNotExist:
            return Response(
                {"detail": "Saved not found"},
                status=status.HTTP_404_NOT_FOUND
            )
class SupportMessageView(APIView):
    def post(self, request):
        serializer = SupportMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Support message sent successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )