---
title: Express
---

https://expressjs.com/

https://github.com/expressjs/express

## Debug

https://expressjs.com/en/guide/debugging.html

To see the debug logs run:

```
DEBUG=express:* node main
```

## Configuration

```ts
import path from 'path'

const app = express()

// Optional - we can instead do app.listen(3000).
// Then we can do app.get("port").
app.set('port', process.env.PORT || 3000)

// Parse JSON body in (eg POST, PUT and PATCH) requests with 'Content-Type: application/json',
// and make it available in req.body as JS object.
app.use(express.json())

// Parse URL encoded body in a <form> submission (Content-Type: application/x-www-form-urlencoded),
// and make it available in req.body as JS object.
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
)

app.listen(app.get('port'), () => {
  console.log(
    'Server is running on port %d in %s mode',
    app.get('port'),
    app.get('env')
  )
})
```

## Libraries

- helmet - Help secure Express apps with various HTTP headers - https://helmetjs.github.io/ - https://github.com/helmetjs/helmet

## Typing the params, request and response with TypeScript

https://www.jonmellman.com/posts/typescript-for-api-contracts - https://github.com/jonmellman/blog-examples/tree/master/typescript-for-api-contracts

## CORS

Why doesn't adding CORS headers to an OPTIONS route allow browsers to access my API? - https://stackoverflow.com/questions/7067966/why-doesnt-adding-cors-headers-to-an-options-route-allow-browsers-to-access-my

https://github.com/troygoode/node-cors-server

https://enable-cors.org/server_expressjs.html

### Manual

```ts
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})
```

### Using the `cors` package

https://github.com/expressjs/cors

If we don't pass any options:

```js
import cors from 'cors'
app.use(cors())
```

It uses the [default configuration](https://github.com/expressjs/cors#configuration-options) which returns:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE`
- It also sets `Access-Control-Allow-Headers: content-type` if the request has `Access-Control-Request-Headers: content-type`.

So with no options it accepts all origins! However we can specify the allowed origins:

```js
app.use(
  cors({
    origin: ['https://example.com'],
  })
)
```

We can also use a callback for `origin` - see https://github.com/expressjs/cors#configuring-cors-asynchronously

## TypeScript setup

```bash
git init
touch .gitignore # Add node_modules
npm init # Creates packages.json. The "main" script (entry point) should be build/index.js
npm i [-E] express
npm i -D [-E] typescript @types/express ts-node-dev
npx tsc --init # Creates tsconfig.json
```

Tweak `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "./build",
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

Add scripts to `package.json`:

```json
{
  "main": "build/index.js",
  "scripts": {
    "start": "node build/index.js",
    "dev": "ts-node-dev src/index.ts",
    "build": "npx tsc"
  }
}
```

[See this to setup ESLint.](/dev/eslint#setup)

### TypeScript setup examples

- Midudev: https://www.youtube.com/watch?v=ZpY5KdGQvwI - https://github.com/midudev/express-typescript
- Codely: https://www.youtube.com/watch?v=_1hGZygILd0 - https://github.com/CodelyTV/typescript-api-skeleton

## Extending the `Request` type to add fields to it

Extend Express Request object using Typescript - https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript/40762463

Add the following to any `.ts` file:

```ts
declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
}
```

Alternatively, we can also create a file `types/express/index.d.ts` with the same content, and then set `"typeRoots": ["./types"]` at `tsconfig.json`.

## Passport

https://github.com/cypress-io/cypress-realworld-app/blob/develop/backend/auth.ts

## JWT

https://github.com/auth0/node-jsonwebtoken/

Note that there's no performance difference between the sync and async versions of `jwt.sign` and `jwt.verify` according to https://github.com/auth0/node-jsonwebtoken/issues/566.

https://github.com/auth0/express-jwt

https://github.com/azat-co/practicalnode/blob/master/chapter6/chapter6.md

Curso de Node.js: Autenticación, Microservicios y Redis - https://platzi.com/cursos/nodejs-microservicios - https://github.com/CodingCarlos/proyecto-backend-node-platzi

Curso de Backend con Node.js: Autenticación con Passport.js y JWT - https://platzi.com/cursos/passport - https://github.com/platzi/curso-nodejs-auth
