---
title: Performance
---

https://web.dev/preload-scanner/

https://web.dev/reduce-javascript-payloads-with-code-splitting/ → Dynamic imports

https://developer.mozilla.org/en-US/docs/Web/API/Performance_API

https://web.dev/learn/performance

https://csswizardry.com/2024/08/cache-grab-how-much-are-you-leaving-on-the-table/

## `<link rel="preconnect" href="https://example.com" />`

https://web.dev/preconnect-and-dns-prefetch/

> Knowing _where_ from, but not _what_ you're fetching

https://css-tricks.com/using-relpreconnect-to-establish-network-connections-early-and-increase-performance/

https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/

## Prefetch `rel="dns-prefetch"`

The `rel="dns-prefetch"` link hint enables DNS prefetching for HTTPS documents. Allows web developers to specify domain names for important assets that should be resolved preemptively.

`<link rel="dns-prefetch" href="https://fonts.googleapis.com/" />`

https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch

https://developer.mozilla.org/en-US/docs/Glossary/Prefetch

## Memory leaks

https://github.com/nolanlawson/fuite
