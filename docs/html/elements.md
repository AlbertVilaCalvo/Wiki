---
title: Elements
---

:::tip
Use the [W3C Markup Validation Service](https://validator.w3.org) regularly.
:::

Cool HTML elements nobody uses - https://news.ycombinator.com/item?id=33068563 - https://tapajyoti-bose.medium.com/7-cool-html-elements-nobody-uses-436598d85668

Those HTML Attributes You Never Use - https://www.smashingmagazine.com/2022/03/html-attributes-you-never-use - https://news.ycombinator.com/item?id=30887445

## Void elements don't need trailing slash (`/>`)

We can write `<meta charset="UTF-8">` instead of `<meta charset="UTF-8" />`.

https://stackoverflow.com/questions/7366344/do-we-still-need-forward-slashes-when-closing-void-elements-in-html5

Unfortunately Prettier does revert them, see https://github.com/prettier/prettier/issues/5246

The W3C Validator does not recommend trailing slash:

> Trailing slash on void elements [has no effect](https://github.com/validator/validator/wiki/Markup-%C2%BB-Void-elements#trailing-slashes-in-void-element-start-tags-do-not-mark-the-start-tags-as-self-closing) and [interacts badly with unquoted attribute values](https://github.com/validator/validator/wiki/Markup-%C2%BB-Void-elements#trailing-slashes-directly-preceded-by-unquoted-attribute-values).

## `<head>` elements

https://html.spec.whatwg.org/multipage/semantics.html#the-head-element

> The [`title`](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element) element is a required child in most situations, but when a higher-level protocol provides title information, e.g., in the subject line of an email when HTML is used as an email authoring format, the [`title`](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element) element can be omitted.

https://www.joshwcomeau.com/snippets/html/html-skeleton

HTML Head Elements Cheat Sheet: https://kapeli.com/cheat_sheets/HTML_Head_Elements.docset/Contents/Resources/Documents/index

## `<img>`

`alt` is required - see https://html.spec.whatwg.org/multipage/images.html#alt

## Page structure

https://stackoverflow.com/questions/4781077/html5-best-practices-section-header-aside-article-elements

See:

- Semantic HTML: https://web.dev/learn/html/semantic-html/
- Headings and sections: https://web.dev/learn/html/headings-and-sections/
- Semantic HTML tags: https://www.dofactory.com/html/semantics
- Document and website structure: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure
- Good document structure: https://developer.mozilla.org/en-US/curriculum/core/semantic-html/#2.2_good_document_structure

## nav

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav

http://html5doctor.com/nav-element/

https://html.spec.whatwg.org/multipage/sections.html#the-nav-element

> Not all groups of links on a page need to be in a `nav` element — the element is primarily intended for sections that consist of major navigation blocks. In particular, it is common for footers to have a short list of links to various pages of a site, such as the terms of service, the home page, and a copyright page. The `footer` element alone is sufficient for such cases; while a `nav` element can be used in such cases, it is usually unnecessary.

> A `nav` element doesn't have to contain a list, it can contain other kinds of content as well. In this navigation block, links are provided in prose

Can have an `ul` inside:

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

https://tdarb.org/blog/hamburger-menu-alternative.html

## article

https://html.spec.whatwg.org/multipage/sections.html#the-article-element

An `article` can have `header`, `nav`, `section` and `footer` ([source](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element)):

```html
<article>
  <header>
    <h1>Demos in Exampland</h1>
    <p>Written by A. N. Other.</p>
  </header>
  <nav>
    <ul>
      <li><a href="#public">Public demonstrations</a></li>
      <li><a href="#destroy">Demolitions</a></li>
      ...more...
    </ul>
  </nav>
  <div>
    <section id="public">
      <h1>Public demonstrations</h1>
      <p>...more...</p>
    </section>
    <section id="destroy">
      <h1>Demolitions</h1>
      <p>...more...</p>
    </section>
    ...more...
  </div>
  <footer>
    <p>
      <a href="?edit">Edit</a> | <a href="?delete">Delete</a> |
      <a href="?Rename">Rename</a>
    </p>
  </footer>
</article>
```

## dialog

https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

https://developer.chrome.com/blog/what-is-the-top-layer/

> `z-index` has no effect in the top layer.

If we have a `<form>` is inside a `<dialog>` we can use `method='dialog'` ([source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method)).

## Deprecated elements

https://www.w3docs.com/learn-html/deprecated-html-tags.html
