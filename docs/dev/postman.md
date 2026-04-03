---
title: Postman
---

https://www.postman.com

MCP - https://github.com/postmanlabs/postman-mcp-server - https://github.com/mcp/com.postman/postman-mcp-server - https://www.postman.com/product/mcp-server/

## Environment variables

To set an environment variable after a request is done, at the Tests tab write:

```js
var jsonData = JSON.parse(responseBody)
postman.setEnvironmentVariable('auth_token', jsonData.auth_token)
```

## Tests

```js
tests['Status code is 200'] = responseCode.code === 200
tests['Body has auth_token'] = responseBody.has('auth_token')
```
