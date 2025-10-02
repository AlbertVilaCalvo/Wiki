---
title: SVG
---

https://developer.mozilla.org/en-US/docs/Web/SVG

SVGViewer - https://www.svgviewer.dev

SVG Path Editor - https://yqnn.github.io/svg-path-editor/

Remove blank space from around any SVG instantly - https://svgcrop.com

SVG Repo - 500.000+ Open-licensed SVG Vector and Icons - https://www.svgrepo.com

https://svggobbler.com - Browser extension for finding, editing, exporting, optimizing, and managing SVG content - https://news.ycombinator.com/item?id=40520277

Textures.js is a JavaScript library for creating SVG patterns - https://github.com/riccardoscalco/textures - https://news.ycombinator.com/item?id=23673534

https://www.softr.io/tools/svg-shape-generator

https://www.joshwcomeau.com/svg/friendly-introduction-to-svg

SVG Editor - https://boxy-svg.com

## Optimize

SVGOMG - https://jakearchibald.github.io/svgomg

https://svgo.dev - https://github.com/svg/svgo

## Display SVG in HTML

SVG triangle of compromise - https://me.micahrl.com/blog/svg-triangle-of-compromise - https://news.ycombinator.com/item?id=41070709

SVG Style Inheritance and the ‘Flash Of Unstyled SVG’ - https://www.sarasoueidan.com/blog/svg-style-inheritance-and-fousvg/ - Provide Style Fallback when CSS fails to load

### External `.svg` file with a `<use>` tag

Have It All: External, Styleable, & Scalable SVG - https://scottjehl.com/posts/svgtopia/

> doesn't work for SVG files that are on an external domain. So you'll need to self-host the SVG file for it to work.

- ✅ stylable
- ✅ cacheable
- ✅ dimensional

### External `.svg` file with a `<img>` tag

- ❌ stylable
- ✅ cacheable
- ✅ dimensional

```html
<img src="/img/logo.svg" style="width: 200px; margin-top: 100px" alt="Logo" />
```

### Inline SVG with the `<svg>` tag

- ✅ stylable
- ❌ cacheable
- ✅ dimensional

We can add `width` and/or `height` attributes:

```xml
<svg
  width="150px"
  id="my-logo"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 37"
>
  <path
    d="m2.137 29.999 15.317-27.53L32.312 32.9l20.08-28.648L69.193 34.53l17.83-31.475L97.863 29.09"
    style="fill:none;stroke:#e80008;stroke-width:4.27404;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1"
  ></path>
</svg>
```

Or we can style it using CSS:

```css
#my-logo {
  width: 200px;
  margin-top: 300px;
}
```

### `<iframe>` with an `<svg>` inside

- ✅ stylable
- ✅ cacheable
- ❌ dimensional

## Attributes

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg#attributes

### The `version` attribute is deprecated in web browsers

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/version

https://stackoverflow.com/questions/18467982/are-svg-parameters-such-as-xmlns-and-version-needed/18468348

## Accessibility

Accessible SVGs - https://css-tricks.com/accessible-svgs

Should add the `role="img"` and `aria-label="Description of your SVG image"` according to https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role#svg_and_roleimg

> If you are using embedded SVG images in your page, it is a good idea to set `role="img"` on the outer `<svg>` element and give it a label. This will cause screen readers to just consider it as a single entity and describe it using the label, rather than trying to read out all the child nodes

Regarding the `<title>`, see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title:

- There can be multiple `<title>`s and they can appear in [container element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element#container_elements) or [graphics element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element#graphics_elements), not just at the root.
- Browsers usually display it as a tooltip
- If an element can be described by visible text, it is recommended to reference that text with an `aria-labelledby` attribute rather than using the `<title>` element.
- For backward compatibility with SVG 1.1, `<title>` elements should be the first child element of their parent.
