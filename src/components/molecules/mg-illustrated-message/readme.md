## Specs

### Vertical

#### Anatomy

![](./mg-illustrated-message/doc/img/mg-illustrated-message-vertical-anatomy.png)

Component is built with :

- an illustration
- a title

Optionnally :

- one or more _details_ slot which accept HTML content (text, button...)

#### Style

- _title_ : Open Sans, 20px, Regular
- All contents are centered.

#### Spacing

![](./mg-illustrated-message/doc/img/mg-illustrated-message-vertical-spacing.png).

30px between the bottom of the _illustration_ and top of the _title_.

20px for the top of the _details_ zone.

15px between left/right border of the screen and the component

#### Sizing

The maximum width of the component is 475px.

The maximum height of the illustration is 335px. Illustration must keep its proportionnality.
Illustration can be displayed in "small" size so its maximum height is set to 60px.

![](./mg-illustrated-message/doc/img/mg-illustrated-message-vertical-sizing-small.png)

### Horizontal

#### Anatomy

![](./mg-illustrated-message/doc/img/mg-illustrated-message-horizontal-anatomy.png)

#### Spacing

![](./mg-illustrated-message/doc/img/mg-illustrated-message-horizontal-spacing.png)

By default the margin is set to 40px on top and bottom. It's possible to modify this props.

![](./mg-illustrated-message/doc/img/mg-illustrated-message-horizontal-spacing-2.png)

Between the image and the group title/action.

#### Alignment

![](./mg-illustrated-message/doc/img/mg-illustrated-message-horizontal-alignment.png)

The image/illustration and the group tittle/details/action are vertically centred between them in the background.

#### Responsive

When there is not enough space the component take is default appearance.

## CSS Variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- `--mg-illustrated-message-padding-vertical`: define component vertical padding, default: `4rem`

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                  | Type                         | Default      |
| ----------- | ----------- | ---------------------------- | ---------------------------- | ------------ |
| `direction` | `direction` | Define component orientation | `"horizontal" \| "vertical"` | `'vertical'` |
| `size`      | `size`      | Define illustration size     | `"regular" \| "small"`       | `'regular'`  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
