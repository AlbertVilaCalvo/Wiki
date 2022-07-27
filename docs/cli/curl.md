---
title: Curl
---

https://curl.se

https://github.com/curl/curl

https://everything.curl.dev

Options are case sensitive, ie `-s` is not the same than `-S`.

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

## Common options

- Verb: `-X POST` or `--request POST`.
- Data: `-d` or `--data`.
  - Uses the `application/x-www-form-urlencoded` mime-type by default.
  - This flag implies `POST` so `-X`/`--request` is then optional.
  - Examples:
    - application/x-www-form-urlencoded: `-d 'key1=value1&key2=value2'` or `--data 'key1=value1&key2=value2'`.
    - JSON: `-d '{"key": "value"}'` or `--data '{"key": "value"}'`. Requires adding `-H "Content-Type: application/json"`.
- Header: `-H "Content-Type: application/json"` or `--header "Content-Type: application/json"`.
- Verbose: `-v`. Displays headers, status code and other info.

## Converters

- https://curlconverter.com
- https://github.com/mholt/curl-to-go
- https://github.com/incarnate/curl-to-php
