---
title: Astro
---

https://astro.build

Integrations: https://astro.build/integrations

VSCode official extension: https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode

Prettier plugin: https://github.com/withastro/prettier-plugin-astro. [From the docs](https://docs.astro.build/en/editor-setup/#prettier): Adds support for formatting .astro files outside of the editor (e.g. CLI) or inside editors that don’t support our editor tooling. If you’re using the Astro VS Code Extension or the Astro language server within another editor, code formatting with Prettier is included.

Roadmap: https://github.com/orgs/withastro/projects/11/

https://twitter.com/t3dotgg/status/1437195415439360003

> Rebuilt my (next.js) blog using @astrodotbuild out of curiosity...holy shit the difference in bundle size.
> Home route: 138kb -> 7.6kb
> "All posts": 570kb -> 100kb (85kb was images)

Astro is an Multi-Page Application framework, not a Single-Page Application framework - [see docs](https://docs.astro.build/en/concepts/mpa-vs-spa/)

You can import a React, Vue, Svelte or any of the supported frameworks all in a single Astro component and it would just work! [source](https://flashblaze.xyz/posts/gatsby-to-astro#astro-has-entered-the-chat)

Everything in the component front matter never runs in the browser.

Anything in the `/public` folder will always be included on the final build and can be referenced from inside components.

## Islands architecture

https://jasonformat.com/islands-architectures

- Rendering pages using an islands architecture results in the heavier dynamic portions of the page being initialized not just progressively, but _separately_. This means individual regions of the page become interactive without anything else on the page needing to be loaded first.
- In an "islands" model, server rendering is not a bolt-on optimization aimed at improving SEO or UX. Instead, it is a fundamental part of how pages are delivered.
- Sections of that HTML may be missing their client-side interactivity, but the document should at least contain the most essential content.
- A "buy now" button that directly relates to revenue should be easily prioritized over a site feedback survey button that relates to information gathering.
- Decompose the app into independently deliverable widgets.

Persistent islands: https://github.com/withastro/rfcs/discussions/307 - https://www.maxiferreira.com/blog/astro-turbo-persistent-islands/

## CLI

Reference: https://docs.astro.build/en/reference/cli-reference

Create a project: `npm create astro@latest`

[Create a project using a starter template](https://docs.astro.build/en/install/auto/#starter-templates):

```shell
# https://github.com/withastro/astro/tree/main/examples
npm create astro@latest -- --template <example-name>
```

## TypeScript support

Guide: https://docs.astro.build/en/guides/typescript/

From https://github.com/withastro/astro/tree/main/packages/astro/tsconfigs

> TypeScript is configured using `tsconfig.json`. Even if you don’t write TypeScript code, this file is important so that tools like Astro and VS Code know how to understand your project.

> If you do intend to write TypeScript code, using Astro’s [`strict`](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strict.json) or [`strictest`](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strictest.json) config is recommended.

`stricttest.json` is the most strict config.

## Templates, starters and example repos

Official example projects: https://astro.new. Each of these templates is meant to show a common pattern or use case.

Official examples: https://github.com/withastro/astro/tree/main/examples. Use `npm create astro@latest -- --template <example-name>` to create a new project using the example.

Themes: https://astro.build/themes

Starter templates on GitHub: https://github.com/search?o=desc&q=astro+starter&s=stars&type=Repositories

You can create a new project based on a GitHub repository’s main branch with `npm create astro@latest -- --template <github-username>/<github-repo>` ([see docs](https://docs.astro.build/en/install/auto/#starter-templates)).

- https://github.com/Charca/astro-blog-template - https://astro-blog-template.netlify.app
- https://github.com/midudev/miduconf-website
- https://github.com/stackblitz/ilovecodeflow.com
- https://github.com/joshfinnie/joshfinnie.com - https://www.joshfinnie.com/blog/my-switch-from-gatsby-to-astro

## Releases

- 2.0 - https://astro.build/blog/astro-2
  - Content Collections: https://astro.build/blog/introducing-content-collections
  - Hybrid Rendering, that is static (SSG) and server (SSR), mixing static and dynamic content
- 2.1 - https://astro.build/blog/astro-210
  - Built-in image optimization
  - Markdoc
  - `astro check --watch`. Spawns a long-running process that listens for file changes and reruns diagnostics on changed files. Run this in parallel with your dev server with by adding a script to your package.json: `"dev": "astro check --watch & astro dev"`

## `.astro` component syntax

The built-in component language. Any valid snippet of HTML is already a valid Astro component.

Has CSS scoping by default.

## SSR

https://astro.build/blog/experimental-server-side-rendering/

## Netlify hosting

https://docs.astro.build/en/guides/deploy/netlify/

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
