from django.contrib import admin
from data_export.models import Client, ClientCollecte, Collecte


class ClientAdmin(admin.ModelAdmin):
    list_display = ('id', 'categorie_socio_professionnelle', 'nombre_enfants')
    search_fields = ['categorie_socio_professionnelle']

    fieldsets = (
        ('Fields', {
            'fields': ('categorie_socio_professionnelle', 'nombre_enfants')
        }),
    )


class ClientCollecteAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'prix_panier')

    fieldsets = (
        ('Fields', {
            'fields': ('client', 'prix_panier')
        }),
    )


class CollecteAdmin(admin.ModelAdmin):
    list_display = ('id', 'identifiant_collecte', 'categorie', 'montant')
    search_fields = ['categorie']

    fieldsets = (
        ('Fields', {
            'fields': ('identifiant_collecte', 'categorie', 'montant')
        }),
    )


admin.site.register(Client, ClientAdmin)
admin.site.register(ClientCollecte, ClientCollecteAdmin)
admin.site.register(Collecte, CollecteAdmin)
