---
title: Docusaurus
---

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

To upgrade do:

```bash
yarn upgrade --latest @docusaurus/core @docusaurus/preset-classic
```

Also take a look at the other packages versions:
- https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-preset-classic/package.json
- https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/package.json

## MDX

A component can be registered globally so that you don't have to import it on every .mdx file. See [docs](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope) and [this tweet](https://twitter.com/docusaurus/status/1529810485280968706).

## Code blocks supported languages

https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js

https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages
