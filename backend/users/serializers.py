from rest_framework import serializers
from django.contrib.auth.models import User 

class UserRegistrationSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        """Check two passord was be equal"""
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "As senhas devem ser iguais."})
        return data

    def create(self, validated_data):
        """Create user"""
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user