## Design

### Libellé

- le libellé est situé à gauche du champ de saisie.
- l'alignement du texte est à droite.
- le libellé peut être sur une ou plusieurs lignes.
- le libellé peut être positionné au dessus du champ de saisie.

### Label on top

![espacements-labelTop.png](/img/components/mg-input/espacements-labelTop.png)
 le "i" sera positionné à côté du libellé dans une prochaine version, pour le moment il suit l'input

 ### Polices

![polices.png](/img/components/mg-input/polices.png)

### Styles / states

![styles.png](/img/components/mg-input/styles.png)

### Formulaire

#### Espacements

![form-espacements.png](/img/components/mg-input/form-espacements.png)


<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute    | Description                                                       | Type      | Default     |
| ------------------------- | ------------ | ----------------------------------------------------------------- | --------- | ----------- |
| `identifier` _(required)_ | `identifier` | Label input id                                                    | `string`  | `undefined` |
| `isLegend`                | `is-legend`  | Switch from label to fieldset sementic                            | `boolean` | `false`     |
| `required`                | `required`   | If input is required an asterisk is added at the end of the label | `boolean` | `undefined` |


## Dependencies

### Used by

 - [mg-input-checkbox](../../molecules/inputs/mg-input-checkbox)
 - [mg-input-date](../../molecules/inputs/mg-input-date)
 - [mg-input-numeric](../../molecules/inputs/mg-input-numeric)
 - [mg-input-password](../../molecules/inputs/mg-input-password)
 - [mg-input-radio](../../molecules/inputs/mg-input-radio)
 - [mg-input-select](../../molecules/inputs/mg-input-select)
 - [mg-input-text](../../molecules/inputs/mg-input-text)
 - [mg-input-textarea](../../molecules/inputs/mg-input-textarea)
 - [mg-input-toggle](../../molecules/inputs/mg-input-toggle)

### Graph
```mermaid
graph TD;
  mg-input-checkbox --> mg-input-title
  mg-input-date --> mg-input-title
  mg-input-numeric --> mg-input-title
  mg-input-password --> mg-input-title
  mg-input-radio --> mg-input-title
  mg-input-select --> mg-input-title
  mg-input-text --> mg-input-title
  mg-input-textarea --> mg-input-title
  mg-input-toggle --> mg-input-title
  style mg-input-title fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
