---
title: Images
---

https://screensiz.es

TODO download and try: https://github.com/ImageOptim/ImageOptim

See resources: https://github.com/nucliweb/image-optimization-workshop#resources

Best practices for web images: https://github.com/nucliweb/image-element

## Responsive images (`srcset` and `sizes`)

This contains many correct examples: https://ausi.github.io/respimagelint/docs.html

Bookmarklet: https://github.com/ausi/RespImageLint

https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images - See the [source code](https://github.com/mdn/learning-area/blob/main/html/multimedia-and-embedding/responsive-images/responsive.html) and [live site](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/responsive.html)

https://web.dev/serve-responsive-images/

> The following are all valid sizes: - `100px` - `33vw` - `20em` - `calc(50vw-10px)` The following is not a valid size: `25%` (percentages cannot be used with the sizes attribute)

> The resource specified by the `src` attribute should be large enough to work well on all device sizes.

https://web.dev/serve-images-with-correct-dimensions/

### Not specifying `sizes` means `sizes="100vw"`

_Responsive Images: If you’re just changing resolutions, use srcset_. Suggests not to use `sizes`, just `srcset`, but assumes that the image will be 100% width (ie `sizes="100vw"`): https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/ → If you try it out, by switching between different devices in the browser developer tools responsive mode, this is the simplest solution and the one that gives the best result, without thinking. For phones it picks the right size. And for laptops it picks the largest, even if the image is displayed with max-width, but it doesn't matter much since it's a device that probably has a good Internet connection.

```html
sizes="(min-width: 800px) 50vw, 100vw"
```

> “If the browser window is wider than 800px, this image is probably going to be displayed about half the size of that. If it’s smaller, it’ll probably be full-width.”

Also see https://ericportis.com/posts/2014/separated/

> Leaving `sizes` off entirely. Without it, the browser defaults to an implicit sizes value of 100vw, which, for important images that will probably be fairly large no matter the layout, isn’t a bad guess. Small, low-res viewports still get small images; big, hi-res viewports still get big ones. We avoid duplicating layout information and muddling our content and presentation.

### Examples

<!-- prettier-ignore -->
```html
<img src="elva-fairy-800w.jpg"
  srcset="elva-fairy-480w.jpg 480w,
          elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px,
         800px"
/>
```

[docs](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) - [source](https://github.com/mdn/learning-area/blob/main/html/multimedia-and-embedding/responsive-images/responsive.html) - [live site](https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/responsive.html)

When you resize above 520 it loads the 1600px:

```html
<img
  src="/img/cartell-garrinada-2023-800.jpg"
  srcset="
    /img/cartell-garrinada-2023-800.jpg   800w,
    /img/cartell-garrinada-2023-1600.jpg 1600w
  "
  sizes="(max-width: 520px) 50vw,
          100vw"
  alt="Cartell Garrinada 2023"
  id="img-cartell"
/>
```

<!-- prettier-ignore -->
```html
<img src="flower-large.jpg"
  srcset="flower-small.jpg 480w,
          flower-large.jpg 1080w"
  sizes="50vw"
/>
```

Density descriptors: https://web.dev/codelab-density-descriptors/

<!-- prettier-ignore -->
```html
<img src="flower.jpg"
  srcset="flower-1x.jpg 1x,
          flower-2x.jpg 2x,
          flower-3x.jpg 3x"
/>
```

Easy to understand article: https://css-tricks.com/a-guide-to-the-responsive-images-syntax-in-html

https://observablehq.com/@eeeps/w-descriptors-and-sizes-under-the-hood

Multiple slot widths: https://web.dev/codelab-specifying-multiple-slot-widths/

<!-- prettier-ignore -->
```html
<img src="flower.jpg"
  srcset="flower-small.jpg 480w,
          flower-large.jpg 800w"
  sizes="(max-width: 480px) 100vw,
         (max-width: 1024px) 50vw, 800px"
/>
```

## Multiple formats (JPEG, WEBP and AVIF)

Important: order matters. The browser will load the first one it supports.

From https://github.com/nucliweb/image-optimization-workshop/tree/image-optim-next-gen

```html
<picture>
  <source type="image/avif" srcset="images/news/news-detail-header.avif" />
  <source type="image/webp" srcset="images/news/news-detail-header.webp" />
  <source type="image/jpeg" srcset="images/news/news-detail-header.jpeg" />
  <img
    src="images/news/news-detail-header.jpg"
    class="img-fluid news-detail-image"
    alt="fine dining experience"
  />
</picture>
```

## Image Magick

https://imagemagick.org

CLI docs: https://imagemagick.org/script/command-line-processing.php

ImageMagick Examples -- Resize or Scaling (General Techniques): https://imagemagick.org/Usage/resize/

```shell
convert cartell.jpg -resize 50% cartell-garrinada-50.jpg
convert foto.jpg -resize 1080 foto-1080.jpg
convert foto.jpg -resize 1080x1920 foto-1080x1920.jpg
```

Make Instagram portrait 4:5. Eg if we have a DIN-A4 image and we want to add some black borders at the sides so that the image is not cropped at the top and bottom.

```shell
convert image.jpeg -gravity center -background black -resize 1080x1350 -extent 1080x1350 image-instagram.jpeg
```

## Avoid layout shift

Avoiding `<img>` layout shifts: aspect-ratio vs width & height attributes - https://jakearchibald.com/2022/img-aspect-ratio

If we don't know the exact aspect ratio, then use `object-fit` ([source](https://web.dev/serve-images-with-correct-dimensions/#avoid-layout-shifts-by-specifying-dimensions)):

```css
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  object-fit: cover;
}
```
