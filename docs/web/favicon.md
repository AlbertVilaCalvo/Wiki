---
title: Favicon
---

How to favicon in 2021: six files that fit most needs - https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs → Also mentions you should not use `rel="shortcut icon"`, use `rel="icon"` instead

`rel="shortcut icon"` considered harmful - https://mathiasbynens.be/notes/rel-shortcut-icon

:::info
After deploying, cached documents or manifests may temporarily request old URLs, so consider redirects or a short compatibility period on a high-traffic site.
:::

## Checkers

Run several because they test different things.

Aquests són els realment útils:

- https://realfavicongenerator.net/favicon_checker - See https://stackoverflow.com/a/48969053/4034572 from the author of RealFaviconGenerator
- https://favicraft.com/check
- https://favicon.io/favicon-checker
- https://convertico.com/favicon-checker
- https://practicalprogrammatic.com/tools/favicon-checker

Aquests els ha afegit Codex:

- https://toolsaday.com/seo/favicon-checker
- https://faviconcheck.tamethebots.com
- https://seositecheckup.com/tools/favicon-test

## Files

Start from a square SVG with a square `viewBox` as the canonical source artwork. It should be recognizable at 16×16; simplify fine details that disappear at small sizes.

Use the square SVG as the source to provide this:

| Public path                                            | Size/content                                              | Used for                                                  |
| ------------------------------------------------------ | --------------------------------------------------------- | --------------------------------------------------------- |
| `public/favicon/favicon.svg`                           | Square, scalable SVG                                      | Modern desktop browsers                                   |
| `public/favicon.ico`                                   | Contains 16×16, 32×32, 48×48, and 256×256 embedded images | Legacy browsers, bots, and `/favicon.ico` fallback        |
| `public/favicon/favicon-16x16.png`                     | 16×16 PNG                                                 | Explicit small desktop favicon                            |
| `public/favicon/favicon-32x32.png`                     | 32×32 PNG                                                 | Explicit desktop favicon                                  |
| `public/favicon/favicon-96x96.png`                     | 96×96 PNG                                                 | High-resolution desktop favicon and checker compatibility |
| `public/apple-touch-icon.png`                          | 180×180 opaque PNG                                        | Apple Home Screen/Web Clip icon                           |
| `public/favicon/web-app-manifest-192x192.png`          | 192×192 PNG                                               | Android/Chromium and web app manifest                     |
| `public/favicon/web-app-manifest-512x512.png`          | 512×512 PNG                                               | Android/Chromium and web app manifest                     |
| `public/favicon/web-app-manifest-maskable-512x512.png` | 512×512 opaque, padded PNG                                | Android adaptive/maskable icon                            |
| `public/site.webmanifest`                              | JSON manifest                                             | Application identity and Android icon metadata            |

A separate `favicon-48x48.png` link is normally unnecessary when the ICO already contains a 48×48 frame and the page exposes a 96×96 PNG.

See [Generate assets](#generate-assets) for instructions on creating these files.

## Directory structure

Keep convention-based entry points at the public root and group explicitly linked favicon-only assets:

```text
public/
├── favicon.ico
├── apple-touch-icon.png
├── site.webmanifest
└── favicon/
    ├── favicon.svg
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── favicon-96x96.png
    ├── web-app-manifest-192x192.png
    ├── web-app-manifest-512x512.png
    └── web-app-manifest-maskable-512x512.png
```

Keep the three root files there deliberately:

- Browsers and bots may request `/favicon.ico` without reading the HTML.
- Apple can use `/apple-touch-icon.png` as a conventional fallback.
- Keeping `/site.webmanifest` at the root makes its URL, scope, and hosting MIME rule straightforward.

If the canonical SVG is also a general brand asset used elsewhere, keep that existing shared file in its natural location and point the SVG favicon declaration to it, do not duplicate it.

## HTML `<head>`

```html
<meta name="application-name" content="My site" />
<meta name="apple-mobile-web-app-title" content="My site" />
<meta name="theme-color" content="#000000" />

<link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48 256x256" />
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="/favicon/favicon-16x16.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/favicon/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="96x96"
  href="/favicon/favicon-96x96.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="192x192"
  href="/favicon/web-app-manifest-192x192.png"
/>
<link rel="icon" type="image/svg+xml" sizes="any" href="/favicon/favicon.svg" />

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

Important details:

- Use `rel="icon"`; `rel="shortcut icon"` is only a historical compatibility form and is unnecessary for new code. See [`rel="shortcut icon"` considered harmful](https://mathiasbynens.be/notes/rel-shortcut-icon).
- `sizes="any"` is truthful for a scalable SVG. Do not use it for an ICO or fixed-size PNG.
- List only the sizes actually contained in an ICO. The [HTML Standard](https://html.spec.whatwg.org/multipage/links.html#rel-icon) requires the `sizes` values to describe sizes available in the resource.
- The `type` attribute is optional and advisory. It is safe to omit it for the ICO; use `image/png` and `image/svg+xml` for those explicit formats.
- Keep `/favicon.ico` at the site root because some clients request it without reading the HTML.
- Use root-relative URLs when the assets are published at the origin root, that is, start asset URLs with `/` so they resolve from the website’s root, even on nested pages. For example, use `/favicon/favicon-32x32.png` rather than `favicon/favicon-32x32.png`: on `https://example.com/blog/article/`, the latter resolves to `https://example.com/blog/article/favicon/favicon-32x32.png`.
- Browsers select icons using format and size information. Do not assume that the first icon always wins; if candidates are equally appropriate, the HTML selection algorithm prefers the last one declared.
- `apple-mobile-web-app-title` supplies the Apple Home Screen title and addresses the missing touch web app title warning. `application-name` supplies the site's application name.
- `theme-color` should match the browser chrome/top area of the page. It can be page-specific when archived pages have different visual themes.

## Generate assets

You can start with [RealFaviconGenerator](https://realfavicongenerator.net/) and [favicon.io](https://favicon.io/) to have an idea of the required favicon sizes and formats. ImageMagick is useful for deterministic resizing and padding.

Use ImageMagick to generate the PNGs from a square source named `favicon.svg`. Put `-background none` and `-density` before the input filename. Choose a density that renders the SVG at 512×512 or larger before resizing.

```bash
mkdir -p public/favicon
cp favicon.svg public/favicon/favicon.svg

magick -background none -density 400 favicon.svg -resize 16x16 public/favicon/favicon-16x16.png
magick -background none -density 400 favicon.svg -resize 32x32 public/favicon/favicon-32x32.png
magick -background none -density 400 favicon.svg -resize 96x96 public/favicon/favicon-96x96.png
magick -background none -density 400 favicon.svg -resize 192x192 public/favicon/web-app-manifest-192x192.png
magick -background none -density 400 favicon.svg -resize 512x512 public/favicon/web-app-manifest-512x512.png

magick -background none -density 400 favicon.svg -resize 48x48 favicon-48x48.png
magick -background none -density 400 favicon.svg -resize 256x256 -depth 8 -strip favicon-256x256.png
```

The 48px and 256px PNGs are intermediate ICO inputs kept outside `public/`; they do not need separate HTML links or deployment. The 256px command adds `-depth 8 -strip` to keep that PNG small (8 bits per channel, with profiles and comments removed), because `icotool` embeds it in the ICO as is.

Create opaque, padded variants separately. Adjust the artwork sizes for the logo:

```bash
magick -background none -density 400 favicon.svg \
  -resize 150x150 \
  -gravity center -background '#ffffff' -extent 180x180 \
  -alpha remove -alpha off \
  public/apple-touch-icon.png

magick -background none -density 400 favicon.svg \
  -resize 288x288 \
  -gravity center -background '#ffffff' -extent 512x512 \
  -alpha remove -alpha off \
  public/favicon/web-app-manifest-maskable-512x512.png
```

Inspect PNG dimensions and opacity:

```bash
magick identify -format '%f %wx%h opaque=%[opaque]\n' \
  public/favicon/*.png public/apple-touch-icon.png
```

### Create ICO

The ICO should contain:

- 16×16
- 32×32
- 48×48
- 256×256, preferably stored as a PNG-compressed ICO frame

The first three sizes provide traditional Windows/browser compatibility. The 256px frame satisfies tools that warn when an ICO contains no image larger than 48×48.

Create the ICO with ImageMagick using the PNGs generated above.

```bash
magick \
  public/favicon/favicon-16x16.png \
  public/favicon/favicon-32x32.png \
  favicon-48x48.png \
  favicon-256x256.png \
  public/favicon.ico
```

Check the embedded image sizes and the total file size:

```bash
magick identify public/favicon.ico
# public/favicon.ico[0] ICO 16x16 16x16+0+0 8-bit sRGB 0.000u 0:00.001
# public/favicon.ico[1] ICO 32x32 32x32+0+0 8-bit sRGB 0.000u 0:00.002
# public/favicon.ico[2] ICO 48x48 48x48+0+0 8-bit sRGB 0.000u 0:00.002
# public/favicon.ico[3] ICO 256x256 256x256+0+0 8-bit sRGB 285478B 0.000u 0:00.002

ls -lh public/favicon.ico
# ~279K
```

In this output, `ICO` on the 256×256 line means ImageMagick stored that image as an uncompressed bitmap, which is why the file is ~279K.

Check that all four sizes are present. If a size is missing, check the corresponding input PNG and rerun the command. The ICO is usable when all four sizes are present, even if ImageMagick stores the 256×256 image as an uncompressed bitmap.

If the file is larger than you want to ship, use `icotool` from [icoutils](https://www.nongnu.org/icoutils/) (`brew install icoutils` on macOS). The `--raw` option embeds the 256×256 PNG directly. For example, this reduced Garrinada’s test ICO from about 279 KiB to 46 KiB.

```bash
icotool --create --output=public/favicon.ico \
  public/favicon/favicon-16x16.png \
  public/favicon/favicon-32x32.png \
  favicon-48x48.png \
  --raw=favicon-256x256.png
```

Rerun both checks after replacing the ICO. The 256×256 line should now say `PNG`, confirming that the ICO embeds a PNG at that size. For example, the deployed Unitat ICO:

```bash
magick identify public/favicon.ico
# public/favicon.ico[0] ICO 16x16 16x16+0+0 8-bit sRGB 0.000u 0:00.004
# public/favicon.ico[1] ICO 32x32 32x32+0+0 8-bit sRGB 0.000u 0:00.004
# public/favicon.ico[2] ICO 48x48 48x48+0+0 8-bit sRGB 0.000u 0:00.004
# public/favicon.ico[3] PNG 256x256 256x256+0+0 8-bit sRGB 22306B 0.000u 0:00.001

ls -lh public/favicon.ico
# ~22K
```

## `site.webmanifest`

Web App Manifest specification - https://www.w3.org/TR/appmanifest/

Add a web app manifest - https://web.dev/articles/add-manifest

```json title="site.webmanifest"
{
  "id": "/",
  "name": "My site full name",
  "short_name": "My site",
  "description": "My site description",
  "lang": "en",
  "dir": "ltr",
  "start_url": "/",
  "scope": "/",
  "display": "browser",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/favicon/web-app-manifest-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/favicon/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/favicon/web-app-manifest-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Manifest fields

- `id` identifies the app. If omitted, it defaults to `start_url`. Use `/` for a single app at the site root and keep the ID stable if the launch URL changes.
- `name` is the full name shown to users.
- `short_name` is the label used where space is limited.
- `description` briefly explains what the site or app does.
- `lang` identifies the language of the manifest text, such as `ca` or `en`.
- `dir` sets the direction of that text. Use `ltr` for left-to-right text or `rtl` for right-to-left text.
- `start_url` is the preferred page to open when the app launches. Use `/` for the home page. If omitted, it defaults to the URL of the page that linked to the manifest.
- `scope` defines which URLs belong to the app. Use `/` for the whole site or `/app/` for a section. If omitted or if `start_url` falls outside it, the browser uses the directory containing `start_url` as the scope.
- `display` specifies how the site prefers to open when launched from an app icon. The default, `browser`, uses the normal browser interface and suits sites that provide a manifest mainly for icons. Use `standalone` if you want an app-style window and have tested that experience.
- `background_color` is the color the browser can show while the app loads. Match the page’s initial background.
- `theme_color` is the default color for browser or app controls that support it. An in-scope page’s HTML `theme-color` can override it.
- `icons` lists images for surfaces such as the Home Screen. Use `purpose: "any"` for the regular 192×192 and 512×512 icons and `purpose: "maskable"` for the separate padded icon. Use `purpose: "any maskable"` only if the same artwork looks good as a regular icon and fits the maskable safe zone.

### Regular manifest icons

The 192×192 and 512×512 icons are normal square application icons with `purpose: "any"`.

- They may preserve transparency when that is an intentional part of the logo.
- An opaque intended background gives more predictable results across operating systems.
- Do not add the heavy safe-zone padding used by the separate maskable version unless the design needs it.

### Maskable icon

Adaptive icon support in PWAs with maskable icons - https://web.dev/articles/maskable-icon

A maskable icon lets Android and other platforms crop the image into circles, rounded squares, and device-specific shapes.

- Use a separate 512×512 PNG.
- Use an opaque background.
- Center the artwork and add padding.
- Keep every important pixel inside the safe-zone circle.
- Declare the padded icon with `purpose: "maskable"`.

The [manifest icon-mask specification](https://www.w3.org/TR/appmanifest/#icon-masks) defines the guaranteed safe zone as a centered circle with a radius equal to 40% of the icon size. Pixels outside that circle may be cropped. Test the image with [Maskable.app](https://maskable.app/) or Chrome DevTools.

On a 512×512 canvas, the safe circle has a radius of 204.8 px. Center square artwork in a 288×288 area to leave a small margin at the corners. A rounded logo can use more space if its silhouette still fits inside the circle.

### Manifest MIME type

The HTTP `Content-Type` response header determines the resource's served MIME type. The `.webmanifest` extension helps servers choose the correct header, but does not guarantee it.

The manifest specification registers `.webmanifest` and recommends:

```text
Content-Type: application/manifest+json
```

Any JSON MIME type is acceptable to the specification, but favicon checkers may specifically expect `application/manifest+json`.

#### Netlify

If Netlify serves `site.webmanifest` as `application/octet-stream`, add this to `netlify.toml`:

```toml title="netlify.toml"
# Netlify otherwise serves .webmanifest files as application/octet-stream.
[[headers]]
  for = "/site.webmanifest"

  [headers.values]
    Content-Type = "application/manifest+json"
```

Netlify supports response-header rules in `netlify.toml` (see [Custom headers](https://docs.netlify.com/manage/routing/headers/)). The rule takes effect only after deployment; a local build cannot prove the production header.

Check the deployed response:

```bash
curl -I https://example.com/site.webmanifest
```

## `apple-touch-icon.png`

- Apple: Configuring web applications - https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

Make it opaque, give it a deliberate background color, and leave enough padding that the logo is not crowded when the operating system applies its presentation. Do not reuse a transparent, tightly cropped browser favicon without visually checking the result.
