from .models import Card
from rest_framework import generics, permissions
from rest_framework.mixins import ListModelMixin
from .serializers import CardSerializer, SingleCardSerializer
from rest_framework.response import Response


class CardViewSet(ListModelMixin, generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        try:
            return self.request.user.card_set.order_by('-creation_date')
        except Card.DoesNotExist:
            return None

    serializer_class = CardSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class SingleCardView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    queryset = Card.objects.all()
    serializer_class = SingleCardSerializer

    def get(self, request, *args, **kwargs):
        return Response(self.queryset)


class EditCard(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SingleCardSerializer
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.update(request, request.data)
        return Response({
            "update": 'ok',
        })

class AddCard(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SingleCardSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pass_item = serializer.save()
        return Response({
            "card_id": pass_item.id,
        })

class DeleteCard(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request, *args, **kwargs):
        Card.objects.get(id=request.data['id']).delete()
        return Response({
            "delete": 'ok',
        })
