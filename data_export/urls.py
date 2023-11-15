from django.urls import re_path
from data_export import views

urlpatterns = [
    # Liste de professions
    re_path(r'^api/v1/professions/?', views.VueListeProfessions.as_view(), name="liste_professions"),

    # Depenses par categorie d'achat et categorie socio professionnelle
    re_path(r'^api/v1/depenses_categories/?',
            views.VueListeDepenseSocioParCategorie.as_view(),
            name="depenses_par_categorie"),

    # Depenses par categorie socio professionnelle
    re_path(r'^api/v1/depenses/?', views.VueListeDepenseSocioPro.as_view(), name="depenses_socio_pro"),

    # Export de donnees
    re_path(r'^api/v1/collectes/?', views.VueListeCollectes.as_view(), name="liste_collectes"),

    # Page accueil - application React
    re_path('^.*$', views.page_accueil, name='data_export_accueil')
]
