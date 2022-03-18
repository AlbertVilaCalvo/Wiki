---
title: Elements
---

## Page structure

https://stackoverflow.com/questions/4781077/html5-best-practices-section-header-aside-article-elements


## nav

https://html.spec.whatwg.org/multipage/sections.html#the-nav-element

> Not all groups of links on a page need to be in a nav element — the element is primarily intended for sections that consist of major navigation blocks. In particular, it is common for footers to have a short list of links to various pages of a site, such as the terms of service, the home page, and a copyright page. The footer element alone is sufficient for such cases; while a nav element can be used in such cases, it is usually unnecessary.


## article

article can have header, nav, section and footer ([source](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element)):

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
   <p><a href="?edit">Edit</a> | <a href="?delete">Delete</a> | <a href="?Rename">Rename</a></p>
  </footer>
</article>
```

## dialog

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
