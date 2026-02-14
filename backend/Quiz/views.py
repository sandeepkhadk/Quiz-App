from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

@api_view(['GET', 'POST']) # 1. Added 'POST' to allowed methods
def get_questions(request):
    # Handle GET: Fetching questions
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    # Handle POST: Saving a new question
    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        # 1. Check if user already exists
        if User.objects.filter(username=data['email']).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        # 2. Create the user
        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data['name'] 
        )
        
        # 3. Store the role 
        return Response({
            'message': 'User created successfully',
            'name': user.first_name,
            'role': data.get('role', 'player')
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    role_claimed = request.data.get('role') # From the frontend toggle

    # 1. Authenticate against database
    user = authenticate(username=email, password=password)

    if user is not None:
        # 2. Return the stored data
        return Response({
            'message': 'Login successful',
            'name': user.first_name,
            'email': user.email,
            'role': role_claimed # In a real app, fetch actual role from a Profile model
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Email or Password'}, status=status.HTTP_401_UNAUTHORIZED)