## Horizontal

### Use
![](./mg-menu/doc/img/mg-menu-exemple.png)
Horizontal menu is used with large ("desktop") resolutions, it is placed in the upper area of the screen.

### Anatomy
A menu is composed of mg-items.

### Behavior

#### Too large

![](./mg-menu/doc/img/mg-menu-horizontal-plus.png)

When not all of the items can be displayed because of the width of the menu's container, items are grouped in a "plus" item.

### Specs

#### Sizing

![](./mg-menu/doc/img/mg-menu-horizontal-sizing.png)

An horizontal menu can display different sizes of items (see definition of mg-item) : regular, medium, large.

### Spacing

![](./mg-menu/doc/img/mg-menu-horizontal-spacing.png)

Space between items is 0.

## Vertical

### Use

![](./mg-menu/doc/img/mg-menu-vertical-use.png)

Horizontal menu is used with large ("desktop") resolutions, it is placed in the left area of the screen.

### Anatomy

A menu is composed of mg-items.

### Behavior

#### Too high

![](./mg-menu/doc/img/mg-menu-vertical-scroll.png)

When not all of the items can be displayed because of the height of the menu's container, a scrollbar allows to see hidden items.

### Specs

#### Sizing

The width of the menu has to be specified.

### Spacing

![](./mg-menu/doc/img/mg-menu-vertical-spacing.png)

Space between items is 0.


<!-- Auto Generated Below -->


## Properties

| Property             | Attribute   | Description                                                            | Type                                         | Default                |
| -------------------- | ----------- | ---------------------------------------------------------------------- | -------------------------------------------- | ---------------------- |
| `direction`          | `direction` | Component display direction                                            | `Direction.HORIZONTAL \| Direction.VERTICAL` | `Direction.HORIZONTAL` |
| `label` _(required)_ | `label`     | Menu label. Include short menu description. Required for accessibility | `string`                                     | `undefined`            |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
