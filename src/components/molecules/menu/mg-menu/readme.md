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

The content of the element determines its width, but to handle the case where the content is too large (long label), it is possible to specify a maximum width for the element._Label_ and _Meta_ are then truncated.

#### Sub-content

![](./mg-menu/doc/img/mg-menu-horizontal-subcontent-submenu.png)

![](./mg-menu/doc/img/mg-menu-horizontal-subcontent-slot.png) 

A "submenu" or a "free content" can be set to the item.
An icon "chevron-down" at the right of the item informs the user.

##### Badge

![](./mg-menu/doc/img/mg-menu-horizontal-subcontent-badge.png) 

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./mg-menu/doc/img/mg-menu-horizontal-plus.png) 

When not all items can be displayed due to the width of the menu container, the items are grouped into a "plus item".

## Vertical

### Use

![](./mg-menu/doc/img/mg-menu-vertical-use.png) 

The horizontal menu is used with large resolutions ("desktop"), it is mainly placed in the left area of the screen.

### Anatomy

![](./mg-menu/doc/img/mg-menu-vertical-anatomy.png) 

![](./mg-menu/doc/img/mg-menu-vertical-item-anatomy.png) 

### Options

#### Icon

Icon is optional.

Use it on all levels or none of the menu items.

#### Badge

Badge is optional.

Use it when you need to notify new events in this section.

### Behavior

#### Sub content

An item can display a sub content which can be another vertical menu.
This item displays a chevron to its right.
The submenu is displayed by clicking on the item.

##### Badge

![](./mg-menu/doc/img/mg-menu-vertical-subcontent-badge.png) 

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./mg-menu/doc/img/mg-menu-vertical-scroll.png) 

When not all items can be displayed due to the height of the menu container, a scroll bar helps to see hidden items.

**🔺child mg-menu-item slots image / information**

With a mg-badge/mg-tag/mg-icon, **you must set the component using HTML attributes** instead, because the behavior uses the [cloneNode](https://developer.mozilla.org/fr/docs/Web/API/Node/cloneNode) method which breaks properties.

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
