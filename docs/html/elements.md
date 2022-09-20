---
title: Elements
---

## `<head>` elements

https://html.spec.whatwg.org/multipage/semantics.html#the-head-element

> The [`title`](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element) element is a required child in most situations, but when a higher-level protocol provides title information, e.g., in the subject line of an email when HTML is used as an email authoring format, the [`title`](https://html.spec.whatwg.org/multipage/semantics.html#the-title-element) element can be omitted.

https://www.joshwcomeau.com/snippets/html/html-skeleton

HTML Head Elements Cheat Sheet: https://kapeli.com/cheat_sheets/HTML_Head_Elements.docset/Contents/Resources/Documents/index

## Page structure

https://stackoverflow.com/questions/4781077/html5-best-practices-section-header-aside-article-elements

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
