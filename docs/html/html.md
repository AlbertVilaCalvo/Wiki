---
title: HTML
---

https://htmlreference.io

## Spec

One-page https://html.spec.whatwg.org

Multipage https://html.spec.whatwg.org/multipage

HTML 5.2 (2017) https://www.w3.org/TR/html52

HTML 5.3 (2021) https://www.w3.org/TR/html53

## Learn

https://web.dev/learn/html/

## `<script>` element

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script

:::warning
The browser blocks parsing and rendering of the page when it encounters `<script>` elements without a `defer` or `async` attribute - [source](https://web.dev/preload-scanner)
:::

### `async` and `defer`

Scripts loaded from `<script>` elements with a `type=module` attribute are deferred by default - [source](https://web.dev/preload-scanner)

Difference: https://stackoverflow.com/questions/10808109/script-tag-async-defer

### Omit type='text/javascript' in `<script>` tags

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-type

This is not recommended: `<script type='text/javascript'>/* JS code */</script>`

> HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type.
