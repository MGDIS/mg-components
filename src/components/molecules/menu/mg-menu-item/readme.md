## Use

Item menu is used with horizontal, vertical or mobile menus.

## Anatomy

![](./mg-menu-item/doc/img/mg-menu-item-anatomy.png) 

An item must have a label.
An icon can be added before the text.
A badge can be added after the text.
When a submenu is available, a chevron is displayed (in horizontal and vertical menus) to indicate its presence.

## Specs

Item's display depends on the size of the menu (regular, medium, large) and its mode (horizontal, vertical, mobile).

### Spacing

![](./mg-menu-item/doc/img/mg-menu-item-spacing.png) 

### Sizing

#### Horizontal menu

![](./mg-menu-item/doc/img/mg-menu-item-sizing-horizontal.png) 

Width of the item depends on its content.

![](./mg-menu-item/doc/img/mg-menu-item-sizing-maxwidth.png) 

If a max-width is set, the *label_ and the _meta* use an ellipsis to truncate the content if necessary.

#### Vertical menu

![](./mg-menu-item/doc/img/mg-menu-item-sizing-vertical.png) 

Width of the item is 100% width of the menu.

#### Mobile

![](./mg-menu-item/doc/img/mg-menu-item-sizing-mobile.png) 

Width of the item is equal to the width of the menu divided by number of items displayed.

### Alignment

#### Horizontal and vertical menus

![](./mg-menu-item/doc/img/mg-menu-item-alignment.png) 

All contents are aligned vertically.

#### Vertical menu

![](./mg-menu-item/doc/img/mg-menu-item-alignment-vertical.png) 

All items are aligned to left.
The chevron is aligned to the right of the item.

#### Mobile

![](./mg-menu-item/doc/img/mg-menu-item-alignment-mobile.png) 

Content of the item is centered

![](./mg-menu-item/doc/img/mg-menu-item-alignment-mobile-badge.png) 

Badge is positionned to 20px right and -15px up from the center of the item.

### Styling

![](./mg-menu-item/doc/img/mg-menu-item-styling.png) 

Hover item : the background is colored
Active item : the font color changes, an active bar (3px) is displayed at the bottom of the item for horizontal and mobile menus), at the left of the item for vertical menus.

#### Colors

Standard color is @color-dark.
Active color is the color of the app.
Hover color is the color of the app with an opacity set to 10%.
Disabled item's opacity is set to 30%.

#### Fonts

Family : Open Sans
Regular size : 13px
Medium/Large size : 15px
Mobile : 12px

#### Icons

Regular/Medium/Large menus : regular size
Mobile menu : large size

## Behavior

### Click

Click on an item of the menu can 
 - redirect to a url
 - display child content (see below)

If child content is available, an icon "chevron-down" is displayed at the right of the item.
When opening the child content, the chevron makes a 180° rotation.
When closing the child content, the chevron returns to position 0°.

## Child content

### Horizontal and vertical menus

Child content is displayed 
 - by clicking on the item 
 - by pressing the space or enter key

It is closed 
 - by clicking on the item 
 - by pressing the space or enter key
 - by clicking outside of the child content if the menu is horizontal

The child content can be  :
 - another horizontal or vertical menu with sub items
 - a slot for HTML content

#### In an horizontal menu

![](./mg-menu-item/doc/img/mg-menu-submenu-alignment.png) 

Child content is displayed in a floating component over the content (like a popover).
It is aligned to the left bottom of the item, excepted for the last item of the menu which is aligned to the right bottom.

If the floating component is higher than the screen size, there is no overflow, user has to scroll the page. 

![](./mg-menu-item/doc/img/mg-menu-item-child-styling.png) 

The floating component has a *@color-light_ background and a _@shadow*.

![](./mg-menu-item/doc/img/mg-menu-item-child-menu-spacing.png) 

If the floating component displays a submenu, there are top and bottom spacing of 10px.

![](./mg-menu-item/doc/img/mg-menu-item-child-slot-spacing.png) 

If the floating component displays a slot, there is no spacing.

![](./mg-menu-item/doc/img/mg-menu-submenu-slot.png) 

The minimal width of the submenu is the item's width.
Width of the submenu is determined by the width of the largest item or the content of the slot.

#### In a vertical menu

![](./mg-menu-item/doc/img/mg-menu-submenu-vertical-menu.png) 

Menu is displayed under the item, with the same width. **(i) Vertical menu is recommended if you display a submenu.**
Idem for the slot. 
There is no space to display child content.
Items below are pushed to bottom.

##### Spacing 
Sub-items add to their left spacing the spacing between left border and content of their parent's item.

### Mobile menu

Child content is displayed via an **mg-tray** component.

![](./mg-menu-item/doc/img/mg-menu-submenu-tray.png) 

## CSS Variables

### global

- `--mg-menu-item-focused-background-color-hsl`: define mg-menu-item focused background color. default: `--mg-color-app-hsl`.
- `--mg-menu-item-border-color-active-hsl`: define mg-menu-item border color. default: `--mg-color-app-hsl`.
- `--mg-menu-item-color-hsl`: define mg-menu-item font color. default: `--mg-color-dark`.
- `--mg-menu-item-color-active-hsl`: define mg-menu-item font color active. default: `--mg-color-app-hsl`.

### navigation-button

- `--mg-menu-item-navigation-button-max-width`: define mg-menu-item button max-width. Useful to apply `text-overflow: ellipsis;` on `mg-menu-item__navigation-button-text` element. default: `unset`.

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                      | Type                                                                  | Default          |
| ---------- | ---------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------- |
| `expanded` | `expanded` | Define menu-item content expanded. Default: false.                               | `boolean`                                                             | `false`          |
| `href`     | `href`     | Define menu-item href when defined menu-item contain an anchor instead of button | `string`                                                              | `undefined`      |
| `size`     | `size`     | Define menu-item size. Default: "large".                                         | `"large" \| "medium" \| "regular"`                                    | `'regular'`      |
| `status`   | `status`   | Define menu-item status. Default: "visible"                                      | `Status.ACTIVE \| Status.DISABLED \| Status.HIDDEN \| Status.VISIBLE` | `Status.VISIBLE` |


## Dependencies

### Used by

 - [mg-action-menu](../../../../behaviors/mg-action-menu)

### Depends on

- [mg-icon](../../../atoms/mg-icon)
- [mg-popover](../../mg-popover)

### Graph
```mermaid
graph TD;
  mg-menu-item --> mg-icon
  mg-menu-item --> mg-popover
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-button --> mg-icon
  mg-action-menu --> mg-menu-item
  style mg-menu-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
