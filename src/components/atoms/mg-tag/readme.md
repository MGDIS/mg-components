## Design

### Wording

Le terme utilisé pour le statut correspond au participe passé du terme du bouton qui le déclenche (le terme du bouton doit être à l'infinitif cf. PDA9-67).

Exemples :
- Bouton "Publier" > Statut "Publié"
- Bouton "Désactiver" > Statut "Désactivé"

Le genre du statut doit être contextuel.
Ex : pour des listes de valeurs, on ne mettra pas le statut au féminin systématiquement mais suivant les valeurs > si on est sur une liste de motifs, on mettra le statut au masculin, si on est sur une liste de catégories on mettra au féminin...

### Style

![style](./mg-tag/doc/img/specs.png)

### Utilisation

- Primary: Etats de la demande sur l'EU
- Secondary: Brouillon
- Sucess: Partagé, Recevable, Vérifié, Favorable
- Warning: Désactivé
- Danger: Non vérifié
- Info: Publié, Activé
<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                             | Type      | Default       |
| --------- | --------- | --------------------------------------- | --------- | ------------- |
| `outline` | `outline` | Define if button is using outline style | `boolean` | `undefined`   |
| `variant` | `variant` | Define button variant                   | `string`  | `variants[0]` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
