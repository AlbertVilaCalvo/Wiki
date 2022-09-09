---
title: Docusaurus
---

## Doc front matter fields

https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter

## Link to another doc

```md
[ESLint](javascript/eslint.md#setup)
[ESLint](/javascript/eslint.md#setup)
[ESLint](/javascript/eslint#setup)
```

All options produce the same link.

Important: when using the first option you need to add `.md`, otherwise you get `/dev/javascript/eslint#setup` instead of `/javascript/eslint#setup`.

## Sidebar

https://docusaurus.io/docs/sidebar

https://docusaurus.io/docs/sidebar/items

```js
const sidebars = {
  http: [
    'http/http',
    'http/https',
    'http/cors',
    'http/csp',
    // There are 2 equivalent ways to make the sidebar label different than the front matter 'title'.
    // 1) At the doc front matter set 'sidebar_label'.
    // 2) Do this:
    {
      type: 'doc',
      id: 'http/headers',
      label: 'Headers',
    },
    // We can have external links:
    {
      type: 'link',
      label: 'RFC 7231',
      href: 'https://httpwg.org/specs/rfc7231.html',
    },
  ],
}
```

### Sidebar category shorthand syntax

https://docusaurus.io/docs/sidebar/items#category-shorthand

```js
const sidebars = {
  docs: {
    Docusaurus: ['docs/doc1', 'docs/doc2', 'docs/doc3'],
    Features: ['docs/mdx'],
    'Docusaurus Tutorial': [
      'docs/create-a-page',
      'docs/create-a-document',
      'docs/markdown-features',
    ],
  },
}
```

## Debug

[http://localhost:3000/\_\_docusaurus/debug](http://localhost:3000/__docusaurus/debug)

https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-debug

## Routes

Routes panel: [http://localhost:3000/\_\_docusaurus/debug/routes](http://localhost:3000/__docusaurus/debug/routes)

https://docusaurus.io/docs/advanced/routing

## Upgrade

This is the message shown at the terminal when you do `yarn start`:

```bash
yarn run v1.22.19
$ BROWSER=none docusaurus start
   ╭───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
   │                                                                                                                       │
   │                                            Update available 2.0.1 → 2.1.0                                             │
   │                                                                                                                       │
   │                   To upgrade Docusaurus packages with the latest version, run the following command:                  │
   │     `yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest @docusaurus/module-type-aliases@latest`   │
   │                                                                                                                       │
   ╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

You can also do:

```bash
yarn upgrade --latest @docusaurus/core @docusaurus/preset-classic @docusaurus/module-type-aliases
```

Also take a look at the other packages versions:

- https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-preset-classic/package.json
- https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/package.json

## Styling

Uses Infima: https://infima.dev

https://docusaurus.io/docs/styling-layout

## MDX

A component can be registered globally so that you don't have to import it on every .mdx file. See [docs](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope) and [this tweet](https://twitter.com/docusaurus/status/1529810485280968706).

## Code blocks supported languages

https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js

https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages

## Releases

- beta 4 - [twitter](https://twitter.com/docusaurus/status/1420518567313690627)
- [beta 5](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.5) - [twitter](https://twitter.com/docusaurus/status/1430916848325910536)
  - You can now use `<head>` in .md files
- beta 6 - [twitter](https://twitter.com/docusaurus/status/1433463372666789892)
  - blog/archive route
- [beta 7](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.7) - [twitter](https://twitter.com/docusaurus/status/1449025696160956417)
- [beta 10](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.10) - [twitter](https://twitter.com/docusaurus/status/1468938703854841856)
  - Link a sidebar category to an auto-generated index page, eg https://deploy-preview-6076--docusaurus-2.netlify.app/docs/category/guides/
  - Link a sidebar category to an existing markdown document
- beta 11, 12, 13 fix issues in 10 deps and bad npm publish
  - [twitter](https://twitter.com/docusaurus/status/1469253182387798020)
  - [twitter](https://twitter.com/docusaurus/status/1469371710969462785)
- [beta 14](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.14) - [twitter](https://twitter.com/docusaurus/status/1473324727527690245)
  - Simplified footer (if you don't have many links) - https://github.com/facebook/docusaurus/issues/6101
- [beta 15](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.15) - [twitter](https://twitter.com/docusaurus/status/1486404763902222341)
  - Option to auto-collapse sidebar categories as you click
- [beta 16](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.16) - [twitter](https://twitter.com/docusaurus/status/1497227180295823366)
  - Swizzling - https://docusaurus.io/docs/swizzling
  - Breadcrumbs in docs (disabled in config.js with presets docs.breadcrumbs)
  - Add arbitrary html elements to the docs sidebar like images, separators etc.
- [beta 17](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.17) - [twitter](https://twitter.com/docusaurus/status/1499439030336950275)
- [beta 18](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.18) - [twitter](https://twitter.com/docusaurus/status/1507375535114141696)
- [beta 19](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.19) - [twitter](https://twitter.com/docusaurus/status/1521886747575074819)
  - Mark a doc or blog post as draft with `draft:true` and it won't show in production builds
  - Line numbers in code blocks [docs](https://docusaurus.io/docs/markdown-features/code-blocks#line-numbering)
  - Add a class name to a code block line with a comment [docs](https://docusaurus.io/docs/markdown-features/code-blocks#custom-magic-comments)
- [beta 20](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.20) - [twitter](https://twitter.com/docusaurus/status/1522273335400357888)
  - Small release with fixes for beta 19
- [beta 21](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.21) - [twitter](https://twitter.com/docusaurus/status/1530224861116780545)
- [beta 22](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-beta.22) - [twitter](https://twitter.com/docusaurus/status/1545438949610512384)
- [2.0.0-rc.1](https://github.com/facebook/docusaurus/releases/tag/v2.0.0-rc.1) - [twitter](https://twitter.com/docusaurus/status/1547616687117070338)
- [2.0.0](https://github.com/facebook/docusaurus/releases/tag/v2.0.0) - [Announcement](https://docusaurus.io/blog/2022/08/01/announcing-docusaurus-2.0) - [twitter](https://twitter.com/docusaurus/status/1554000364432769025) - [HN](https://news.ycombinator.com/item?id=32303052)
- [2.1.0](https://github.com/facebook/docusaurus/releases/tag/v2.1.0) - [Announcement](https://docusaurus.io/blog/2022/09/01/docusaurus-2.1) - [twitter](https://twitter.com/docusaurus/status/1565691803688370176)
  - Allows to override hardcoded `<meta>`
  - Simple use `<DocCardList/>`, which can now be used in any document. `DocCardList` "will display all the sidebar items of the parent category of the current document" [source](https://docusaurus.io/docs/sidebar/items#embedding-generated-index-in-doc-page)
