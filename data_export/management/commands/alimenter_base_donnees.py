import random
from django.db import transaction
from django.core.management.base import BaseCommand
from data_export.models import Client, ClientCollecte, Collecte


class Command(BaseCommand):
    help = 'Script pour alimenter la base de données'

    # Liste de 10 professions
    PROFESSIONS = [
        "Médecin",
        "Enseignant",
        "Ingénieur",
        "Artiste",
        "Comptable",
        "Infirmier(e)",
        "Avocat(e)",
        "Chef cuisinier(e)",
        "Développeur",
        "Manager marketing",
    ]

    # Liste de 10 categories vetements
    CATEGORIES_VETEMENTS = [
        "Hauts",
        "Bas",
        "Vêtements d'extérieur",
        "Chaussures",
        "Accessoires",
        "Vêtements de sport",
        "Lingerie et Sous-vêtements",
        "Maillots de bain",
        "Tenues de soirée",
        "Vêtements pour Enfants",
    ]

    def handle(self, *args, **options):
        with transaction.atomic():
            # Alimenter table Client
            for _ in range(20):
                client = Client(
                    nombre_enfants=random.randint(0, 5),
                    categorie_socio_professionnelle=random.choice(self.PROFESSIONS)
                )
                client.save()

            # Alimenter table ClientCollecte
            for _ in range(20):
                client_collecte = ClientCollecte(
                    client=Client.objects.order_by('?').first(),
                    prix_panier=random.uniform(5.0, 100.0)
                )
                client_collecte.save()

            # Alimenter table Collecte
            for client_collecte in ClientCollecte.objects.all():
                prix_panier = client_collecte.prix_panier
                montant_sum = 0
                while montant_sum < prix_panier:
                    categorie = random.choice(self.CATEGORIES_VETEMENTS)
                    montant = random.uniform(1.0, float(prix_panier) - montant_sum)
                    montant_sum += montant

                    collecte = Collecte(
                        identifiant_collecte=client_collecte,
                        categorie=categorie,
                        montant=montant
                    )
                    collecte.save()
