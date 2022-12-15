## Use

![](./mg-action-menu/doc/img/mg-action-menu-use.png)

When not all of the items can be displayed because of the width of a [**`<mg-menu> horizontal`**](./?path=/docs/beta-menus-mg-menu--mg-menu) or **`<mg-menu>  mobile`** (TODO) or a [**`<mg-tabs>`**](./?path=/docs/molecules-mg-tabs--mg-tabs), items are replaced by a single "plus" item.

## Behavior

By clicking on the "plus" item a submenu displays the hidden items.

### With an horizontal menu or tabs

![](./mg-action-menu/doc/img/mg-action-menu-behavior-menu-tabs.png)

A **`<mg-menu>  vertical`** displays items in the style of the menu.

Submenu is aligned to the right of the item according to the "submenu of the [**`<mg-menu-item>`**](./?path=/docs/beta-menus-mg-menu-item--mg-menu-item) behavior.

### With a mobile menu

![](./mg-action-menu/doc/img/mg-action-menu-behavior-mobile.png)

A **`<mg-menu> mobile`** displays, over the actual menu, items in the style of the menu.
There are as much lines of items as it is needed to display them.
The **`<mg-action-menu>`** item is replaced by a close button (flat with a cross).

### Badges

![](./mg-action-menu/doc/img/mg-action-menu-mg-menu-large.png)

![](./mg-action-menu/doc/img/mg-action-menu-behavior-badge-mobile.png)

If one or more hidden items have **`<mg-badge>`**, the **`<mg-action-menu>`** item displays a badge with "exclamation" symbol as its content.

## Specs

### Anatomy

Use "ellipsis-vertical" [**`<mg-icon>`**](./?path=/story/atoms-mg-icon--mg-icon) for **`<mg-menu>  horizontal`** or **`<mg-tab>`**.
Use "ellipsis" [**`<mg-icon>`**](./?path=/story/atoms-mg-icon--mg-icon) for **`<mg-menu>  mobile`**.

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                  | Type                                        | Default                   |
| -------------------- | --------------------- | ---------------------------------------------------------------------------- | ------------------------------------------- | ------------------------- |
| `interactiveElement` | `interactive-element` | Define interactive element ex: mg-button, mg-menu-item. default: 'mg-button' | `"button" \| "mg-button" \| "mg-menu-item"` | `interactivesElements[0]` |
| `itemSize`           | `item-size`           | Define the popover menu item size                                            | `"large" \| "medium" \| "regular"`          | `sizes[0]`                |
| `placement`          | `placement`           | Define the popover menu item size                                            | `"center" \| "left" \| "right"`             | `placements[0]`           |


## Dependencies

### Depends on

- [mg-menu-item](../../components/molecules/menu/mg-menu-item)
- [mg-popover](../../components/molecules/mg-popover)
- [mg-badge](../../components/atoms/mg-badge)
- [mg-icon](../../components/atoms/mg-icon)
- [mg-menu](../../components/molecules/menu/mg-menu)

### Graph
```mermaid
graph TD;
  mg-action-menu --> mg-menu-item
  mg-action-menu --> mg-popover
  mg-action-menu --> mg-badge
  mg-action-menu --> mg-icon
  mg-action-menu --> mg-menu
  mg-menu-item --> mg-icon
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-button --> mg-icon
  style mg-action-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
