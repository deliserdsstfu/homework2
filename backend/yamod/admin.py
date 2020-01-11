from django.contrib import admin
from .models import *

class EventAdmin(admin.ModelAdmin):

    list_display = ('title', 'date', 'country')
    search_fields = ('title', 'date', 'country')
    sortable_by = ('title', 'date', 'country')


class EmployeeAdmin(admin.ModelAdmin):

    list_display = ('first_name', 'last_name', 'years_in_company')
    search_fields = ('first_name', 'last_name', 'years_in_company')
    sortable_by = ('first_name', 'last_name', 'years_in_company')



class CountryAdmin(admin.ModelAdmin):

    list_display = ('name', 'size', 'citizens')
    search_fields = ('name', 'size', 'citizens')
    sortable_by = ('name', 'size', 'citizens')



admin.site.register(Event, EventAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Country, CountryAdmin)

