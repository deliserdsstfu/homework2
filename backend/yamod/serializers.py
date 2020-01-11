from rest_framework import serializers
from .models import Country, Event, Employee, Media


class CountryOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class EventListSerializer(serializers.ModelSerializer):
    country_name = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'

    def get_country_name(self, obj):
        return obj.country.name if obj.country else ''


class EventFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'

class CountryFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = '__all__'

class CountryListSerializer(serializers.ModelSerializer):



    class Meta:
        model = Country
        fields = '__all__'



class EmployeeOptionSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = '__all__'

    def get_name(self, obj):
        return ' '.join(filter(None, (obj.first_name, obj.last_name)))


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'
