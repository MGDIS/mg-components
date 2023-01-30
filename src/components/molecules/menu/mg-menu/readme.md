## Horizontal

### Use

![](./mg-menu/doc/img/mg-menu-exemple.png)

Horizontal menu is used with large ("desktop") resolutions, it is placed in the upper area of the screen.

### Anatomy

![](./mg-menu/doc/img/mg-menu-horizontal-anatomy.png) 

![](./mg-menu/doc/img/mg-menu-horizontal-item-anatomy.png) 

### Options

#### Meta

Meta text is optional.

#### Icon

Icon is optional.
Use it on all or none of the menu items.

#### Illustration

Illustration is optional.
An SVG can be specified instead of an icon.

#### Badge

Badge is optional.
Use it when you need to notify new events in this section.

### Behavior

#### Sizing

![](./mg-menu/doc/img/mg-menu-horizontal-sizing.png) 

A horizontal menu can display different item sizes: regular, medium, large.

![](./mg-menu/doc/img/mg-menu-horizontal-sizing-itemmaxwidth.png) 

Le contenu de l'item détermine sa largeur, mais pour gérer le cas où le contenu peut être trop grand (libellé long), il est possible de spécifier une largeur maximale à l'item.
*Libellé_ et _Meta* sont alors tronqués.

#### Sub-content

![](./mg-menu/doc/img/mg-menu-horizontal-subcontent-submenu.png)

![](./mg-menu/doc/img/mg-menu-horizontal-subcontent-slot.png) 

A "submenu" or a "free content" can be set to the item.
An icon "chevron-down" at the right of the item informs the user.

##### Badge

![](./mg-menu/doc/img/mg-menu-horizontal-subcontent-badge.png) 

If at least one sub item has got a badge, the item displays a badge with exclamation symbol.

#### Overflow

![](./mg-menu/doc/img/mg-menu-horizontal-plus.png) 

When not all of the items can be displayed because of the width of the menu's container, items are grouped in a "plus item".

## Vertical

### Use

![](./mg-menu/doc/img/mg-menu-vertical-use.png) 

Horizontal menu is used with large ("desktop") resolutions, it is mostly placed in the left area of the screen.

### Anatomy

![](./mg-menu/doc/img/mg-menu-vertical-anatomy.png) 

![](./mg-menu/doc/img/mg-menu-vertical-item-anatomy.png) 

### Options

#### Icon

Icon is optional.

Use it on all of one level or none of the items of the menu.

#### Badge

Badge is optional.

Use it when you need to notify new events in this section.

### Behavior

#### Sub content

An item can display a sub content which can be another vertical menu.
This item displays a chevron at its right.
The submenu is displayed by clicking on the item.

##### Badge

![](./mg-menu/doc/img/mg-menu-vertical-subcontent-badge.png) 

If at least one sub item has got a badge, the item displays a badge with exclamation symbol.

#### Overflow

![](./mg-menu/doc/img/mg-menu-vertical-scroll.png) 

When not all of the items can be displayed because of the height of the menu's container, a scrollbar allows to see hidden items.

## CSS Variables

### global

- `--mg-menu-background-color-hsl`: define mg-menu background color. Default: `--color-light`.

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute   | Description                                                                         | Type                                                                                                                           | Default                |
| -------------------- | ----------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `direction`          | `direction` | Component display direction. Default: "horizontal"                                  | `Direction.HORIZONTAL \| Direction.VERTICAL`                                                                                   | `Direction.HORIZONTAL` |
| `label` _(required)_ | `label`     | Menu label. Include short menu description. Required for accessibility              | `string`                                                                                                                       | `undefined`            |
| `moreitem`           | --          | Customize mg-menu "more element" Used with direction: 'vertical' to manage overflow | `{ mgIcon?: { icon: string; }; slotLabel?: { label?: string; display?: boolean; }; size?: "regular" \| "large" \| "medium"; }` | `undefined`            |
| `size`               | `size`      | Define mg-menu size Default: 'regular'                                              | `"large" \| "medium" \| "regular"`                                                                                             | `'regular'`            |


## Dependencies

### Used by

 - [mg-menu](.)

### Depends on

- [mg-menu-item](../mg-menu-item)
- [mg-icon](../../../atoms/mg-icon)
- [mg-menu](.)

### Graph
```mermaid
graph TD;
  mg-menu --> mg-menu
  mg-menu-item --> mg-badge
  mg-menu-item --> mg-icon
  mg-menu-item --> mg-popover
  mg-popover --> mg-card
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-button --> mg-icon
  style mg-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
