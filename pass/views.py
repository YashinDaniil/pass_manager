from .models import PasswordSec
from rest_framework import generics, permissions
from rest_framework.mixins import ListModelMixin
from .serializers import PassSerializer, SinglePassSerializer
from rest_framework.response import Response


class PassViewSet(ListModelMixin, generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        try:
            return self.request.user.passwordsec_set
        except PasswordSec.DoesNotExist:
            return None

    serializer_class = PassSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class SinglePassView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = PasswordSec.objects.all()
    serializer_class = SinglePassSerializer

    def get(self, request, *args, **kwargs):
        return Response(self.queryset)


class EditPass(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SinglePassSerializer
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.update(request, request.data)
        return Response({
            "update": 'ok',
        })

class AddPass(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SinglePassSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pass_item = serializer.save()
        return Response({
            "pass_id": pass_item.id,
        })

class DeletePass(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        PasswordSec.objects.get(id=request.data['id']).delete()
        return Response({
            "delete": 'ok',
        })
