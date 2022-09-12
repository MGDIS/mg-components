## Specs

### Anatomy

![](./mg-illustrated-message/doc/img/mg-illustrated-message-anatomy.png) 

Component is built with : 
- an illustration
- a title

Optionnally : 
- one or more _details_ slot wich accept HTML content (text, button...)

### Style

- _title_ : Open Sans, 20px, Regular
- All contents are centered.

### Spacing

![](./mg-illustrated-message/doc/img/mg-illustrated-message-spacing.png) 

30px between the bottom of the _illustration_ and top of the _title_.
20px for the top of the _details_ zone.

15px between left/right border of the screen and the component

### Sizing

The maximum width of the component is 475px.

The maximum height of the illustration is 335px. Illustration must keep its proportionnality.
Illustration can be displayed in "small" size so its maximum height is set to 60px.

![](./mg-illustrated-message/doc/img/mg-illustrated-message-sizing-small.png) 

## Behavior

The slotted elements (illustration, title and details) are centered horizontally in the page.




<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description              | Type                   | Default     |
| -------- | --------- | ------------------------ | ---------------------- | ----------- |
| `size`   | `size`    | Define illustration size | `"regular" \| "small"` | `'regular'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
