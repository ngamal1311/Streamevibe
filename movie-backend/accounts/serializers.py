from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Favorite, Saved, SupportMessage

class RegisterSerializar(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        
        extra_kwargs = {
            "password" : {"write_only" : True}
        }
        
    def create(self, validated_data):
        print("Create user from serializer");
        user = User.objects.create_user(
            username= validated_data['username'],
            password = validated_data['password'],
            email = validated_data['email']
        )
        return user
    
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "tmdb_id", "media_type"]
class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saved
        fields = ["id", "tmdb_id", "media_type"]
class SupportMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportMessage
        fields = ["first_name", "last_name", "email", "country_code", "phone_number", "message"]