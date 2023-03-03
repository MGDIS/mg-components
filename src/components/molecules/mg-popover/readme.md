## Usage

A popover is more enhanced than a tooltip but less blocking than a modal.

## Behavior

The window is displayed when clicking on its trigger.

The window is displayed next to its trigger, usually below it. A triangle (in css) makes the link between the trigger and the window.

The window closes:

- when clicking on its trigger
- clicking outside the window
- when the ESC key is pressed
- when clicking on the close button at the top right corner

The size of the window is determined by the content (set a maximum size to avoid problems).

The title and the close button are optional.

## Specs

### Fonts

![](./mg-popover/doc/img/mg-popover-fonts.png)

### Spacing

![](./mg-popover/doc/img/mg-popover-spacing.png)

### Sizing

![](./mg-popover/doc/img/mg-popover-sizing.png)

### Alignments

![](./mg-popover/doc/img/mg-popover-align.png)

### Positioning

#### Item

![](./mg-popover/doc/img/mg-popover-position.png)

#### Screen

![](./mg-popover/doc/img/mg-popover-position-screen.png)

### Style

![](./mg-popover/doc/img/mg-popover-style.png)

## CSS Variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- `--mg-popover-background-color`: Define popover background color, default: `var(--color-light)`
- `--mg-popover-font-color`: Define popover font color, default: `var(--color-font-dark)`
- `--mg-popover-title-font-size`: Define popover title font size, default: `1.4rem`
- `--mg-popover-padding-vertical`: Define popover vertical padding, default: `1.5rem`
- `--mg-popover-padding-horizontal`: Define popover horizontal padding, default: `--mg-popover-padding-vertical`

Please note that the mg-popover component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-popover. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-popover to your design.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                      | Type                                                                                                                                                                                                         | Default                  |
| ------------- | -------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `arrowHide`   | `arrow-hide`   | Hide popover arrow                                                               | `boolean`                                                                                                                                                                                                    | `false`                  |
| `closeButton` | `close-button` | Define if popover has a cross button                                             | `boolean`                                                                                                                                                                                                    | `false`                  |
| `disabled`    | `disabled`     | Disable popover                                                                  | `boolean`                                                                                                                                                                                                    | `false`                  |
| `display`     | `display`      | Display popover                                                                  | `boolean`                                                                                                                                                                                                    | `false`                  |
| `identifier`  | `identifier`   | Sets an `id` attribute. Needed by the input for accessibility `aria-decribedby`. | `string`                                                                                                                                                                                                     | `createID('mg-popover')` |
| `placement`   | `placement`    | Popover placement                                                                | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`               |


## Events

| Event            | Description                            | Type                   |
| ---------------- | -------------------------------------- | ---------------------- |
| `display-change` | Emited event when display value change | `CustomEvent<boolean>` |


## Dependencies

### Used by

 - [mg-action-more](../mg-action-more)
 - [mg-menu-item](../menu/mg-menu-item)

### Depends on

- [mg-card](../../atoms/mg-card)
- [mg-button](../../atoms/mg-button)
- [mg-icon](../../atoms/mg-icon)

### Graph
```mermaid
graph TD;
  mg-popover --> mg-card
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-button --> mg-icon
  mg-action-more --> mg-popover
  mg-menu-item --> mg-popover
  style mg-popover fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
