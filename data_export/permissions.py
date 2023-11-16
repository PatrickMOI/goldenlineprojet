from rest_framework import permissions


class PermissionDataExport(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.has_perm("auth.data_export")
