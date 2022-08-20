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

- helmet - https://helmetjs.github.io/ - https://github.com/helmetjs/helmet

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

## Passport

https://github.com/cypress-io/cypress-realworld-app/blob/develop/backend/auth.ts

## JWT

https://github.com/azat-co/practicalnode/blob/master/chapter6/chapter6.md
