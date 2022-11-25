## Design

The badge is always placed on top of, or next to the element it is for.

The badge displays a number (can be followed by the `+` character) or a punctuation character.

## Specs

![](./mg-badge/doc/img/mg-badge-specs.png)

## Theming

![](./mg-badge/doc/img/mg-badge-styles.png)

## CSS Variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- `--mg-badge-size`: define badge height and min-width, default: `1.6rem`
- `--mg-badge-font-size`: define badge font size, default: `1.1rem`

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                                                        | Type               | Default       |
| -------------------- | --------- | ------------------------------------------------------------------ | ------------------ | ------------- |
| `label` _(required)_ | `label`   | Badge label. Include short description. Required for accessibility | `string`           | `undefined`   |
| `outline`            | `outline` | Define if button is using outline style                            | `boolean`          | `undefined`   |
| `value` _(required)_ | `value`   | Badge value                                                        | `number \| string` | `undefined`   |
| `variant`            | `variant` | Define button variant                                              | `string`           | `variants[0]` |


## Dependencies

### Used by

 - [mg-tabs](../../molecules/mg-tabs)

### Graph
```mermaid
graph TD;
  mg-tabs --> mg-badge
  style mg-badge fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
