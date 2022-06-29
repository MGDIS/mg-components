## Usage

Un popover est plus enrichi qu'une tooltip mais moins bloquant qu'une modale

## Behavior

la fenêtre est affichée au clic sur son déclencheur

la fenêtre est affichée à côté de son déclencheur, le plus souvent en dessous. Un triangle (en css) fait le lien entre le déclencheur et la fenêtre.

la fenêtre se ferme:

- au clic sur son déclencheur ou
- au clic en dehors de la fenêtre ou
- à la pression de la touche ECHAP
- au clic sur le bouton de fermeture en haut à droite

la taille de la fenêtre est déterminée par le contenu (prévoir une taille max pour éviter des écueils)

le titre et le bouton fermer sont optionnels

## Specs

### Fonts

![](./mg-popover/doc/img/font-popover.png)

### Spacing

![](./mg-popover/doc/img/mg-popover-spacing.png)

### Sizing

![](./mg-popover/doc/img/mg-popover-sizing.png)

### Alignements

![](./mg-popover/doc/img/mg-popover-align.png)

### Positionnements

#### Item

![](./mg-popover/doc/img/mg-popover-position.png)

#### Screen

![](./mg-popover/doc/img/mg-popover-position-screen.png)

### Style

![](./mg-popover/doc/img/mg-popover-style.png)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                      | Type                                                                                                                                                                                                         | Default                  |
| ------------- | -------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `closeButton` | `close-button` | Define if popover has a cross button                                             | `boolean`                                                                                                                                                                                                    | `false`                  |
| `disabled`    | `disabled`     | Disable popover                                                                  | `boolean`                                                                                                                                                                                                    | `false`                  |
| `display`     | `display`      | Display popover                                                                  | `boolean`                                                                                                                                                                                                    | `false`                  |
| `identifier`  | `identifier`   | Sets an `id` attribute. Needed by the input for accessibility `aria-decribedby`. | `string`                                                                                                                                                                                                     | `createID('mg-popover')` |
| `placement`   | `placement`    | Popover placement                                                                | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`               |


## Dependencies

### Depends on

- [mg-button](../../atoms/mg-button)
- [mg-icon](../../atoms/mg-icon)

### Graph
```mermaid
graph TD;
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-button --> mg-icon
  style mg-popover fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
