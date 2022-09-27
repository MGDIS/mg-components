## Anatomy

![](./mg-tabs/doc/img/mg-tabs-anatomy.png)

## Specs

### Spacing

- Standard : @base = 10px
- Large : @base = 18px

![](./mg-tabs/doc/img/mg-tabs-spacing.png)

- if only text, no extra spacing,
- if no badge : no extra spacing on the right
- if only icon : no extra spacing on the right

### Sizing

![](./mg-tabs/doc/img/mg-tabs-sizing.png)

### States

![](./mg-tabs/doc/img/mg-tabs-states.png)

### Responsive

#### Line breaks (current management)

![](./mg-tabs/doc/img/mg-tabs-responsive.png)

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute    | Description                                                                                                 | Type     | Default               |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | -------- | --------------------- |
| `identifier`         | `identifier` | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string` | `createID(this.name)` |
| `label` _(required)_ | `label`      | Nav label. Include short nav description. Required for accessibility                                        | `string` | `undefined`           |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
