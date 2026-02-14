from django.urls import path
from .views import get_questions , register_user, login_user

urlpatterns = [
    path('questions/', get_questions),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
]
