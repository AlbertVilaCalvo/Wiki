---
title: HTTP
---

Port 80 (HTTPS is 443).

https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol

https://developer.mozilla.org/en-US/docs/Web/HTTP

https://github.com/for-GET/http-decision-diagram

https://httptoolkit.tech/blog/http-wtf/

HTTP/1 to HTTP/2 to HTTP/3 - https://www.youtube.com/watch?v=a-sBfyiXysI

## Status codes

https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

https://httpstatuses.com

https://www.codetinkerer.com/2015/12/04/choosing-an-http-status-code.html

https://www.restapitutorial.com/httpstatuscodes.html

npm package: https://github.com/prettymuchbryce/http-status-codes

### Categories

- 1xx informational response – the request was received, continuing process
- 2xx successful – the request was successfully received, understood, and accepted
- 3xx redirection – further action needs to be taken in order to complete the request
- 4xx client error – the request contains bad syntax or cannot be fulfilled
- 5xx server error – the server failed to fulfil an apparently valid request

### Common codes

| Status Code | Status Message        | Comments                                                      | Spec                                                         |
| :---------: | --------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
|     200     | OK                    | For GET and POST requests typically                           | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.200) |
|     201     | Created               | For POST and PUT requests typically                           | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.201) |
|     204     | No Content            | Use it if the response has no body. For PUT, PATCH and DELETE | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.204) |
|     304     | Not Modified          | The client (browser) gets the resource from its own cache     | [RFC 7232](https://httpwg.org/specs/rfc7232.html#status.304) |
|     400     | Bad Request           | Some parameter is missing                                     | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.400) |
|     401     | Unauthorized          | Not properly authenticated                                    |                                                              |
|     403     | Forbidden             | Not authorized to access the resource                         | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.403) |
|     404     | Not Found             |                                                               | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.404) |
|     405     | Method Not Allowed    |                                                               | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.405) |
|     409     | Conflict              | Username or email already exists                              | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.409) |
|     500     | Internal Server Error |                                                               | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.500) |

Stripe common status codes: https://stripe.com/docs/api/errors

Zalando status codes: https://opensource.zalando.com/restful-api-guidelines/#http-status-codes-and-errors

### 401 Unauthorized vs 403 Forbidden

- 401 Unauthorized: the user is not logged/authenticated, that is, has no credentials or wrong credentials (eg the session expired). You may retry the request with new credentials. See https://www.rfc-editor.org/rfc/rfc7235#section-3.1
- 403 Forbidden: the user is logged/authenticated, but is not authorized to access the requested resource. See https://www.rfc-editor.org/rfc/rfc7231#section-6.5.3

https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses

## Methods

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

RFC 9110 HTTP Semantics https://www.rfc-editor.org/rfc/rfc9110.html#name-methods - (old) https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

| Method |  Request has body   | Successful response has body |
| ------ | :-----------------: | :--------------------------: |
| GET    |         ❌          |              ✅              |
| POST   |         ✅          |              ✅              |
| PUT    |         ✅          |             May              |
| PATCH  |         ✅          |              ✅              |
| DELETE | May, but is ignored |             May              |

Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods. Also see the table at https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

### Body in GET and DELETE requests should be ignored

- HTTP GET with request body - https://stackoverflow.com/questions/978061/http-get-with-request-body
- Is an entity body allowed for an HTTP DELETE request? - https://stackoverflow.com/questions/299628/is-an-entity-body-allowed-for-an-http-delete-request
- RESTful Alternatives to DELETE Request Body - https://stackoverflow.com/questions/14323716/restful-alternatives-to-delete-request-body
- Payloads of HTTP Request Methods - https://stackoverflow.com/questions/5905916/payloads-of-http-request-methods

## Idempotent and Safe

https://stackoverflow.com/questions/45016234/what-is-idempotency-in-http-methods

https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Safe_methods

**Idempotent**: can be applied multiple times without changing the result beyond the initial application ([source](https://en.wikipedia.org/wiki/Idempotence)).

**Safe**: it doesn't alter the state of the server, ie performs a read-only operation.

All safe methods are also idempotent, but not all idempotent methods are safe. For example, PUT and DELETE are both idempotent but unsafe.

Rule: **never change state with a GET**. See [GET Don't Let Users Confirm Via HTTP GET](https://www.artima.com/weblogs/viewpost.jsp?thread=152805). It can have bad consequences: https://stackoverflow.com/questions/50365264/users-browser-seems-to-trigger-requests-multiple-times-a-day

> GET, HEAD, OPTIONS and TRACE methods are defined as safe, meaning they are only intended for retrieving data. This makes them idempotent as well since multiple, identical requests will behave the same [source](https://stackoverflow.com/a/50368772/4034572)

| Method | Description                                                                        | Idempotent                                                                            | Safe |
| ------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---- |
| GET    | Read                                                                               | Yes                                                                                   | Yes  |
| POST   | Create                                                                             | No - we create new records every time unless there's some duplicated field validation | No   |
| PUT    | Upsert. Replace existing record entirely or create it. Requires sending all fields | Yes - we can perform it multiple times, only the first PUT will take effect           | No   |
| PATCH  | Partially update existing record. Does not require sending all fields              | No - surprising, see why below                                                        | No   |
| DELETE | Delete                                                                             | Yes - we can delete the same record multiple times                                    | No   |

### Why PATCH is not idempotent

See https://stackoverflow.com/a/39338329/4034572

From https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH

> A `PATCH` is not necessarily idempotent, although it can be. Contrast this with `PUT`; which is always idempotent. The word "idempotent" means that any number of repeated, identical requests will leave the resource in the same state. For example if an auto-incrementing counter field is an integral part of the resource, then a `PUT` will naturally overwrite it (since it overwrites everything), but not necessarily so for `PATCH`.

## URI

`scheme://user:password@host.com:8080/path/file?querykey=queryvalue#fragment`

The 'authority' is `user:password@host.com:8080`.

Uniform Resource Identifier (URI): Generic Syntax: https://www.ietf.org/rfc/rfc3986.txt
