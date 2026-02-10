# Images Lectura

Ce dossier contient les images utilisées par le site Lectura.

## Images de parchemin nécessaires

Pour que le site fonctionne correctement avec le style parchemin, il faut ajouter deux images :

1. **`parchemin_pc.png`** : Image de fond pour les écrans desktop (largeur >= 1200px)
2. **`parchemin_mobile2.png`** : Image de fond pour les écrans mobiles/tablettes (largeur < 1200px)

Ces images doivent :
- Être au format PNG avec transparence si nécessaire
- Avoir une hauteur suffisante pour couvrir toute la hauteur de la page
- Avoir un style de parchemin adapté à l'identité visuelle de Lectura

## Image séparateur

**`separateur.png`** : Image utilisée pour les séparateurs Markdown (`---`)

## Note

Pour l'instant, le site utilise des références vers ces images dans le CSS.  
Si les images ne sont pas présentes, le fond sera transparent (fond noir du body visible).
