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

| Property             | Attribute     | Description                                                                                                 | Type                    | Default               |
| -------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------- |
| `activeItem`         | `active-item` | Active tab number default: first is 1                                                                       | `number`                | `1`                   |
| `identifier`         | `identifier`  | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`                | `createID('mg-menu')` |
| `items` _(required)_ | --            | Nav items Required                                                                                          | `NavItem[] \| string[]` | `undefined`           |
| `label` _(required)_ | `label`       | Nav label. Include short nav description. Required for accessibility                                        | `string`                | `undefined`           |


## Events

| Event                | Description                              | Type                  |
| -------------------- | ---------------------------------------- | --------------------- |
| `active-item-change` | Emited event when active nav item change | `CustomEvent<number>` |


## Dependencies

### Depends on

- [mg-icon](../../atoms/mg-icon)
- [mg-badge](../../atoms/mg-badge)

### Graph
```mermaid
graph TD;
  mg-menu --> mg-icon
  mg-menu --> mg-badge
  style mg-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
