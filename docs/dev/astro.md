---
title: Astro
---

https://astro.build

https://twitter.com/t3dotgg/status/1437195415439360003

> Rebuilt my (next.js) blog using @astrodotbuild out of curiosity...holy shit the difference in bundle size.
> Home route: 138kb -> 7.6kb
> "All posts": 570kb -> 100kb (85kb was images)

Persistent islands: https://github.com/withastro/rfcs/discussions/307 - https://www.maxiferreira.com/blog/astro-turbo-persistent-islands/

You can import a React, Vue, Svelte or any of the supported frameworks all in a single Astro component and it would just work! [source](https://flashblaze.xyz/posts/gatsby-to-astro#astro-has-entered-the-chat)

## Example repos

- https://github.com/Charca/astro-blog-template - https://astro-blog-template.netlify.app
- https://github.com/midudev/miduconf-website
- https://github.com/stackblitz/ilovecodeflow.com

## SSR

https://astro.build/blog/experimental-server-side-rendering/

## Netlify hosting

https://docs.netlify.com/integrations/frameworks/#astro

- Build command: `astro build`
- Publish directory: `dist`

https://docs.netlify.com/integrations/frameworks/astro/

How to integrate commonly used features within Netlify for Astro: https://github.com/netlify-templates/astro-toolbox

Template: https://github.com/netlify-templates/astro-quickstart

Blog posts: https://www.netlify.com/blog/tags/astro/

### Netlify SSR

_SSR is required only if you want to have dynamic features -like shopping cart, login/logout etc.- or build pages on demand rather than building the whole site upfront._

SSR adapter: https://docs.astro.build/en/guides/integrations-guide/netlify/

Announcement: https://www.netlify.com/blog/astro-ssr/
