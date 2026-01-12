---
title: Netlify
---

Trailing slash - https://github.com/slorber/trailing-slash-guide

## Build settings for common frameworks

https://docs.netlify.com/build/frameworks/overview

## Pre-rendering

https://answers.netlify.com/t/new-netlify-prerender-extension-early-access/156506

https://www.netlify.com/blog/prerendering-an-old-trick-new-again/

Check if your website needs pre-rendering: https://do-you-need-prerender.netlify.app/

It needs pre-rendering only if it creates UI elements using JavaScript client-side.

Install the extension at https://app.netlify.com/extensions/prerender. This doesn't enable the extension on any project. To do so, open a project and at the bottom of the left sidebar, click "Netlify Prerender Extension", check the checkbox "Enable prerendering" and click the Save button. Finally, you need to re-deploy the project (go to Deploys and click "Trigger deploy" → "Deploy project").

After doing this, validate that is working by changing the `user-agent` request header using Google Chrome. Open the Network tab and at "Network conditions", and at "User agent", uncheck "Use browser default" and set it to Googlebot. Refresh the page and view the Response Headers of the document. It should have the header "X-Prerendered: true" and "X-Prerendered-Timestamp: 2026-01-10T21:30:26.941Z".

Finally, revert the "User agent" to the default by setting "Use browser default".
