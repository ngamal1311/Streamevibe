from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from .views import RegisterView, ProfileView, LoginView, RefreshView, LogoutView, FavoriteView, SavedView, SupportMessageView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('token/refresh/', RefreshView.as_view(), name='refresh'),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("favorites/", FavoriteView.as_view(), name="favorites"),
    path("favorites/<str:media_type>/<int:tmdb_id>/",FavoriteView.as_view(),name="favorite-detail"),
    path("saved/", SavedView.as_view(), name="saved"),
    path("saved/<str:media_type>/<int:tmdb_id>/",SavedView.as_view(),name="saved-detail"), 
    path("support/", SupportMessageView.as_view(), name="support"),
]