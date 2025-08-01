---
title: Astro
---

https://astro.build

Integrations directory: https://astro.build/integrations, integrations guide: https://docs.astro.build/en/guides/integrations-guide

VSCode official extension: https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode

Roadmap: https://github.com/orgs/withastro/projects/11/

Templates: https://vercel.com/templates?framework=astro

https://twitter.com/t3dotgg/status/1437195415439360003

> Rebuilt my (next.js) blog using @astrodotbuild out of curiosity...holy shit the difference in bundle size.
> Home route: 138kb → 7.6kb
> "All posts": 570kb → 100kb (85kb was images)

https://d13z.dev/blog/07-why-kleinanzeigen-picked-astro-over-nextjs - https://www.linkedin.com/posts/danilovelasquez_frontend-astro-nextjs-activity-7321106888048197633-fu0A/

Astro is an Multi-Page Application framework, not a Single-Page Application framework - [see docs](https://docs.astro.build/en/concepts/mpa-vs-spa/)

https://github.com/codiume/orbit - Collection of useful integrations & components

https://astro-tips.dev

TODO check: https://github.com/astro-community/AstroCompress

TODO mirar: https://github.com/onwidget/astrowind

TODO mirar: https://frontendmasters.com/courses/astro/

## Front matter

The front matter is optional, you don't need to add the `---` section. You can always add it later when you need it.

Everything in the component front matter never runs in the browser.

A `.astro` file's front matter is written in JavaScript. [source](https://docs.astro.build/en/tutorial/2-pages/3/)

You can use all modern JavaScript logical operators, expressions and functions in either section of your `.astro` file (front matter and HTML), but when inside the HTML template section of an Astro component, curly braces are necessary. [source](https://docs.astro.build/en/tutorial/2-pages/3/)

## `.astro` components and template syntax

https://docs.astro.build/en/core-concepts/astro-components/

The built-in component language.

An Astro component can be an entire page, a layout or a UI component.

Astro components will automatically create a new page on your site when you put the `.astro` file within `src/pages/`.

Any valid snippet of HTML is already a valid Astro component.
Any HTML file is valid Astro language. [source](https://docs.astro.build/en/tutorial/2-pages/3/)

Has CSS scoping by default, meaning that it only affects the elements in its own file. [see docs](https://docs.astro.build/en/guides/styling/#scoped-styles)

Anything in the `/public` folder will always be included on the final build and can be referenced from inside components.

Astro's templating syntax is similar to JSX syntax. If you’re ever wondering how to use your script in your HTML, then searching for how it is done in JSX is probably a good starting point! [source](https://docs.astro.build/en/tutorial/2-pages/3/). Docs: https://docs.astro.build/en/core-concepts/astro-syntax/

You can import a React, Vue, Svelte or any of the supported frameworks all in a single Astro component and it would just work! [source](https://flashblaze.xyz/posts/gatsby-to-astro#astro-has-entered-the-chat)

### Comments

- `<!-- HTML comment syntax is valid in .astro files -->`
- `{/* JS comment syntax is also valid */}`

### Client-side JavaScript

https://docs.astro.build/en/guides/client-side-scripts/

The JavaScript in a component's front matter and HTML templates is executed at build time to create static HTML for your site, and then the code is "thrown away", whereas the JavaScript in a `<script>` tag is sent to the browser and runs client-side, adding interactivity on user actions like refreshing a page or toggling an input. [source](https://docs.astro.build/en/tutorial/3-components/4/)

You can add a `<script>` at any `.astro` file:

```html
<html lang="en">
  <head></head>
  <body>
    <h1>Page title</h1>
    <script>
      document.querySelector('.hamburger')?.addEventListener('click', () => {
        document.querySelector('.nav-links')?.classList.toggle('expanded')
      })
    </script>
  </body>
</html>
```

Or even import a script file inside a `<script>` tag:

```html
<html lang="en">
  <head></head>
  <body>
    <h1>Page title</h1>
    <script>
      import '../scripts/menu.js'
    </script>
  </body>
</html>
```

### `define:vars` directive

https://docs.astro.build/en/reference/directives-reference/#definevars

<!-- prettier-ignore -->
```html
---
const textColor = 'blue'
---
<html lang="en">
  <head>
    <style define:vars="{{ textColor }}">
      .text {
        color: var(--textColor);
      }
    </style>
  </head>
  <body>
    <p class="text">Hola</p>
  </body>
</html>
```

## `.md` markdown files

The front matter uses YAML (instead of JavaScript like in `.astro` files).

A `.md` file inside the `/pages` directory will generate a page.

### Markdown layouts

https://docs.astro.build/en/core-concepts/layouts/#markdownmdx-layouts

You can add a special `layout: ../../layouts/MarkdownPostLayout.astro` property to the front matter of a markdown file. Then you can access the markdown file front matter properties in the `MarkdownPostLayout.astro` layout file with `const { frontmatter } = Astro.props` - [see docs](https://docs.astro.build/en/guides/markdown-content/#frontmatter-layout).

## Content Collections

Type-safety for Markdown and MDX content.

https://docs.astro.build/en/guides/content-collections

https://astro.build/blog/astro-2

https://astro.build/blog/introducing-content-collections

The Astro Content Layer - https://astro.build/blog/future-of-astro-content-layer

Sample code that uses content collections is available at https://astro.new/latest, for example:

- Blog: https://astro.new/blog
- Portfolio: https://astro.new/portfolio
- [Migration of the blog](https://docs.astro.build/en/guides/content-collections/#migrating-from-file-based-routing) of the [tutorial](https://docs.astro.build/en/tutorial/0-introduction/): https://github.com/withastro/blog-tutorial-demo/tree/content-collections

Use [`astro sync`](https://docs.astro.build/en/reference/cli-reference/#astro-sync) to manually update the `.astro` directory. Note that `astro dev` and `astro build` update it automatically.

```ts title="content/config.ts"
export const collections = {
  //  collectionName: collection
  newsletter: newsletterCollection,
}
```

The `render` function gives you 3 things: `const { Content, remarkPluginFrontmatter, headings } = await post.render()`

### Content Layer

Stable in Astro 5.0.

Migration guide: https://docs.astro.build/en/guides/upgrade-to/v5/#legacy-v20-content-collections-api (follow the "Step-by-step instructions to update a collection")

> Use a CMS, have some sections of your site powered by a REST API, or use optimized images coming from an asset management system like Cloudinary.

https://astro.build/blog/content-layer-deep-dive/

> Data is only updated when the site is built, so it won’t serve every use case. This means that collections are perfect when your data changes relatively infrequently, such as a blog. If you’re writing a blog that’s hosted in a CMS, you can trigger a build with a webhook whenever you publish a new post.

https://astro.build/blog/astro-5/#content-layer

https://astro.build/blog/astro-5-beta/#stable-content-layer

Loaders:

- Notion, Stripe, Feed (RSS), Airtable and Strapi - https://astro.build/blog/community-loaders/
- Cloudinary - https://astro.cloudinary.dev/ - https://astro.build/blog/cloudinary-loader
- Storyblock - https://astro.build/blog/storyblok-loader/
- Hygraph - https://astro.build/blog/hygraph-loader/

## Routes

https://docs.astro.build/en/core-concepts/routing/

`pages/tags.astro` and `pages/tags/index.astro` both generate the route `/tags`, see https://docs.astro.build/en/core-concepts/routing/#static-routes

### Dynamic page routes with `[xyz].astro` and `getStaticPaths`

https://docs.astro.build/en/core-concepts/routing/#dynamic-routes

https://docs.astro.build/en/reference/api-reference/#getstaticpaths

If a page uses dynamic params in the filename, the component will need to export a `getStaticPaths` function.

https://docs.astro.build/en/tutorial/5-astro-api/2/

`getStaticPaths` **returns an array of page routes**, and all of the pages at those routes will use the same HTML template defined in the `[xyz].astro` file.

`getStaticPaths` should always return a list of objects containing `params` (the name of a page route generated dynamically) and optionally any `props` (data that you want to pass to those pages).

- If you need information to construct the page routes, write it inside `getStaticPaths`, eg with `Astro.glob()`.
- To receive information in the HTML template of a page route, write it outside `getStaticPaths`, eg with `Astro.params` and `Astro.props`.

## CLI

Reference: https://docs.astro.build/en/reference/cli-reference

### Create a project

```shell
npm create astro@latest
```

[Create a project using a starter template or GitHub repository](https://docs.astro.build/en/install/auto/#starter-templates):

```shell
# https://github.com/withastro/astro/tree/main/examples
npm create astro@latest -- --template <example-name>
# Eg to use the 'Empty' run:
npm create astro@latest -- --template minimal

# https://github.com/search?o=desc&q=astro+starter&s=stars&type=Repositories
npm create astro@latest -- --template <github-username>/<github-repo>
npm create astro@latest -- --template <github-username>/<github-repo>#<branch>
```

### Upgrade Astro

https://docs.astro.build/en/upgrade-astro

Recommended (upgrades integrations and `@astrojs/check` too):

```shell
npx @astrojs/upgrade@latest && \
npm i -D -E prettier@latest prettier-plugin-astro@latest typescript@latest
```

Manual:

```shell
npm i -E astro@latest && \
npm i -D -E prettier@latest prettier-plugin-astro@latest @astrojs/check@latest typescript@latest
```

Add an [integration](https://astro.build/integrations) (eg [Preact](https://docs.astro.build/en/guides/integrations-guide/preact/)): `npx astro add preact`. See the [Integrations guide](https://docs.astro.build/en/guides/integrations-guide/).

## Prettier

Setup for Prettier 3: https://github.com/withastro/prettier-plugin-astro/issues/360#issuecomment-1646585591

https://docs.astro.build/en/editor-setup/#prettier

Prettier plugin: https://github.com/withastro/prettier-plugin-astro

> Adds support for formatting `.astro` files outside of the editor (e.g. CLI) or inside editors that don’t support our editor tooling. If you’re using the [Astro VS Code Extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) or the Astro language server within another editor, code formatting with Prettier is included. [source](https://docs.astro.build/en/editor-setup/#prettier)

https://astro-tips.dev/tips/prettier/

Setup:

```shell
npm i -D -E prettier prettier-plugin-astro
```

As explained in https://github.com/withastro/prettier-plugin-astro/#using-in-vs-code, to use the plugin on VSCode you need to install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and then add `"prettier.documentSelectors": ["**/*.astro"]` to `settings.json`.

On WebStorm, on Preferences → Languages & Frameworks → JavaScript → Prettier include 'astro' and 'mjs' too, eg: `{**/*,*}.{js,ts,jsx,tsx,mjs,vue,astro,css,json,md,yml,yaml}`.

Get VSCode, eslint & prettier working with Astro - https://patheticgeek.dev/blog/astro-prettier-eslint-vscode

## TypeScript support

Guide: https://docs.astro.build/en/guides/typescript/

From https://github.com/withastro/astro/tree/main/packages/astro/tsconfigs

> TypeScript is configured using `tsconfig.json`. Even if you don’t write TypeScript code, this file is important so that tools like Astro and VS Code know how to understand your project.

> If you do intend to write TypeScript code, using Astro’s [`strict`](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strict.json) or [`strictest`](https://github.com/withastro/astro/blob/main/packages/astro/tsconfigs/strictest.json) config is recommended.

`stricttest.json` is the most strict config.

### Typechecking

`astro start` and `astro build` commands will transpile the code with esbuild, but will not run any type checking. To check TypeScript errors add a script in `package.json` [source](https://docs.astro.build/en/guides/typescript/#type-checking):

`"check": "astro check && tsc --noEmit"`

## Templates, starters and example repos

Official example projects: https://astro.new. Each of these templates is meant to show a common pattern or use case.

Official examples: https://github.com/withastro/astro/tree/main/examples. Use `npm create astro@latest -- --template <example-name>` to create a new project using the example.

Themes: https://astro.build/themes

Starter templates on GitHub: https://github.com/search?o=desc&q=astro+starter&s=stars&type=Repositories

You can create a new project based on a GitHub repository’s main branch with `npm create astro@latest -- --template <github-username>/<github-repo>` ([see docs](https://docs.astro.build/en/install/auto/#starter-templates)).

- https://github.com/Charca/astro-blog-template - https://astro-blog-template.netlify.app
- https://github.com/midudev/miduconf-website
- https://github.com/stackblitz/ilovecodeflow.com
- https://github.com/joshfinnie/joshfinnie.com - https://www.joshfinnie.com/blog/my-switch-from-gatsby-to-astro - Also see https://rodneylab.com/getting-started-astro where there are some tips at the end (how to import node packages and absolute imports or aliases)

## Releases

https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md

- 2.0 - https://astro.build/blog/astro-2
  - Content Collections: https://astro.build/blog/introducing-content-collections
  - Hybrid Rendering, that is static (SSG) and server (SSR), mixing static and dynamic content
- 2.1 - https://astro.build/blog/astro-210
  - Built-in image optimization. Also see https://astro.build/blog/images/
  - Markdoc
  - `astro check --watch`. Spawns a long-running process that listens for file changes and reruns diagnostics on changed files. Run this in parallel with your dev server with by adding a script to your package.json: `"dev": "astro check --watch & astro dev"`. It allows you to type check your Astro files alongside your dev process for instant feedback [source](https://twitter.com/matthewcp/status/1633536618341740546?t=YHLW3waGlJY2Jn9LOkeIIA).
- 2.2 - https://astro.build/blog/astro-220
- 2.4 - https://astro.build/blog/astro-240
  - `scopedStyleStrategy`. Switch on a high-specificity strategy using class-based selector to guarantee that component styles will always override global styles.
  - CSS inlining (experimental).
- 2.5 - https://astro.build/blog/astro-250
  - New data collection type (JSON and YAML instead of md) and `reference()`s (eg markdown blog posts can reference authors written in JSON).
  - HTML minification with `compressHTML: true`.
  - `Polymorphic` type for components like `<Link>` that can render as either `<a> `or `<button>` depending on the props passed to it.
- 2.6 - https://astro.build/blog/astro-260
  - Stable features: Middleware, Hybrid SSR output mode, Custom client directives
  - CSS inlining is also now stable, see https://github.com/withastro/roadmap/blob/main/proposals/0036-inline-stylesheets.md and https://docs.astro.build/en/reference/configuration-reference/#buildinlinestylesheets
  - Redirects
- 2.9 - https://astro.build/blog/astro-290
  - View transitions (experimental)
- 2.10 - https://astro.build/blog/astro-2100/
  - Persistent UI in View Transitions
- 3.0 - https://astro.build/blog/astro-3/ - https://github.com/withastro/astro/releases/tag/astro%403.0.0
  - **Upgrade guide**: https://docs.astro.build/en/guides/upgrade-to/v3/
    - Removed support for TypeScript 4
    - Removed `@astrojs/image`, replaced with `astro:assets`
    - Moved `astro check` to an external package
    - Changed default port 3000 to 4321
  - View transitions
  - Image Optimization (stable)
  - Optimized Build Output (HTML Minification, Component IDs and CSS Inlining)
- 3.2 - https://astro.build/blog/astro-320
- 3.3 - https://astro.build/blog/astro-330 - https://github.com/withastro/astro/releases/tag/astro%403.3.0
  - New `<Picture />` component
- 3.4 - https://astro.build/blog/astro-340 - https://github.com/withastro/astro/releases/tag/astro%403.4.0
  - Page partials. To be used in conjunction with a front-end library, such as htmx or Unpoly
  - Dev overlay (experimental)
- 3.5 - 2023/11 - https://astro.build/blog/astro-350 - https://github.com/withastro/astro/releases/tag/astro%403.5.0
  - i18n Routing (experimental) for multilingual apps
  - Prefetch. Important: is enabled by default when using View Transitions
  - Content Collections Build Cache (experimental), named Incremental Content Caching [in 4.0](https://astro.build/blog/astro-4/#incremental-content-caching-experimental)
- 4.0 - 2023/12 - https://astro.build/blog/astro-4 - https://github.com/withastro/astro/releases/tag/astro%404.0.0
  - **Upgrade guide**: https://docs.astro.build/en/guides/upgrade-to/v4/
  - Dev Toolbar
  - Internationalization (i18n) Routing
  - New View Transition APIs
- 4.1 - 2024/01 - https://astro.build/blog/astro-410 - https://github.com/withastro/astro/releases/tag/astro%404.1.0
- 4.2 - 2024/01 - https://astro.build/blog/astro-420 - https://github.com/withastro/astro/releases/tag/astro%404.2.0
  - First Astro release of almost all community-built features
  - Prerendering pages using the Speculation Rules API (experimental)
- 4.3 - 2024/02 - https://astro.build/blog/astro-430 - https://github.com/withastro/astro/releases/tag/astro%404.3.0
  - New `build.format` option 'preserve' to allow index files like `/about/index.html`
  - New `ComponentProps` type utility
- 4.4 - 2024/02 - https://astro.build/blog/astro-440 - https://github.com/withastro/astro/releases/tag/astro%404.4.0
  - Performance audits in the dev toolbar
  - Audit list (Dev Audit UI)
  - New `inferSize` attribute for `Image` or `Picture` components to automatically infer dimensions of remote images
- 4.5 - 2024/03 - https://astro.build/blog/astro-450 - https://github.com/withastro/astro/releases/tag/astro%404.5.0
  - Dev Audit UI
- 4.6 - 2024/04 - https://astro.build/blog/astro-460 - https://github.com/withastro/astro/releases/tag/astro%404.6.0
  - Support for CSRF protection (experimental, stabilized in 4.9) for server-side rendered pages
- 4.7 - 2024/04 - https://astro.build/blog/astro-470 - https://github.com/withastro/astro/releases/tag/astro%404.7.0
  - Update available message
  - Change allowJs to true for strictest TypeScript preset
- 4.8 - 2024/05 - https://astro.build/blog/astro-480 - https://github.com/withastro/astro/releases/tag/astro%404.8.0
  - Actions (experimental): define and call backend functions with full type-safety from your client code
- 4.9 - 2024/05 - https://astro.build/blog/astro-490 - https://github.com/withastro/astro/releases/tag/astro%404.9.0
  - Container API (experimental): render Astro components in isolation, outside of an Astro application
    - Can be used for [testing](https://docs.astro.build/en/guides/testing) components
  - React 19 support
  - Stabilizes the CSRF protection
- 4.10 - 2024/06 - https://astro.build/blog/astro-4100 - https://github.com/withastro/astro/releases/tag/astro%404.10.0
  - Environment variables handling with a new `astro:env` module (experimental)
- Future of Astro (three major features planned for Astro in 2024):
  - [Zero-JavaScript View Transitions](https://astro.build/blog/future-of-astro-zero-js-view-transitions/)
  - [The Astro Content Layer](https://astro.build/blog/future-of-astro-content-layer/) - Improvements to Content Collections
  - [Server Islands](https://astro.build/blog/future-of-astro-server-islands/)
- 4.11 - 2024/06 - https://astro.build/blog/astro-4110 - https://github.com/withastro/astro/releases/tag/astro%404.11.0
- 4.12 - 2024/07 - https://astro.build/blog/astro-4120 - https://github.com/withastro/astro/releases/tag/astro%404.12.0
  - Server Islands (experimental)
- 4.13 - 2024/08 - https://astro.build/blog/astro-4130 - https://github.com/withastro/astro/releases/tag/astro%404.13.0
- 4.14 - 2024/08 - https://astro.build/blog/astro-4140 - https://github.com/withastro/astro/releases/tag/astro%404.14.0
- 4.15 - 2024/08 - https://astro.build/blog/astro-4150 - https://github.com/withastro/astro/releases/tag/astro%404.15.0
  - Stable: [Actions](https://docs.astro.build/en/guides/actions/) (type-safe data fetching)
- 5.0 - 2024/12 - https://astro.build/blog/astro-5/ - https://github.com/withastro/astro/releases/tag/astro%405.0.0
  - **Upgrade guide**: https://docs.astro.build/en/guides/upgrade-to/v5/
  - Beta: https://astro.build/blog/astro-5-beta/
  - Content Layer stable. Instead of local markdown files, get the content from a CMS, a REST API or an asset management system like Cloudinary.
  - Server Islands stable. Best of both worlds: fast, CDN-cached static pages, with personalized and dynamic content.
  - `astro:env` module stable: a type-safe way to define and access environment variables.
  - The output modes hybrid and static options have been merged into the default static option.
  - Experimental:
    - Image cropping
    - Responsive images (automatically generate the proper `srcset` and `sizes` values)
    - SVG components
- 5.1 - 2024/12 - https://astro.build/blog/astro-510/ - https://github.com/withastro/astro/releases/tag/astro%405.1.0
  - Sessions (experimental). Stores data on the server and sends the session ID as a cookie to the client.

## Islands architecture

https://docs.astro.build/en/concepts/islands/

From https://jasonformat.com/islands-architectures:

- Rendering pages using an islands architecture results in the heavier dynamic portions of the page being initialized not just progressively, but _separately_. This means individual regions of the page become interactive without anything else on the page needing to be loaded first.
- In an "islands" model, server rendering is not a bolt-on optimization aimed at improving SEO or UX. Instead, it is a fundamental part of how pages are delivered.
- Sections of that HTML may be missing their client-side interactivity, but the document should at least contain the most essential content.
- A "buy now" button that directly relates to revenue should be easily prioritized over a site feedback survey button that relates to information gathering.
- Decompose the app into independently deliverable widgets.

### `client:` directive

https://docs.astro.build/en/reference/directives-reference/#client-directives

Controls how [UI Framework components](https://docs.astro.build/en/core-concepts/framework-components/) are hydrated on the page.

- `<ReactComponent />` → Sends HTML and CSS to the browser. Will be a static element.
- `<ReactComponent client:load />` → Sends HTML, CSS and **JavaScript** to the browser. This is an **hydrated** component. Will have interactivity.

:::warning
If we hydrate a (eg) React component with `client:` we load the whole React framework! See this article: https://spacejelly.dev/posts/how-to-use-astro-to-build-react-apps-without-javascript
:::

:::tip
You can add interactivity with `<script>` tags too - see [example](https://docs.astro.build/en/tutorial/6-islands/2/) and [docs](https://docs.astro.build/en/guides/client-side-scripts/)
:::

### `client:` directive on UI framework components vs `<script>` tags on Astro components

Both allow you to add interactive UI elements. Differences:

[`client:`](https://docs.astro.build/en/reference/directives-reference/#client-directives) directive on UI framework components:

- Is required on UI framework components to create interactive elements. (If not present they are static.)
- Allows you to reuse code in other UI frameworks.

[`<script>`](https://docs.astro.build/en/guides/client-side-scripts/) tag on Astro components:

- Allows to add interactivity without any JavaScript framework.

### Persistent islands

https://github.com/withastro/rfcs/discussions/307 - https://www.maxiferreira.com/blog/astro-turbo-persistent-islands/

### Server islands

https://docs.astro.build/en/guides/server-islands

Stable in 5.0, see https://astro.build/blog/astro-5/#server-islands

> Combine high-performance static HTML and dynamic server-generated components on the same page.

RFC - https://github.com/withastro/roadmap/pull/963a

See https://server-islands.com

From https://astro.build/blog/astro-4120:

- Instead of starting the request to the origin on the server like PPR (Partial Prerendering), Server Islands do so from the browser.
- It doesn’t depend on any server infrastructure so it will work with any host you have, from a Node.js server in a Docker container to the serverless provider of your choice.
- Server Islands are normal Astro components and can use any of the features you expect from Astro like middleware, slots, `client:` islands.

https://developers.netlify.com/guides/how-astros-server-islands-deliver-progressive-rendering-for-your-sites/

## CSS

https://docs.astro.build/en/guides/styling

### `is:inline`

https://docs.astro.build/en/reference/directives-reference/#isinline

> tells Astro to leave the `<script>` or `<style>` tag as-is in the final output HTML. The contents will not be processed, optimized, or bundled.

https://github.com/withastro/astro/issues/6388

## meta tags

- https://github.com/joshfinnie/joshfinnie.com/blob/main/src/components/BaseHead.astro
- https://github.com/withastro/astro/blob/main/examples/blog/src/components/BaseHead.astro

## Images

### Old

Images: https://docs.astro.build/en/guides/images/

https://www.npmjs.com/package/@astrojs/image

https://docs.astro.build/en/guides/integrations-guide/image/

Removed in Astro 3.

### New (assets)

RFC: https://github.com/withastro/roadmap/blob/main/proposals/0030-core-image-story.md

Assets (Experimental) - https://docs.astro.build/en/guides/assets/

Image service API: https://docs.astro.build/en/reference/image-service-reference/

- 2023-03 https://astro.build/blog/astro-210/
- 2023-06 https://astro.build/blog/images/

See version 3 upgrade guide: https://docs.astro.build/en/guides/upgrade-to/v3/#upgrade-images-to-v3

## View Transitions

https://developer.chrome.com/blog/astro-view-transitions/

https://astro.build/blog/astro-3/

https://github.com/Charca/view-transitions-live

## SSR

https://docs.astro.build/en/guides/server-side-rendering/

https://astro.build/blog/experimental-server-side-rendering/

## Netlify hosting

https://docs.astro.build/en/guides/deploy/netlify/

https://docs.netlify.com/integrations/frameworks/#astro

- Build command: `astro build`
- Publish directory: `dist`

https://docs.netlify.com/integrations/frameworks/astro/

Quickstart template:

- https://github.com/netlify-templates/astro-quickstart
- https://www.netlify.com/blog/deploy-your-astro-project-fast/

(Nice) How to integrate commonly used features within Netlify for Astro: https://github.com/netlify-templates/astro-toolbox

Blog posts: https://www.netlify.com/blog/tags/astro/

How to deploy an Astro site: https://www.netlify.com/blog/how-to-deploy-astro/

### Netlify SSR

_SSR is required only if you want to have dynamic features -like shopping cart, login/logout etc.- or build pages on demand rather than building the whole site upfront._

SSR adapter: https://docs.astro.build/en/guides/integrations-guide/netlify/

Announcement: https://www.netlify.com/blog/astro-ssr/
