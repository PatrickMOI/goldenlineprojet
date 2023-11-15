import os
import json
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, F, Sum, DecimalField
from django.db.models.functions import Cast
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework import authentication, status
from rest_framework.views import APIView
from rest_framework.response import Response

from data_export.models import ClientCollecte, Collecte, Client
from data_export.permissions import PermissionDataExport


@login_required()
def page_accueil(request):
    context = {'application': 'Data Export'}

    if request.user.has_perm("auth.data_export"):
        app_base_path = '/static/data_export/build'
        path_manifest = './data_export/static/data_export' \
                        '/build/asset-manifest.json'

        path = os.path.join(os.path.dirname(settings.BASE_DIR), path_manifest)
        with open(path, 'r') as f:
            assets = json.load(f)
            context['main_js'] = app_base_path + assets["files"]['main.js']
            context['main_css'] = app_base_path + assets["files"]['main.css']

        return render(request, 'data_export/accueil.html', context)

    return render(request, '403.html', context)


class VueListeDepenseSocioParCategorie(APIView):
    authentication_classes = (authentication.TokenAuthentication,
                              authentication.SessionAuthentication,)
    permission_classes = (PermissionDataExport,)
    parser_classes = (JSONParser,)

    def get(self, request):
        data = request.GET.copy()
        resultat = []

        categorie_socio = data.get('categorie_socio')
        if categorie_socio:
            resultat = Collecte.objects\
                .filter(identifiant_collecte__client__categorie_socio_professionnelle=categorie_socio) \
                .values(categorie_achat=F('categorie')) \
                .annotate(somme_prix=Sum('montant'))

        return Response({
            'data': resultat
        }, status=status.HTTP_200_OK)


class VueListeDepenseSocioPro(APIView):
    authentication_classes = (authentication.TokenAuthentication,
                              authentication.SessionAuthentication,)
    permission_classes = (PermissionDataExport,)

    def get(self, request):
        resultat = ClientCollecte.objects.values(categorie=F('client__categorie_socio_professionnelle')) \
            .annotate(moyenne_prix=Cast(Avg('prix_panier'),
                                        output_field=DecimalField(decimal_places=2, max_digits=10)
                                        ))

        return Response({
            'data': resultat
        }, status=status.HTTP_200_OK)


class VueListeCollectes(APIView):
    authentication_classes = (authentication.TokenAuthentication,
                              authentication.SessionAuthentication,)
    permission_classes = (PermissionDataExport,)
    parser_classes = (JSONParser,)

    def get(self, request):
        data = request.GET.copy()
        resultat = []

        limite = data.get('limite')
        if limite:
            resultat = Collecte.objects.values(
                'categorie', 'montant', id_client=F('identifiant_collecte__client__pk'))[:int(limite)]

        return Response({
            'data': resultat
        }, status=status.HTTP_200_OK)


class VueListeProfessions(APIView):
    authentication_classes = (authentication.TokenAuthentication,
                              authentication.SessionAuthentication,)
    permission_classes = (PermissionDataExport,)
    parser_classes = (JSONParser,)

    def get(self, request):
        resultat = Client.objects.values_list('categorie_socio_professionnelle', flat=True)\
            .distinct()

        return Response({
            'data': resultat
        }, status=status.HTTP_200_OK)
