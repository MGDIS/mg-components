## Specs

 ![](./mg-tag/doc/img/specs-tags.png) 

### Fill / Outline tags

#### Colors 

![](./mg-tag/doc/img/colors-tag.png)

Icons take the color of the label.

### Soft tags

#### Font 

![](./mg-tag/doc/img/font-tags.png) 

They are not on *SemiBold but Regular*.

#### Colors

![](./mg-tag/doc/img/icons-colors-tags.png) 

1. Icons takes the color of the tag variant.
2. Labels are **@dark** for all.
3. Color background is *90% lightness* of the tag variant. 

#### Rules

![](./mg-tag/doc/img/use-tags.png) 

All must have label for accessibility. 
This is not possible only for software tags. 
For "normal" tags only a pictogram can be used because the contrast is sufficient.

## Theming

![](./mg-tag/doc/img/tags.png) 

### With Icons

![](./mg-tag/doc/img/tags-icons.png) 

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
