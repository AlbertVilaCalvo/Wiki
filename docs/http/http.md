---
title: HTTP
---

Port 80 (HTTPS is 443).

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

| Status Code | Status Message        | Comments                              |
| ----------- | --------------------- | ------------------------------------- |
| 200         | OK                    | For GET and POST requests typically   |
| 201         | Created               | For POST requests typically           |
| 304         | Not Modified          |                                       |
| 400         | Bad Request           |                                       |
| 401         | Unauthorized          | Not properly authenticated            |
| 403         | Forbidden             | Not authorized to access the resource |
| 404         | Not Found             |                                       |
| 405         | Method Not Allowed    |                                       |
| 500         | Internal Server Error |                                       |

### 401 Unauthorized vs 403 Forbidden

- 401 Unauthorized: the user is not logged/authenticated, that is, has no credentials or wrong credentials (eg the session expired). You may retry the request with new credentials. See https://www.rfc-editor.org/rfc/rfc7235#section-3.1
- 403 Forbidden: the user is logged/authenticated, but is not authorized to access the requested resource. See https://www.rfc-editor.org/rfc/rfc7231#section-6.5.3

https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses

## Methods

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

## Content-Type header

The media type.

https://stackoverflow.com/questions/23714383/what-are-all-the-possible-values-for-http-content-type-header

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type

## URI

`scheme://user:password@host.com:8080/path/file?querykey=queryvalue#fragment`

The 'authority' is `user:password@host.com:8080`.

Uniform Resource Identifier (URI): Generic Syntax: https://www.ietf.org/rfc/rfc3986.txt
