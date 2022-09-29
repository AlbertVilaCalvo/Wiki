---
title: Cookies
---

https://en.wikipedia.org/wiki/HTTP_cookie

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

A way to persist state.

A `key=value` pair along with a number of attributes that control when and where that cookie is used.

```
Set-Cookie: theme=dark; Max-Age=2600000; Secure
```

## `Set-Cookie` response header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-4.1

Attributes:

- Expires=Thu, 21 Oct 2021 07:28:00 GMT
- Max-Age=2592000
- Domain=mycompany.com
- Path=/docs
- Secure
- HttpOnly
- SameSite=Strict/Lax/None; Secure

## `Cookie` request header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie

## Access restriction

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies

Cookies are bad for you: Improving web application security - https://sitr.us/2011/08/26/cookies-are-bad-for-you.html

- **MITM** attacks can be effectively blocked by using HTTPS to encrypt any traffic that contains sensitive information or authentication credentials. When using HTTPS you will almost certainly want to set the **"Secure" flag** on any cookies used for authentication. That flag prevents the browser from transmitting cookies over an unencrypted connection.
- Session hijacking via **XSS** can be prevented by setting an **"HttpOnly" flag** on cookies that are used for authentication. The browser will not allow JavaScript code to read or write any cookie that is flagged with "httpOnly".

## `Secure` - Only HTTPS - Prevents MITM

Not sent on HTTP (except on localhost).

`http:` sites can't set cookies with the `Secure` attribute.

## `HttpOnly` - Only accessible to the server, not JavaScript - Prevents XSS

Protecting Your Cookies: HttpOnly - https://blog.codinghorror.com/protecting-your-cookies-httponly/

> When you tag a cookie with the HttpOnly flag, it tells the browser that this particular cookie should only be accessed by the server. Any attempt to access the cookie from client script is strictly forbidden.

## `SameSite` - Wether cookie is sent on cross-site requests - Prevents CSRF

3 possible values: Strict, Lax (default) and None.

If SameSite is not specified it behaves like SameSite=Lax.

`SameSite=None` requires also `Secure`, so we always have `SameSite=None; Secure`.

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite

https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-cookie-same-site-00

https://web.dev/samesite-cookies-explained/

> Cross-site request forgery (CSRF) attacks rely on the fact that cookies are attached to any request to a given origin, no matter who initiates the request. For example, if you visit evil.example then it can trigger requests to your-blog.example, and your browser will happily attach the associated cookies. If your blog isn't careful with how it validates those requests then evil.example could trigger actions like deleting posts or adding their own content.

> Your `promo_shown` cookie should only be sent in a first-party context, whereas a session cookie for a widget meant to be embedded on other sites is intentionally there for providing the signed-in state in a third-party context.

https://github.com/GoogleChromeLabs/samesite-examples

https://web.dev/samesite-cookie-recipes/

https://web.dev/schemeful-samesite/

> The long-term plan is to phase out support for third-party cookies entirely, replacing them with privacy preserving alternatives.

> One of the main reasons for the change to `SameSite=Lax` as the default for cookies was to protect against Cross-Site Request Forgery (CSRF). However, insecure HTTP traffic still presents an opportunity for network attackers to tamper with cookies that will then be used on the secure HTTPS version of the site. Creating this additional cross-site boundary between schemes provides further defense against these attacks.

### Cookie and request types

- **First-party cookie or same-site request**: when the site on the browser's URL bar matches the site of the request. Eg we are browsing `www.example.com` and we request from `www.example.com` or `static.example.com`.
- **Third-party cookie or cross-site request**: when the site on the browser's URL bar is different than the site of the request. Eg we are browsing `example.com` and we request from `whatever.com`. This happens with an iframe, like an embedded YouTube video.

Note that unlike CORS here subdomains and ports don't matter. See [Understanding "same-site" and "same-origin"](https://web.dev/same-site-same-origin/#site) and [Schemeful Same-Site](https://web.dev/schemeful-samesite/).

First-party or third-party is relative to the user's context; the same cookie can be either first-party or third-party depending on which site the user is on at the time. [source](https://web.dev/samesite-cookies-explained/)

Note that the [Public Suffix List](https://publicsuffix.org/) changes this behavior. See https://security.stackexchange.com/a/223477.

### Strict vs Lax vs None

**Strict**: a cookie is only sent to the site where it originated, ie first-party.

> A cookie will only be sent if the site for the cookie matches the site currently shown in the browser's URL bar.

**Lax**: similar so `Strict`, except that cookies are sent when the user _navigates_ to the cookie's origin site. Only for safe methods (eg GET or HEAD, not POST).

> When the user is on your site, then the cookie will be sent with the request as expected. However when following a link into your site, say from another site or via an email from a friend, on that initial request the cookie will not be sent. This is good when you have cookies relating to functionality that will always be behind an initial navigation, such as changing a password or making a purchase, but is too restrictive for `promo_shown`. That's where `SameSite=Lax` comes in by allowing the cookie to be sent with these top-level navigations.

> Let's revisit the cat article example from above where another site is referencing your content. They make use of your photo of the cat directly and provide a link through to your original article. When the reader is on the other person's blog the cookie will not be sent when the browser requests `amazing-cat.png`. However when the reader follows the link through to `cat.html` on your blog, that request will include the cookie. **This makes `Lax` a good choice for cookies affecting the display of the site, with `Strict` being useful for cookies related to actions your user is taking**.

**None**: cookies are sent on both originating and cross-site requests, but only in secure contexts.

[source 1](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent), [source 2](https://web.dev/samesite-cookies-explained/)

What is the difference between SameSite="Lax" and SameSite="Strict"? - https://stackoverflow.com/questions/59990864/what-is-the-difference-between-samesite-lax-and-samesite-strict

<img src="https://i.stack.imgur.com/WfQ68.jpg"/>

What is difference between SameSite=Lax and SameSite=Strict in receiving cookies? - https://stackoverflow.com/questions/61776033/what-is-difference-between-samesite-lax-and-samesite-strict-in-receiving-cookies

User session won't work when navigating to a site if cookie is `Strict`:

- https://security.stackexchange.com/questions/220292/preventing-csrf-with-samesite-strict-without-degrading-user-experience
  - This means that if I own foo.com, any logged-in users who are directed to foo.com from off-site will consume the content as if they are not logged in
  - No, there's no way to have the benefit of Strict SameSite without the drawbacks of Strict SameSite. However, you can get most of the benefits (and fewer drawbacks) by using Lax SameSite.
- https://www.springcloud.io/post/2022-04/spring-samesite/#21-strict
  - This rule is too strict and can cause a very bad user experience. For example, if there is a GitHub link on the current page, the user will not submit a GitHub cookie when they click on the link to enter the Github site, resulting in a non-logged-in state when entering Github from the current page.

https://www.chromium.org/updates/same-site/

SameSite default behavior change to Lax by Chrome in 2020:

- https://www.youtube.com/watch?v=GPz7onXjP_4
- https://blog.chromium.org/2019/10/developers-get-ready-for-new.html
- https://blog.chromium.org/2020/02/samesite-cookie-changes-in-february.html

## `Sec-Fetch-Site` request header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Site

Values are: `cross-site`, `same-origin`, `same-site` and `none`.

The server can decide whether to allow or reject a request based on this header.

See [Understanding "same-site" and "same-origin"](https://web.dev/same-site-same-origin/).

## JavaScript

Set:

```js
document.cookie = 'banner_closed=1; Max-Age=2600000; Secure'
```

Get:

```js
document.cookie
// If has cookies returns (eg) "consent=1; session_id=k0MDQxMzxODkgxwzMTIwOT; beenHere=1"
// If no cookies returns ""
```
