from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from yamod.views import FileUploadView
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('country/options', views.country_option_list),
    path('event/list', views.events_list),
    path('event/create', views.event_form_create),
    path('event/<int:pk>/get', views.event_form_get),
    path('event/<int:pk>/update', views.event_form_update),
    path('event/<int:pk>/delete', views.event_delete),
    path('country/list', views.countrys_list),
    path('country/create', views.country_form_create),
    path('country/<int:pk>/get', views.country_form_get),
    path('country/<int:pk>/update', views.country_form_update),
    path('country/<int:pk>/delete', views.country_delete),
    path('employee/options', views.employee_option_list),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^media$', FileUploadView.as_view()),
    path('media/<int:pk>', views.media_download),
    path('media/<int:pk>/get', views.media_get),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
