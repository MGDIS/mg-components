## Design

### Standard

Sizes (px) :

- 12x12 small
- 16x16 regular
- 24x24 large
- 36x36 extra-large

Color: text of the page (usually [@color-dark](./?path=/docs/style-colors--page))

### Use alone with informative color

When using a pictograph alone with an informative color, the color must be displayed in the background for accessibility reasons.

The colors to be used are variations of the standard colors, with the brightness increased by 20%.

Rule applicable for all except "info" blue. "Info" pictographs without text are usually displayed in the font color.

![](./mg-icon/doc/img/mg-icon-color-bg.png)

### File naming

- Separator: "-" (dash). By default, the pictographs are the "filled" version, but this doesn't need to be specified in the naming
- Variant: "-outline". If pictograph variant has a background that has a full circle > add "-circle" ex : check-circle, check-circle-outline

## CSS Variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- `--mg-icon-small-size`: Define small icon size, default: `1.2rem`
- `--mg-icon-regular-size`: Define regular icon size, default: `1.6rem`
- `--mg-icon-large-size`: Define large icon size, default: `2.4rem`
- `--mg-icon-extra-large-size`: Define extra large icon size, default: `3.6rem`

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                             | Type                                               | Default     |
| --------- | --------- | ----------------------------------------------------------------------- | -------------------------------------------------- | ----------- |
| `icon`    | `icon`    | Icon to display                                                         | `string`                                           | `undefined` |
| `size`    | `size`    | Define icon size                                                        | `"extra-large" \| "large" \| "regular" \| "small"` | `'regular'` |
| `spin`    | `spin`    | Make the icon spin                                                      | `boolean`                                          | `false`     |
| `variant` | `variant` | Define icon variant Add a background to the icon based on variant color | `"danger" \| "info" \| "success" \| "warning"`     | `undefined` |


## Dependencies

### Used by

 - [mg-action-more](../../molecules/mg-action-more)
 - [mg-button](../mg-button)
 - [mg-details](../../molecules/mg-details)
 - [mg-input-checkbox](../../molecules/inputs/mg-input-checkbox)
 - [mg-input-date](../../molecules/inputs/mg-input-date)
 - [mg-input-numeric](../../molecules/inputs/mg-input-numeric)
 - [mg-input-password](../../molecules/inputs/mg-input-password)
 - [mg-input-radio](../../molecules/inputs/mg-input-radio)
 - [mg-input-select](../../molecules/inputs/mg-input-select)
 - [mg-input-text](../../molecules/inputs/mg-input-text)
 - [mg-input-textarea](../../molecules/inputs/mg-input-textarea)
 - [mg-input-toggle](../../molecules/inputs/mg-input-toggle)
 - [mg-item-more](../../molecules/mg-item-more)
 - [mg-menu-item](../../molecules/menu/mg-menu-item)
 - [mg-message](../../molecules/mg-message)
 - [mg-modal](../../molecules/mg-modal)
 - [mg-pagination](../../molecules/mg-pagination)
 - [mg-panel](../../molecules/mg-panel)
 - [mg-popover](../../molecules/mg-popover)
 - [mg-tabs](../../molecules/mg-tabs)

### Graph
```mermaid
graph TD;
  mg-action-more --> mg-icon
  mg-button --> mg-icon
  mg-details --> mg-icon
  mg-input-checkbox --> mg-icon
  mg-input-date --> mg-icon
  mg-input-numeric --> mg-icon
  mg-input-password --> mg-icon
  mg-input-radio --> mg-icon
  mg-input-select --> mg-icon
  mg-input-text --> mg-icon
  mg-input-textarea --> mg-icon
  mg-input-toggle --> mg-icon
  mg-item-more --> mg-icon
  mg-menu-item --> mg-icon
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
