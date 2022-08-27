---
title: Curl
---

https://curl.se

https://github.com/curl/curl

https://everything.curl.dev

## Common options

Options are case-sensitive, ie `-s` is not the same as `-S`.

- Verb: `-X POST` or `--request POST`.
- Data: `-d` or `--data`.
  - Uses the `application/x-www-form-urlencoded` mime-type by default.
  - This flag implies `POST` so `-X`/`--request` is then optional.
  - Examples:
    - application/x-www-form-urlencoded: `-d 'key1=value1&key2=value2'` or `--data 'key1=value1&key2=value2'`.
    - JSON: `-d '{"key": "value"}'` or `--data '{"key": "value"}'`. Requires adding `-H "Content-Type: application/json"`.
- Header: `-H "Content-Type: application/json"` or `--header "Content-Type: application/json"`.
- Verbose: `-v`. Displays headers, status code and other info.
- Only headers: `-I` or `--head`. Fetch the response headers only.
- Silent mode: `-s` or `--silent`. Hides the body.

## Examples

`tldr curl`

`curl --help`

https://curl.se/docs/manual.html

https://curl.se/docs/httpscripting.html

https://github.com/trimstray/the-book-of-secret-knowledge#tool-curl

### POST application/x-www-form-urlencoded

```shell
curl -d 'key1=value1&key2=value2' URL
curl -d 'title=Some Title&message=The message' URL
```

### POST multipart/form-data

```shell
curl -F key1=value1 URL
curl -F key1=value1 -F upload=@localfilename URL
```

See https://stackoverflow.com/questions/19116016/what-is-the-right-way-to-post-multipart-form-data-using-curl

### POST JSON

```shell
curl -H "Content-Type: application/json" -d '{"key":"val"}' URL
```

### POST JSON, with data read from a file `data.json`

```shell
curl -H "Content-Type: application/json" -d @data.json URL
```

### PUT JSON

```shell
curl -H "Content-Type: application/json" -X PUT -d '{"key":"val"}' URL
```

### CORS OPTIONS preflight request

_You can get the command of a real request from Chrome DevTools at the Network tab by doing right-click -> Copy -> Copy as cURL_

```shell
curl http://localhost:5000/api/recipes -v -X OPTIONS -H "Origin: http://example.com" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: Content-Type"
```

See more possibilities at:

- How can you debug a CORS request with cURL?: https://stackoverflow.com/questions/12173990/how-can-you-debug-a-cors-request-with-curl
- How to Test CORS header: https://stackoverflow.com/questions/51426683/how-to-test-cors-header

## Converters

- https://curlconverter.com
- https://github.com/mholt/curl-to-go
- https://github.com/incarnate/curl-to-php
