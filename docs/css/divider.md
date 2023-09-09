---
title: Divider
---

https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path

clip-path maker: https://bennettfeely.com/clippy/

https://css-generators.com/section-divider/

Inclined:

```css
/* Inclination changes with the screen width. From https://about.codecov.io */
clip-path: polygon(0 0, 100% 20%, 100% 100%, 0% 100%);
background-color: #0f1b29;

/* Always same inclination :) */
clip-path: polygon(0 0, 100% calc(20px + 100vw * 0.02), 100% 100%, 0 100%);
background: linear-gradient(225deg, var(--pink) 10%, var(--yellow-orange) 90%);

/* Inclination changes with the screen width. From https://sentry.io/welcome/ */
clip-path: polygon(0% 0%, 100% 3rem, 100% calc(100% - 3rem), 0% 100%);
```

Interesting, this uses `transform: skewY(14deg);`: https://wweb.dev/resources/css-separator-generator
