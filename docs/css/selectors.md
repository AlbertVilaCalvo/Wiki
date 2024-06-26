---
title: Selectors
---

https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors

https://blog.jim-nielsen.com/2022/previous-sibling-selector/

CSS Dinner selectors game - https://flukeout.github.io/

Summary: https://www.w3schools.com/cssref/css_selectors.php

## `@supports() selector()`

https://developer.mozilla.org/en-US/docs/Web/CSS/@supports

https://stackoverflow.com/questions/35000865/css-supports-pseudo-element

Note that we also have `CSS.supports()` for JavaScript: https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports

```js
CSS.supports('display: flex') // true
```

## Nesting

https://developer.chrome.com/docs/css-ui/css-nesting

No need for `&`: https://developer.chrome.com/blog/css-nesting-relaxed-syntax-update

## Pseudo-classes (`:checked`, `:valid`, `:hover`, `:has`, `:not`, `:first-child`, `:nth-child`...)

https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

> Pseudo-classes can be used to style an element based on its _state_.

https://web.dev/learn/css/pseudo-classes

## `:nth-child()`

https://developer.chrome.com/docs/css-ui/css-nth-child-of-s

An+B microsyntax: https://www.w3.org/TR/css-syntax-3/#anb-microsyntax

https://web.dev/learn/css/pseudo-classes#nth-child_and_nth-of-type

## `:nth-of-type()`

Select the 2nd `<p>` inside the `.section-main-info`.

```css
.section-main-info p:nth-of-type(2) {
  margin: 0;
}
```

## `:not()`

https://developer.mozilla.org/en-US/blog/css-not-pseudo-multiple-selectors/

## All but first/last with `:not`

Eg if we want to set right margin to all items of an horizontal list but the last:

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

```css
nav > ul > li:not(:last-child) {
  margin-right: 22px;
}
```

There are other ways to do this: https://stackoverflow.com/questions/5065766/css3-selector-question-for-all-but-first-select

## `:has()`

https://blog.jim-nielsen.com/2022/unlocked-possibilities-of-has-selector/

https://developer.chrome.com/blog/has-m105/

You can do `:not(:has(...))`.

https://developer.chrome.com/blog/css-wrapped-2023#has

## Pseudo-elements (`::before`, `p::first-line`)

https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements

> Pseudo-elements can be used to style a _specific_ part of an element.
