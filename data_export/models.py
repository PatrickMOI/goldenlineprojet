from django.db import models


class Client(models.Model):
    nombre_enfants = models.PositiveSmallIntegerField(blank=False, default=0)
    categorie_socio_professionnelle = models.CharField(blank=False, max_length=30)


class ClientCollecte(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE,)
    prix_panier = models.DecimalField(blank=False, max_digits=10, decimal_places=2)


class Collecte(models.Model):
    identifiant_collecte = models.ForeignKey(ClientCollecte, on_delete=models.CASCADE,)
    categorie = models.CharField(blank=False, max_length=30)
    montant = models.DecimalField(blank=False, max_digits=10, decimal_places=2)
