---
title: Netlify
---

Trailing slash - https://github.com/slorber/trailing-slash-guide

Optimize Astro site deployed to Netlify - https://neciudan.dev/how-i-cut-250gb-of-bandwidth-from-my-website

## Build settings for common frameworks

https://docs.netlify.com/build/frameworks/overview

## Headers

30 days for images and video, 1 year for fonts, from https://neciudan.dev/how-i-cut-250gb-of-bandwidth-from-my-website#2-add-cache-headers

```toml title="netlify.toml"
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000, immutable"  # 30 days

[[headers]]
  for = "/video/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000, immutable"  # 30 days

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"  # 1 year
```

> The `immutable` directive is the part most people miss. Without it, even with a long `max-age`, the browser might still send a conditional request to check if the file has changed.
>
> The server responds with a 304 (“nothing changed, use what you have”), but that round trip still costs time. With `immutable`, the browser trusts the cache completely and makes zero network requests until the `max-age` expires.

> One caveat with `immutable` on images: if you update an image while keeping the same filename, browsers will serve the old version for the full 30 days. Either rename the file when you change it, or drop `immutable` and accept the occasional 304 round trip.

## Pre-rendering

https://answers.netlify.com/t/new-netlify-prerender-extension-early-access/156506

https://www.netlify.com/blog/prerendering-an-old-trick-new-again/

Check if your website needs pre-rendering: https://do-you-need-prerender.netlify.app/

It needs pre-rendering only if it creates UI elements using JavaScript client-side.

Install the extension at https://app.netlify.com/extensions/prerender. This doesn't enable the extension on any project. To do so, open a project and at the bottom of the left sidebar, click "Netlify Prerender Extension", check the checkbox "Enable prerendering" and click the Save button. Finally, you need to re-deploy the project (go to Deploys and click "Trigger deploy" → "Deploy project").

After doing this, validate that is working by changing the `user-agent` request header using Google Chrome. Open the Network tab and at "Network conditions", and at "User agent", uncheck "Use browser default" and set it to Googlebot. Refresh the page and view the Response Headers of the document. It should have the header "X-Prerendered: true" and "X-Prerendered-Timestamp: 2026-01-10T21:30:26.941Z".

Finally, revert the "User agent" to the default by setting "Use browser default".
