## Design

### Standard

Sizes (px) :

- 16x16 regular
- 24x24 large
- 36x36 extra-large

Color: text of the page (mostly @color-dark)

### Use alone with informative color

The use of a picto alone with an informative color must display the color in the background for accessibility reasons.

The colors to be used are variations of the standard colors, with the brightness increased by 20%.

Rule ok for all except info blue, but info only pictos are displayed in the font color most of the time.

![](./mg-icon/doc/img/mg-icon-color-bg.png)

### File naming

- Separator: "-" (dash 6). Basically the pictos are the "filled" version, but you don't need to specify it in the naming
- Variant: "-outline". If picto variant with a background that is a full circle > add "-circle" ex : check-circle, check-circle-outline

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
