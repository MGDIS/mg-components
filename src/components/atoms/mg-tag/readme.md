## Specs

![](./mg-tag/doc/img/mg-tag-specs.png)

### Fill / Outline tags

#### Colors

![](./mg-tag/doc/img/mg-tag-colors.png)

Icons take the color of the label.

### Soft tags

#### Font

![](./mg-tag/doc/img/mg-tag-font.png)

They are not on SemiBold but **Regular**.

#### Colors

![](./mg-tag/doc/img/mg-tag-icons-colors.png)

1. Icons takes the color of the tag variant.
2. Labels are [**@color-dark**](./?path=/docs/style-colors--page) for all.
3. Color background is **90% lightness** of the tag variant.

#### Rules

![](./mg-tag/doc/img/mg-tag-use.png)

For accessibility, soft variant tags cannot use an icon on its own.

## Theming

![](./mg-tag/doc/img/mg-tag-variants.png)

### With Icons

![](./mg-tag/doc/img/mg-tag-icons.png)

## CSS Variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

### Global

- `--mg-tag-height`: Define tag min height, default: `2.3rem`
- `--mg-tag-border-radius`: Define tag border radius, default: `0.5rem`
- `--mg-tag-font-size`: Define tag font size, default: `1.2rem`

### Variant

Variants `primary`, `secondary`, `success`, `warning`, `danger`, `info` can be customized by changing the global [colors](./?path=/docs/style-colors--page).

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                          | Type                                                                       | Default       |
| --------- | --------- | ------------------------------------ | -------------------------------------------------------------------------- | ------------- |
| `outline` | `outline` | Define if tag is using outline style | `boolean`                                                                  | `undefined`   |
| `soft`    | `soft`    | Define if tag is using soft style    | `boolean`                                                                  | `undefined`   |
| `variant` | `variant` | Define tag variant                   | `"danger" \| "info" \| "primary" \| "secondary" \| "success" \| "warning"` | `variants[0]` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
