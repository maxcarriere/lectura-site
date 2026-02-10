# Site Lectura

Site vitrine professionnel du projet Lectura, hébergé sur GitHub Pages.

## Structure

Ce site utilise Jekyll et suit la structure standard :

- `_config.yml` : configuration Jekyll
- `_layouts/` : templates de pages
- `_includes/` : composants réutilisables (header, footer, head)
- `assets/` : CSS et JavaScript
- Pages Markdown à la racine et dans des sous-dossiers

## Développement local

Pour tester le site localement :

```bash
# Installer les dépendances (si Gemfile présent)
bundle install

# Lancer le serveur Jekyll
bundle exec jekyll serve
# ou simplement
jekyll serve
```

Le site sera accessible sur `http://localhost:4000`

## Déploiement

Le site est automatiquement déployé sur GitHub Pages à chaque push sur la branche `main`.

Pour configurer un domaine personnalisé (`www.lec-tu-ra.com`) :

1. Ajouter un fichier `CNAME` à la racine avec le nom de domaine
2. Configurer les enregistrements DNS selon la documentation GitHub Pages
3. Mettre à jour l'URL dans `_config.yml`

## Contenu

Le contenu est organisé selon 4 niveaux de lecture :

- **Niveau 0** (Accueil) : présentation synthétique
- **Niveau 1** (Produits) : outils utilisables
- **Niveau 2** (Projets) : projets techniques et dépôts
- **Niveau 3** (Méthode) : workflow Humain / IA
- **Niveau 4** (Vision) : lecture approfondie et lien avec Humanuscrit

## Licence

MIT License — voir le fichier LICENSE pour plus de détails.
