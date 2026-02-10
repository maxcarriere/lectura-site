# Configuration du domaine personnalisé

## Étape 1 : Configurer les DNS

Chez votre registrar de domaine (`www.lec-tu-ra.com`), configurez :

### Enregistrements A (pour la racine @)
```
Type: A
Nom: @
Valeur: 185.199.108.153
TTL: 3600

Type: A
Nom: @
Valeur: 185.199.109.153
TTL: 3600

Type: A
Nom: @
Valeur: 185.199.110.153
TTL: 3600

Type: A
Nom: @
Valeur: 185.199.111.153
TTL: 3600
```

### Enregistrement CNAME (pour www)
```
Type: CNAME
Nom: www
Valeur: maxcarriere.github.io
TTL: 3600
```

## Étape 2 : Créer le fichier CNAME

Une fois les DNS configurés, créez un fichier `CNAME` à la racine du dépôt avec uniquement :

```
www.lec-tu-ra.com
```

**Important** : Le fichier CNAME ne doit contenir QUE le nom de domaine, sans commentaires ni espaces.

## Étape 3 : Activer dans GitHub

1. Allez dans les **Settings** du dépôt `lectura-site`
2. Section **Pages**
3. Dans **Custom domain**, entrez `www.lec-tu-ra.com`
4. Cochez **Enforce HTTPS** (recommandé)

## Étape 4 : Mettre à jour _config.yml

Une fois le domaine actif, vérifiez que `_config.yml` contient bien :

```yaml
url: "https://www.lec-tu-ra.com"
baseurl: ""
```

## Vérification

Après configuration (propagation DNS : 24-48h), le site devrait être accessible sur :
- `https://www.lec-tu-ra.com`
- `https://lec-tu-ra.com` (si redirection configurée)

## En cas de problème

- Vérifier la propagation DNS : https://dnschecker.org
- Vérifier les paramètres GitHub Pages dans les Settings du dépôt
- Consulter la documentation GitHub : https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
