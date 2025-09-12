---
title: Express
---

https://expressjs.com

https://github.com/expressjs/express

https://expressjs.com/en/starter/generator.html

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

## Express 5

https://expressjs.com/2024/10/15/v5-release.html

Migration guide - https://expressjs.com/en/guide/migrating-5.html

Codemod to migrate from Express v4 to v5 - https://www.npmjs.com/package/@expressjs/codemod

https://betterstack.com/community/guides/scaling-nodejs/express-5-new-features

https://www.trevorlasn.com/blog/whats-new-in-express-5

https://stateful.com/blog/new-express-5-features

### Async error handlers

https://expressjs.com/en/guide/error-handling.html

> Starting with Express 5, route handlers and middleware that return a Promise will call `next(value)` automatically when they reject or throw an error.

In v4, for an error handler to be invoked if an error is thrown in an `async` function, you need to wrap the async code with a try-catch and call `next(error)` at the `catch(error)`. See https://stackoverflow.com/questions/56973265/what-does-express-async-handler-do and https://www.npmjs.com/package/express-async-handler

## Libraries

https://expressjs.com/en/resources/middleware.html

https://expressjs.com/en/resources/utils.html

- helmet - Help secure Express apps with various HTTP headers - https://helmetjs.github.io/ - https://github.com/helmetjs/helmet

### Testing

- https://github.com/forwardemail/supertest - Super-agent driven library for testing node.js HTTP servers using a fluent API
- https://github.com/howardabrams/node-mocks-http - Mock 'http' objects for testing Express routing functions
- https://github.com/pact-foundation/pact-js - Contract testing framework for HTTP APIs and non-HTTP asynchronous messaging systems

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

## Error handling

https://expressjs.com/en/guide/error-handling.html

https://github.com/expressjs/express/blob/master/examples/error/index.js

https://scoutapm.com/blog/express-error-handling

https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/

### Custom error handling middleware

https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling

:::danger The 4 arguments must be provided

"Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors." [source](https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling)

:::

```ts
import { ErrorRequestHandler } from 'express'

/**
 * Important: this error handler does not get invoked if the error is thrown in
 * an `async` function or callback unless you wrap the code with a try-catch
 * and call next(error).
 */
// Important: 'next' argument must be provided, even if unused! See why at
// https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Error handler', err)
  res.sendStatus(500)
}

router.use(errorHandler)
```

:::warning

In Express 4 error handlers are only called from handlers that are synchronous (ie not `async` functions nor callbacks).
In Express 5 is OK.

:::

```ts
// Synchronous → the error handler works :)
// The server does not crash. There's a response sent to the client (500 Internal Server Error).
router.get('/sync', (req, res) => {
  const a = {}
  // @ts-ignore
  a.thiswill.createacrash // TypeError: Cannot read properties of undefined (reading 'createacrash')
})

// Asynchronous → the error handler does NOT work :/
// The server crashes and it stops. There's no response sent to the client.
router.get('/async', async (req, res) => {
  const a = {}
  // @ts-ignore
  a.thiswill.createacrash
})
router.get('/callback', (req, res) => {
  setTimeout(() => {
    const a = {}
    // @ts-ignore
    a.thiswill.createacrash
  }, 100)
})
```

In v4, in asynchronous handlers we must catch the errors in a try-catch and then call `next(error)` if we want our error handling middleware to be called.

Alternatively we can use https://www.npmjs.com/package/express-async-handler.

## TypeScript

### New project setup with TypeScript

OJO ts-node-dev fa anys que no s'actualitza. Veure alternatives:

- https://github.com/privatenumber/ts-runtime-comparison
- https://www.pirobits.com/post/run-typescript-code-with-tsx-ts-node-alternative
- https://tsx.is - https://github.com/privatenumber/tsx
- OJO diu que tsx no fa type checking a https://www.reddit.com/r/node/comments/16qnlhy/have_you_used_tsx_as_an_alternative_to_tsnode_to/
- https://github.com/swc-project/swc-node - Faster ts-node without typecheck
- https://dev.to/rennycat/use-tsx-instead-of-nodemon-4lh3

```shell
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

[See this to setup ESLint.](/javascript/eslint#setup)

How to Setup Node.js with TypeScript in 2023 - https://www.youtube.com/watch?v=H91aqUHn8sE

### TypeScript project setup examples

- Midudev: https://www.youtube.com/watch?v=ZpY5KdGQvwI - https://github.com/midudev/express-typescript
- Codely: https://www.youtube.com/watch?v=_1hGZygILd0 - https://github.com/CodelyTV/typescript-api-skeleton

### Extending the `Request` type to add fields to it

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

### Typing the params, request and response

https://www.jonmellman.com/posts/typescript-for-api-contracts - https://github.com/jonmellman/blog-examples/tree/master/typescript-for-api-contracts

```ts
const updateUserEmail: RequestHandler<
  { userId: string }, // Params
  { user: User } | { error: string }, // Response Body
  { email: string } // Request Body
> = async (req, res) => {}
```

## Service layer

- Project structure for an Express REST API when there is no "standard way" - https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way/
- Why you should isolate Express from the rest of your Node application - https://www.coreycleary.me/why-you-should-isolate-express-from-the-rest-of-your-node-application/
- How does one unit test routes with Express? - https://stackoverflow.com/a/25106553/4034572
  - I've come to the conclusion that the only way to really unit test express applications is to maintain a lot of separation between the request handlers and your core logic.
  - Thus, your application logic should be in separate modules that can be required and unit tested, and have minimal dependence on the Express Request and Response classes as such.

## Passport

https://github.com/cypress-io/cypress-realworld-app/blob/develop/backend/auth.ts

## JWT

https://github.com/auth0/node-jsonwebtoken/

Note that there's no performance difference between the sync and async versions of `jwt.sign` and `jwt.verify` according to https://github.com/auth0/node-jsonwebtoken/issues/566.

https://github.com/auth0/express-jwt

Curso de Backend con Node.js: Autenticación con Passport.js y JWT - https://platzi.com/cursos/passport - https://github.com/platzi/curso-nodejs-auth
