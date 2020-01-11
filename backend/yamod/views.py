from django.contrib.auth.decorators import permission_required
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import views
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from yamod.models import Country, Event, Employee, Media
from yamod.serializers import *


@swagger_auto_schema(method='GET', responses={200: CountryOptionSerializer(many=True)})
@api_view(['GET'])
def country_option_list(request):
    countries = Country.objects.all()
    serializer = CountryOptionSerializer(countries, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: EventListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_event', raise_exception=True)
def events_list(request):
    countries = Event.objects.all()
    serializer = EventListSerializer(countries, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=EventFormSerializer, responses={200: EventFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_event', raise_exception=True)
def event_form_create(request):
    serializer = EventFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=EventFormSerializer, responses={200: EventFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_event', raise_exception=True)
def event_form_update(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Event does not exist.'}, status=404)

    serializer = EventFormSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: EventFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_event', raise_exception=True)
def event_form_get(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Event does not exist.'}, status=404)

    serializer = EventFormSerializer(event)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_event', raise_exception=True)
def event_delete(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Event does not exist.'}, status=404)
    event.delete()
    return Response(status=204)

@swagger_auto_schema(method='GET', responses={200: CountryListSerializer(many=True)})
@api_view(['GET'])
@permission_required('yamod.view_country', raise_exception=True)
def countrys_list(request):
    countries = Country.objects.all()
    serializer = CountryListSerializer(countries, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=CountryFormSerializer, responses={200: CountryFormSerializer()})
@api_view(['POST'])
@permission_required('yamod.add_country', raise_exception=True)
def country_form_create(request):
    serializer = CountryFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=CountryFormSerializer, responses={200: CountryFormSerializer()})
@api_view(['PUT'])
@permission_required('yamod.change_country', raise_exception=True)
def country_form_update(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Country does not exist.'}, status=404)

    serializer = CountryFormSerializer(country, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: CountryFormSerializer()})
@api_view(['GET'])
@permission_required('yamod.view_country', raise_exception=True)
def country_form_get(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Country does not exist.'}, status=404)

    serializer = CountryFormSerializer(country)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_required('yamod.delete_country', raise_exception=True)
def country_delete(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response({'error': 'Country does not exist.'}, status=404)
    country.delete()
    return Response(status=204)



@swagger_auto_schema(method='GET', responses={200: EmployeeOptionSerializer(many=True)})
@api_view(['GET'])
def employee_option_list(request):
    people = Employee.objects.all()
    serializer = EmployeeOptionSerializer(people, many=True)
    return Response(serializer.data)


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        file = request.FILES['file']
        file_input = {
            'original_file_name': file.name,
            'content_type': file.content_type,
            'size': file.size,
        }
        serializer = MediaSerializer(data=file_input)
        if serializer.is_valid():
            serializer.save()
            default_storage.save('media/' + str(serializer.data['id']), ContentFile(file.read()))
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


def media_download(request, pk):
    media = Media.objects.get(pk=pk)
    data = default_storage.open('media/' + str(pk)).read()
    content_type = media.content_type
    response = HttpResponse(data, content_type=content_type)
    original_file_name =media.original_file_name
    response['Content-Disposition'] = 'inline; filename=' + original_file_name
    return response


@swagger_auto_schema(method='GET', responses={200: MediaSerializer()})
@api_view(['GET'])
def media_get(request, pk):
    try:
        media = Media.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({'error': 'Media does not exist.'}, status=404)

    serializer = MediaSerializer(media)
    return Response(serializer.data)
