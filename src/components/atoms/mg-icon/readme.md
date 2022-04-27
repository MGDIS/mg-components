## Design

### Standard

Tailles (px) :

- 16x16 défaut
- 24x24
- 32x32

Couleur : du texte de la page (majoritairement @color-dark)

### Utilisation seul avec couleur informative

L'utilisation d'un picto seul portant une couleur informative doit afficher la couleur en fond pour des raisons d'accessibilité.

Les couleurs à utiliser sont des dérivées des couleurs standards, dont le luminosité est augmenté de 20%.

Règle ok pour toutes sauf le bleu de info, mais les pictos info seuls sont affichés dans la couleur de la police la plupart du temps.

### Nommage des fichiers

- Séparateur : "-" (tiret 6)
De base les pictos sont la version "filled", mais pas besoin de le préciser dans le nommage
- Variante : "-outline"
Si variante de picto avec un fond qui est un cercle plein > ajouter "-circle" ex : check-circle, check-circle-outline

### Assets

- [arrow-down](/img/components/mg-icon/arrow-down.svg)
- [arrow-left](/img/components/mg-icon/arrow-left.svg)
- [arrow-right](/img/components/mg-icon/arrow-right.svg)
- [arrow-up](/img/components/mg-icon/arrow-up.svg)
- [arrow-up-right-square](/img/components/mg-icon/arrow-up-right-square.svg)
- [arrows-rotate](/img/components/mg-icon/arrows-rotate.svg)
- [ban](/img/components/mg-icon/ban.svg)
- [calculator	](/img/components/mg-icon/calculator.svg)
- [check](/img/components/mg-icon/check.svg)
- [check-circle](/img/components/mg-icon/check-circle.svg)
- [chevron-down](/img/components/mg-icon/chevron-down.svg)
- [chevron-left](/img/components/mg-icon/chevron-left.svg)
- [chevron-right](/img/components/mg-icon/chevron-right.svg)
- [chevron-up](/img/components/mg-icon/chevron-up.svg)
- [conversation](/img/components/mg-icon/conversation.svg)
- [cross](/img/components/mg-icon/cross.svg)
- [cross-circle](/img/components/mg-icon/cross-circle.svg)
- [download	](/img/components/mg-icon/download.svg)
- [exclamation-circle](/img/components/mg-icon/exclamation-circle.svg)
- [exclamation-triangle](/img/components/mg-icon/exclamation-triangle.svg)
- [file-cog](/img/components/mg-icon/file-cog.svg)
- [file-text](/img/components/mg-icon/file-text.svg)
- [file-upload](/img/components/mg-icon/file-upload.svg)
- [floppy-disk](/img/components/mg-icon/floppy-disk.svg)
- [history](/img/components/mg-icon/history.svg)
- [info-circle](/img/components/mg-icon/info-circle.svg)
- [loader](/img/components/mg-icon/loader.svg)
- [log-in](/img/components/mg-icon/log-in.svg)
- [log-out](/img/components/mg-icon/log-out.svg)
- [magnifying-glass](/img/components/mg-icon/magnifying-glass.svg)
- [paper-plane](/img/components/mg-icon/paper-plane.svg)
- [paper-plane-slash](/img/components/mg-icon/paper-plane-slash.svg)
- [pen](/img/components/mg-icon/pen.svg)
- [pen-fancy](/img/components/mg-icon/pen-fancy.svg)
- [plus-circle](/img/components/mg-icon/plus-circle.svg)
- [trash](/img/components/mg-icon/trash.svg)
- [share](/img/components/mg-icon/share.svg)
- [user-plus](/img/components/mg-icon/user-plus.svg)
- [users](/img/components/mg-icon/users.svg)

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                             | Type      | Default     |
| --------- | --------- | ----------------------------------------------------------------------- | --------- | ----------- |
| `icon`    | `icon`    | Icon to display                                                         | `string`  | `undefined` |
| `size`    | `size`    | Define icon size                                                        | `string`  | `'regular'` |
| `spin`    | `spin`    | Make the icon spin                                                      | `boolean` | `false`     |
| `variant` | `variant` | Define icon variant Add a background to the icon based on variant color | `string`  | `undefined` |


## Dependencies

### Used by

 - [mg-button](../mg-button)
 - [mg-input-checkbox](../../molecules/inputs/mg-input-checkbox)
 - [mg-input-date](../../molecules/inputs/mg-input-date)
 - [mg-input-numeric](../../molecules/inputs/mg-input-numeric)
 - [mg-input-password](../../molecules/inputs/mg-input-password)
 - [mg-input-radio](../../molecules/inputs/mg-input-radio)
 - [mg-input-select](../../molecules/inputs/mg-input-select)
 - [mg-input-text](../../molecules/inputs/mg-input-text)
 - [mg-input-textarea](../../molecules/inputs/mg-input-textarea)
 - [mg-input-toggle](../../molecules/inputs/mg-input-toggle)
 - [mg-message](../../molecules/mg-message)
 - [mg-modal](../../molecules/mg-modal)
 - [mg-pagination](../../molecules/mg-pagination)
 - [mg-panel](../../molecules/mg-panel)
 - [mg-popover](../../molecules/mg-popover)
 - [mg-tabs](../../molecules/mg-tabs)

### Graph
```mermaid
graph TD;
  mg-button --> mg-icon
  mg-input-checkbox --> mg-icon
  mg-input-date --> mg-icon
  mg-input-numeric --> mg-icon
  mg-input-password --> mg-icon
  mg-input-radio --> mg-icon
  mg-input-select --> mg-icon
  mg-input-text --> mg-icon
  mg-input-textarea --> mg-icon
  mg-input-toggle --> mg-icon
  mg-message --> mg-icon
  mg-modal --> mg-icon
  mg-pagination --> mg-icon
  mg-panel --> mg-icon
  mg-popover --> mg-icon
  mg-tabs --> mg-icon
  style mg-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
