from rest_framework import serializers
import re
from django.contrib.auth.models import User
from account.hash import HashCode
from .models import Card


class CardSerializer(serializers.ModelSerializer):
    card = serializers.SerializerMethodField()

    def get_card(self, obj):
        hash_code = HashCode()
        obj.name = hash_code.decode(obj.name)[0:-16]
        obj.number = ' '.join([hash_code.decode(obj.number).replace(obj.name, '') [i - 4:i] for i in range(4, len(hash_code.decode(obj.number).replace(obj.name, '')) + 1, 4)])
        obj.cvv = hash_code.decode(obj.cvv).replace(obj.name, '')
        obj.password = hash_code.decode(obj.password).replace(obj.name, '')
        w = re.findall('([A-Z])', obj.name)[1]
        obj.name = obj.name.replace(w, ' ' + w)
        return 0

    class Meta:
        model = Card
        fields = '__all__'


class SingleCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

    def create(self, validated_data):
        hash_code = HashCode()
        number = hash_code.encode('{} {}'.format(validated_data['number'], validated_data['name']))
        cvv = hash_code.encode('{} {}'.format(validated_data['cvv'], validated_data['name']))
        password = hash_code.encode('{} {}'.format(validated_data['password'], validated_data['name']))
        name = hash_code.encode('{} {}'.format(validated_data['name'], validated_data['number']))

        card = Card(
                            user=User.objects.get(id=self.context['request']._auth.user_id),
                            number=number,
                            cvv=cvv,
                            password=password,
                            date=validated_data['date'],
                            name=name,
        )
        card.save()
        return card

    def update(self, instance, validated_data):
        instance_data = instance.user.card_set.get(id=validated_data['id'])
        hash_code = HashCode()

        item_number = hash_code.encode('{} {}'.format(validated_data['number'], validated_data['name']))
        item_cvv = hash_code.encode('{} {}'.format(validated_data['cvv'], validated_data['name']))
        item_password = hash_code.encode('{} {}'.format(validated_data['password'], validated_data['name']))
        item_name = hash_code.encode('{} {}'.format(validated_data['name'], validated_data['number']))

        instance_data.number = instance_data.number if item_number == instance_data.password else item_number
        instance_data.cvv = instance_data.cvv if item_cvv == instance_data.cvv else item_cvv
        instance_data.password = instance_data.password if item_password == instance_data.password else item_password
        instance_data.name = instance_data.name if item_name == instance_data.name else item_name
        instance_data.date = validated_data.get('date', instance_data.date)
        instance_data.save()
        return instance_data
