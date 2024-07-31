---
title: CORS
---

# Cross-Origin Resource Sharing

## Validate

[MDN HTTP Observatory](https://developer.mozilla.org/en-US/observatory). Limit cross-origin resource access to no more than necessary [source](https://developer.mozilla.org/en-US/blog/mdn-http-observatory-launch/#what_does_the_http_observatory_test). Note that the HTTP Observatory is for websites, not APIs [source](https://developer.mozilla.org/en-US/blog/mdn-http-observatory-launch/#can_i_scan_non-websites_such_as_api_endpoints)

## Resources

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

Glossary: https://developer.mozilla.org/en-US/docs/Glossary/CORS

https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

https://fetch.spec.whatwg.org/#http-cors-protocol

https://www.atatus.com/blog/a-complete-guide-to-cors-for-rest-apis/

https://dev.to/lydiahallie/cs-visualized-cors-5b8h

[You don't need that CORS request](https://news.ycombinator.com/item?id=29777145)

> Routing https://api.foobarbaz.app to https://foobarbaz.app/api and moving over the JavaScript clients using the api. subdomain will cut your network traffic in half.

Cache your CORS - https://news.ycombinator.com/item?id=32907234

What is the motivation behind the introduction of preflight CORS requests? - https://stackoverflow.com/questions/15381105/what-is-the-motivation-behind-the-introduction-of-preflight-cors-requests

https://enable-cors.org

Express.js app example: https://github.com/troygoode/node-cors-server

NodeJS reverse proxy which adds CORS headers to the proxied request: https://github.com/Rob--W/cors-anywhere/

## Intro

By following the Same-origin policy, by default browsers restrict one origin to access resources of another origin. CORS allows to lift this restriction.

## Same-origin policy

https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy

> a critical security mechanism that restricts how a document or script loaded by one origin can interact with a resource from another origin

Is considered same-origin if only the path differs. Different origin (ie cross-origin) is:

- Different domain: `a.com` and `b.com`
- Different subdomain: `example.com` and `api.example.com`
- Different port: `example.com` and `example.com:3456`
- Different protocol/scheme: `http://example.com` and `https://example.com`

See https://web.dev/same-site-same-origin/#origin

## Flows

See which conditions dictate if a request is simple or preflighted here:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#examples_of_access_control_scenarios
- https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html#apigateway-cors-request-types

### Simple requests

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests

1. The browser sends a request with the `Origin` header.
2. The server checks the `Origin` request header responds with either:
   - (Success) The data + the header `Access-Control-Allow-Origin: *` if requests from all domains are allowed.
   - (Success) The data + the header `Access-Control-Allow-Origin: http://www.example.com` if requests from the origin specified at the `Origin` header are allowed. The `Access-Control-Allow-Origin` value is the same than the `Origin` header of the request.
   - An error if cross-origin requests from the specified `Origin` are not allowed.

```
> Client Request >
GET /api/recipes HTTP/1.1
Origin: https://mydomain.com

< Server Response <
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://mydomain.com
```

### Preflighted requests

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests

https://stackoverflow.com/questions/15381105/what-is-the-motivation-behind-the-introduction-of-preflight-cors-requests

For any request with `Content-Type: application/json` or custom headers ([among other conditions](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#examples_of_access_control_scenarios)).

1. The browser performs an `OPTIONS` method preflight request. This request specifies which headers and HTTP method will be used in the actual request, using the headers `Access-Control-Request-Headers` and `Access-Control-Request-Method`.
2. The server responds to the `OPTIONS` request with a response that has the headers `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers`, and a status of 204 No Content.
3. If allowed, then the browser makes the actual request, otherwise the actual request fails.

If the value of `Access-Control-Allow-Origin` is a single origin (ie is not `*`), the response to both requests should also set the header `Vary: Origin` "to indicate to clients that server responses will differ based on the value of the Origin request header". [source](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-origin)

```
> Preflight Request >
OPTIONS /api/recipes HTTP/1.1
Origin: https://mydomain.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type

< Preflight Response <
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://mydomain.com
Access-Control-Allow-Methods: GET,POST,PUT,DELETE
Access-Control-Allow-Headers: Content-Type
Vary: Origin

> Actual Request >
POST /api/recipes HTTP/1.1
Origin: https://mydomain.com
Content-Type: application/json

< Actual Response <
HTTP/1.1 201 Created
Access-Control-Allow-Origin: https://mydomain.com
Vary: Origin
```

Note that there will be many more headers in addition to these.

## Headers

Request headers:

- `Origin`
- `Access-Control-Request-Method`
- `Access-Control-Request-Headers`

Response headers:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Credentials`
- `Access-Control-Expose-Headers`
- `Access-Control-Max-Age`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`

### Origin request header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin

> indicates the origin (scheme, hostname, and port) that caused the request

All CORS requests must have an Origin header. [source](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSOriginHeaderNotAdded)

```
Origin: http://localhost:3000
Origin: https://www.instagram.com
```

### Access-Control-Allow-Origin response header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin

What client domains are allowed by the server.

- `Access-Control-Allow-Origin: *` → Requests from all domains allowed. Only for public APIs that can be accessed from any site.
- `Access-Control-Allow-Origin: https://client-origin.com` → This domain is allowed. _"Only a single origin can be specified. If the server supports clients from multiple origins, it must return the origin for the specific client making the request."_ [source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin#directives)
- `Access-Control-Allow-Origin: null` → [Should not be used](https://w3c.github.io/webappsec-cors-for-developers/#avoid-returning-access-control-allow-origin-null).

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

## Errors

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors

At the browser console:

- (Chrome) Access to XMLHttpRequest at 'http://localhost:5000/api/recipes' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
- (Safari) Failed to load resource: Origin http://localhost:3000 is not allowed by Access-Control-Allow-Origin. Status code: 200. (This is for the axios request GET http://localhost:5000/api/recipes)
- (Safari) XMLHttpRequest cannot load http://localhost:5000/api/recipes due to access control checks.

## Security

https://portswigger.net/web-security/cors

https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#cross-origin-resource-sharing
