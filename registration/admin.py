from django.contrib import admin
from django.contrib.auth.models import Permission


@admin.register(Permission)
class PermissionAdmin(admin.ModelAdmin):
    model = Permission
    fields = ['codename', 'name', 'content_type']
