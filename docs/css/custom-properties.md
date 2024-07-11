---
title: Custom Properties
---

TODO mirar: https://www.youtube.com/watch?v=ZuZizqDF4q8

https://frontendmasters.com/courses/css-variables/

https://developer.mozilla.org/en-US/docs/Web/CSS/--*

## Define custom properties

https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API

### `@property`

https://developer.mozilla.org/en-US/docs/Web/CSS/@property

### `CSS.registerProperty`

https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static

## rgb()

```css
:root {
  --accent: 124, 58, 237;
}
html {
  background-color: rgb(var(--accent));
}
```
