# mg-item-more



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description                                         | Type                                     | Default                         |
| ----------- | --------- | --------------------------------------------------- | ---------------------------------------- | ------------------------------- |
| `icon`      | --        | Define icon Default: {icon: 'ellipsis-vertical'}    | `{ icon: string; }`                      | `{ icon: 'ellipsis-vertical' }` |
| `size`      | `size`    | Define component child menu size.                   | `"large" \| "medium" \| "regular"`       | `undefined`                     |
| `slotlabel` | --        | Define slot label element Default: {display: false} | `{ label?: string; display?: boolean; }` | `{ display: false }`            |


## Dependencies

### Used by

 - [mg-menu](../menu/mg-menu)

### Depends on

- [mg-menu-item](../menu/mg-menu-item)
- [mg-icon](../../atoms/mg-icon)
- [mg-menu](../menu/mg-menu)

### Graph
```mermaid
graph TD;
  mg-item-more --> mg-menu-item
  mg-item-more --> mg-icon
  mg-item-more --> mg-menu
  mg-menu-item --> mg-badge
  mg-menu-item --> mg-icon
  mg-menu-item --> mg-popover
  mg-popover --> mg-card
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-button --> mg-icon
  mg-menu --> mg-item-more
  style mg-item-more fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
