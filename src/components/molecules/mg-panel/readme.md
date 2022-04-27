## Design

**RUX-01** : La zone gauche du header affiche le libellé de l'item, cette zone est cliquable et permet de déplier/replier le volet.
Si aucun contenu n'est disponible, le volet ne peut être déplié.
Lorsque le volet est déplié, l'icone est inversé verticalement.

**RUX-02** : La zone droite du header peut accueillir tous composants.

![](./img/components/mg-panel/volet.png)

### Composants

![](./img/components/mg-panel/composants.png)

### Tailles

![](./img/components/mg-panel/tailles.png)

### Espacements

![](./img/components/mg-panel/espacements.png)

### Alignements

![](./img/components/mg-panel/alignements.png)

### Styles

![](./img/components/mg-panel/styles.png)

### Titre modifiable

![](./img/components/mg-panel/titre-modifiable.png)

#### Composants

![](./img/components/mg-panel/titreModifiable-composants.png)

#### Espacements

![](./img/components/mg-panel/titreModifiable-espacements.png)

### Responsive

![](./img/components/mg-panel/responsive.png)

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute        | Description                                                                                                 | Type      | Default                |
| ------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- | --------- | ---------------------- |
| `expanded`                | `expanded`       | Panel is opened                                                                                             | `boolean` | `false`                |
| `identifier`              | `identifier`     | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`  | `createID('mg-panel')` |
| `panelTitle` _(required)_ | `panel-title`    | Panel title                                                                                                 | `string`  | `undefined`            |
| `titleEditable`           | `title-editable` | Panel title is editabled                                                                                    | `boolean` | `false`                |


## Events

| Event          | Description                     | Type                  |
| -------------- | ------------------------------- | --------------------- |
| `title-change` | Emmited event when title change | `CustomEvent<string>` |


## Dependencies

### Depends on

- [mg-button](../../atoms/mg-button)
- [mg-icon](../../atoms/mg-icon)
- [mg-input-text](../inputs/mg-input-text)

### Graph
```mermaid
graph TD;
  mg-panel --> mg-button
  mg-panel --> mg-icon
  mg-panel --> mg-input-text
  mg-button --> mg-icon
  mg-input-text --> mg-icon
  mg-input-text --> mg-tooltip
  mg-input-text --> mg-input-title
  mg-input-text --> mg-character-left
  style mg-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
