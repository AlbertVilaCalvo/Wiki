---
title: Text
---

https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text

https://zellwk.com/blog/rem-vs-em/

https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow

## Break word if it doesn't fit in the container

```css
overflow-wrap: anywhere; /* word-wrap is an alias */
word-break: break-word;
```

Either can work, see https://stackoverflow.com/a/19344395/4034572:

https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap

https://developer.mozilla.org/en-US/docs/Web/CSS/word-break

https://stackoverflow.com/questions/13790170/p-when-text-exceeds-width-continue-in-new-line

https://www.w3.org/TR/css-text-3/#propdef-word-wrap

Wrapping and breaking text - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Text/Wrapping_Text

Modern Fluid Typography Using CSS Clamp - https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp

## `text-wrap: balance`

https://developer.chrome.com/blog/css-text-wrap-balance/

https://twitter.com/argyleink/status/1642907157002862592

https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#balance

:::danger
_Because counting characters and balancing them across multiple lines is computationally expensive, this value is only supported for blocks of text spanning a limited number of lines (six or less for Chromium and ten or less for Firefox)._ [source](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#balance)
:::
