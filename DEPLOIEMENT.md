# Guide de déploiement — Site Lectura

## État actuel

✅ **Structure du site complète** :
- Configuration Jekyll (`_config.yml`)
- Layouts (base, default, home)
- Includes (head, header, footer)
- Assets (CSS, JavaScript)
- Pages de contenu (Accueil, Produits, Projets, Méthode, Vision, pages légales)
- Fichiers de configuration (`.gitignore`, `README.md`)

## Mise en ligne sur GitHub Pages

### Option 1 : Via l'interface GitHub (recommandé pour débuter)

1. **Vérifier que tous les fichiers sont dans le dépôt**
   ```bash
   git add .
   git commit -m "Initial commit - Site Lectura"
   git push origin main
   ```

2. **Activer GitHub Pages**
   - Aller dans **Settings** du dépôt `lectura-site`
   - Section **Pages** (dans le menu de gauche)
   - **Source** : sélectionner `Deploy from a branch`
   - **Branch** : `main` / `root`
   - Cliquer sur **Save**

3. **Attendre le déploiement**
   - Le site sera accessible sur : `https://maxcarriere.github.io/lectura-site`
   - Le premier déploiement peut prendre quelques minutes

### Option 2 : Via GitHub Actions (si besoin de plus de contrôle)

Si vous souhaitez utiliser GitHub Actions pour le déploiement, créez `.github/workflows/jekyll.yml` :

```yaml
name: Jekyll site CI

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-ruby@v1
        with:
          ruby-version: '3.1'
      - name: Install Jekyll
        run: gem install jekyll bundler
      - name: Build site
        run: jekyll build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

## Vérification après déploiement

Une fois le site en ligne sur `https://maxcarriere.github.io/lectura-site`, vérifier :

- ✅ La page d'accueil s'affiche correctement
- ✅ La navigation fonctionne (Produits, Projets, Méthode, Vision)
- ✅ Le menu mobile fonctionne (hamburger)
- ✅ Les styles CSS sont appliqués
- ✅ Les liens internes fonctionnent

## Configuration du domaine personnalisé

Une fois le domaine `www.lec-tu-ra.com` prêt :

1. Suivre les instructions dans `CONFIGURATION_DOMAINE.md`
2. Créer le fichier `CNAME` avec le nom de domaine
3. Mettre à jour l'URL dans `_config.yml` si nécessaire

## Prochaines étapes

- [ ] Enrichir le contenu des pages Produits et Projets
- [ ] Compléter les pages Mentions légales, Confidentialité, Contact
- [ ] Ajouter des images/logo si nécessaire
- [ ] Configurer le domaine personnalisé
- [ ] Tester sur différents navigateurs et appareils

## Support

En cas de problème :
- Documentation GitHub Pages : https://docs.github.com/en/pages
- Documentation Jekyll : https://jekyllrb.com/docs/
- Vérifier les logs de déploiement dans l'onglet **Actions** du dépôt GitHub
