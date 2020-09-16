from rest_framework import serializers
from django.contrib.auth.models import User
from account.hash import HashCode
from .models import PasswordSec


class PassSerializer(serializers.ModelSerializer):
    password = serializers.SerializerMethodField()

    def get_password(self, obj):
        hash_code = HashCode()
        decode_pass = obj.password = hash_code.decode(obj.password).replace(obj.username, '')
        return decode_pass

    class Meta:
        model = PasswordSec
        fields = '__all__'


class SinglePassSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordSec
        fields = '__all__'

    def create(self, validated_data):
        hash_code = HashCode()
        item_password = hash_code.encode('{} {}'.format(validated_data['username'], validated_data['password']))
        password = PasswordSec(
                            user=User.objects.get(id=self.context['request']._auth.user_id),
                            url=validated_data['url'],
                            name=validated_data['name'],
                            username=validated_data['username'],
                            password=item_password,
                            category=validated_data['category'],
        )
        password.save()
        return password

    def update(self, instance, validated_data):
        instance_data = instance.user.passwordsec_set.get(id=validated_data['id'])
        hash_code = HashCode()
        item_password = hash_code.encode('{} {}'.format(validated_data['username'], validated_data['password']))

        instance_data.url = validated_data.get('url', instance_data.url)
        instance_data.name = validated_data.get('name', instance_data.name)
        instance_data.username = validated_data.get('username', instance_data.username)
        instance_data.password = instance_data.password if item_password == instance_data.password else item_password
        instance_data.category = validated_data.get('category', instance_data.category)
        instance_data.save()
        return instance_data