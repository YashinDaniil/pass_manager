from rest_framework import generics, permissions
from knox.models import AuthToken
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer,  LoginSerializer
from .hash import HashCode
from .models import UserSettings
# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
          "user": UserSerializer(user, context=self.get_serializer_context()).data,
          "token": AuthToken.objects.create(user)[1]
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        user = UserSerializer(user, context=self.get_serializer_context()).data
        return Response({
            "user": user,
            "token": token
        })


class UserAPI (generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get(self, request, format=None):
        user_data = self.request.user
        user_settings = UserSettings.objects.get(user_id=user_data.id)
        return_data = {
            'id': user_data.id,
            'email': user_data.email,
            'language': user_settings.language,
            'theme': user_settings.theme
        }
        return Response(return_data)


class CheckMasterPass (generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):
        user_data = request.data
        hash_code = HashCode()
        account = UserSettings.objects.get(user_id=request.user.id)
        if hash_code.decode(account.master_password) == user_data['master_password']:
            return Response({'correct': True})
        else:
            return Response({'correct': False})


class UpdateSettings (generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):
        user_data = request.data
        user_settings = UserSettings.objects.get(user_id=user_data['id'])
        user_settings.master_password = user_data['master_password']
        user_settings.language = user_data['language']
        user_settings.theme = user_data['theme']
        user_settings.save()

        return Response({'update': 'ok'})

