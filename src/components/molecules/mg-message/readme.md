## Usage

### Types

The element can be of four different types depending on the message to be indicated:

- validation (green)
- information (blue)
- warning (orange)
- error (red)

When a trigger (button...) is set up, it can trigger the display of a message. By default, the execution of the trigger erases the previous messages in the screen of the same type.

## Specs

![](./mg-message/doc/img/mg-message-specs.png)

## CSS Variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- `--mg-message-border-radius`: Define message border radius, default: `0.3rem`

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                   | Type      | Default                  |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------ |
| `closeButton` | `close-button` | Define if message has a cross button RG 01: https://jira.mgdis.fr/browse/PDA9-140                                             | `boolean` | `false`                  |
| `delay`       | `delay`        | Add a delay to hide/close message when it passed Value is defined in seconds and must greater than 2 seconds (PDA9-314 RG-06) | `number`  | `undefined`              |
| `hide`        | `hide`         | Define if message is hidden                                                                                                   | `boolean` | `false`                  |
| `identifier`  | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created.                   | `string`  | `createID('mg-message')` |
| `variant`     | `variant`      | Message variant                                                                                                               | `string`  | `variants[0]`            |


## Events

| Event            | Description                           | Type                  |
| ---------------- | ------------------------------------- | --------------------- |
| `component-hide` | Emited event when message is hidden   | `CustomEvent<string>` |
| `component-show` | Emited event when message is diplayed | `CustomEvent<string>` |


## Dependencies

### Depends on

- [mg-card](../../atoms/mg-card)
- [mg-icon](../../atoms/mg-icon)
- [mg-button](../../atoms/mg-button)

### Graph
```mermaid
graph TD;
  mg-message --> mg-card
  mg-message --> mg-icon
  mg-message --> mg-button
  mg-button --> mg-icon
  style mg-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
