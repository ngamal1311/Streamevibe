from django.db import models
from django.contrib.auth.models import User


class Favorite(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    tmdb_id = models.IntegerField()

    media_type = models.CharField(
        max_length=10
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "tmdb_id", "media_type"],
                name="unique_user_tmdb_favorite"
            )
        ]

    def __str__(self):
        return f"{self.user.username} - {self.media_type} - {self.tmdb_id}"
    
class Saved(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    tmdb_id = models.IntegerField()

    media_type = models.CharField(
        max_length=10
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "tmdb_id", "media_type"],
                name="unique_user_tmdb_saved"
            )
        ]

    def __str__(self):
        return f"{self.user.username} - {self.media_type} - {self.tmdb_id}"
from django.db import models


class SupportMessage(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    country_code = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=20)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"