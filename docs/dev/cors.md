---
title: CORS
---

# Cross-Origin Resource Sharing

Error: "No 'Access-Control-Allow-Origin' header is present on the requested resource".

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

https://fetch.spec.whatwg.org/#http-cors-protocol

https://dev.to/lydiahallie/cs-visualized-cors-5b8h

[You don't need that CORS request](https://news.ycombinator.com/item?id=29777145)


## Same-origin policy

Different origin is:
- Different domain: `a.com` and `b.com`
- Different sub-domain:` example.com` and `api.example.com`
- Different port:` example.com` and `example.com:3456`
- Different protocol/scheme: `http://example.com` and `https://example.com`

## Headers

### Access-Control-Allow-Origin response header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin

What client domains are allowed.

Checks the [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) request header and it tells the browser if the requesting origin can access a resource.

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: https://client-origin.com (only 1 domain allowed)
Access-Control-Allow-Origin: null
```

### Access-Control-Allow-Methods response header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods

Which HTTP request methods are allowed.

Response to a preflight request.

```
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Methods: *
```

### Access-Control-Allow-Headers response header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers

What HTTP request headers are allowed.

Response to a preflight request.

Important for custom headers.

[CORS-safelisted request headers](https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header)

```
Access-Control-Allow-Headers: Content-Type, X-Custom-Header
Access-Control-Allow-Headers: *
```

### Access-Control-Allow-Credentials response header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials

```
Access-Control-Allow-Credentials: true (value can only be true)
```
