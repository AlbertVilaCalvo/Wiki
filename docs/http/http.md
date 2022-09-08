---
title: HTTP
---

Port 80 (HTTPS is 443).

https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol

https://developer.mozilla.org/en-US/docs/Web/HTTP

https://github.com/for-GET/http-decision-diagram

https://httptoolkit.tech/blog/http-wtf/

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

| Status Code | Status Message        | Comments                                                  | Spec                                                         |
| :---------: | --------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
|     200     | OK                    | For GET and POST requests typically                       | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.200) |
|     201     | Created               | For POST requests typically                               | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.201) |
|     204     | No Content            | Use it if the response has no body                        | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.204) |
|     304     | Not Modified          | The client (browser) gets the resource from its own cache | [RFC 7232](https://httpwg.org/specs/rfc7232.html#status.304) |
|     400     | Bad Request           | Some parameter is missing                                 | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.400) |
|     401     | Unauthorized          | Not properly authenticated                                |                                                              |
|     403     | Forbidden             | Not authorized to access the resource                     | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.403) |
|     404     | Not Found             |                                                           | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.404) |
|     405     | Method Not Allowed    |                                                           | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.405) |
|     409     | Conflict              | Username or email already exist                           | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.409) |
|     500     | Internal Server Error |                                                           | [RFC 7231](https://httpwg.org/specs/rfc7231.html#status.500) |

Stripe common status codes: https://stripe.com/docs/api/errors

Zalando status codes: https://opensource.zalando.com/restful-api-guidelines/#http-status-codes-and-errors

### 401 Unauthorized vs 403 Forbidden

- 401 Unauthorized: the user is not logged/authenticated, that is, has no credentials or wrong credentials (eg the session expired). You may retry the request with new credentials. See https://www.rfc-editor.org/rfc/rfc7235#section-3.1
- 403 Forbidden: the user is logged/authenticated, but is not authorized to access the requested resource. See https://www.rfc-editor.org/rfc/rfc7231#section-6.5.3

https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses

## Methods

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

| Method | Request has body | Successful response has body |
| ------ | :--------------: | :--------------------------: |
| GET    |        ❌        |              ✅              |
| POST   |        ✅        |              ✅              |
| PUT    |        ✅        |             May              |
| PATCH  |        ✅        |              ✅              |
| DELETE |       May        |             May              |

Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods. Also see the table at https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

## Idempotent and Safe

https://stackoverflow.com/questions/45016234/what-is-idempotency-in-http-methods

https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Safe_methods

**Idempotent**: can be applied multiple times without changing the result beyond the initial application ([source](https://en.wikipedia.org/wiki/Idempotence)).

**Safe**: it doesn't alter the state of the server, ie performs a read-only operation.

All safe methods are also idempotent, but not all idempotent methods are safe. For example, PUT and DELETE are both idempotent but unsafe.

| Method | Description                                                                        | Idempotent                                                                            | Safe |
| ------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---- |
| GET    | Read                                                                               | Yes                                                                                   | Yes  |
| POST   | Create                                                                             | No (we create new records every time unless there's some duplicated field validation) | No   |
| PUT    | Upsert. Replace existing record entirely or create it. Requires sending all fields | Yes (we can perform it multiple times, only the first PUT will take effect)           | No   |
| PATCH  | Partially update existing record. Does not require sending all fields              | No (surprising, see why in https://stackoverflow.com/a/39338329/4034572)              | No   |
| DELETE | Delete                                                                             | Yes (we can delete the same record multiple times)                                    | No   |

## Content-Type header

The media type.

https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type

## URI

`scheme://user:password@host.com:8080/path/file?querykey=queryvalue#fragment`

The 'authority' is `user:password@host.com:8080`.

Uniform Resource Identifier (URI): Generic Syntax: https://www.ietf.org/rfc/rfc3986.txt
