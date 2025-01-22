---
title: Fonts
---

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts

Automatic font fallback based on font metrics - https://github.com/unjs/fontaine

https://blog.sentry.io/web-fonts-and-the-dreaded-cumulative-layout-shift

Modern Font Stacks - https://modernfontstacks.com

## Responsive typography

From https://github.com/netlify-templates/astro-toolbox/blob/2f41e9f4099f456bd897f88375ccaed4bb2cb371/src/components/Layout.astro#L23-L54

```css
:root {
  --font-size-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
  --font-size-lg: clamp(1.2rem, 0.7vw + 1.2rem, 1.5rem);
  --font-size-xl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
}

html {
  font-family: system-ui, sans-serif;
  font-size: var(--font-size-base);
}

:global(h1) {
  font-size: var(--font-size-xl);
}

:global(h2) {
  font-size: var(--font-size-lg);
}
```

## `size-adjust`

https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust

> Zero layout shift automatically using the CSS size-adjust property [source](https://nextjs.org/blog/next-13#nextfont)

https://web.dev/css-size-adjust
