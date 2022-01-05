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

JSON POST:
```shell
curl -H "Content-Type: application/json" -d '{"key":"val"}' http://example.com
```

JSON POST, with data read from a file `data.json`:
```shell
curl -H "Content-Type: application/json" -d @data.json http://example.com
```


## Common options

- Verb: `-X POST` or `--request POST`.
- Data: `-d` or `--data`. This flag implies `POST` so `--request` is then optional.
  - JSON: `-d '{"key": "value"}'` or `--data '{"key": "value"}'`.
  - application/x-www-form-urlencoded: `-d 'key1=value1&key2=value2'` or `--data 'key1=value1&key2=value2'`.
- Header: `-H "Content-Type: application/json"` or `--header "Content-Type: application/json"`.
- Verbose: `-v`. Displays headers, status code and other info.
