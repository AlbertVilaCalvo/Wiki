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

## Libraries

- helmet - https://helmetjs.github.io/ - https://github.com/helmetjs/helmet

## TypeScript setup

```bash
git init
touch .gitignore # Add node_modules
npm init # Creates packages.json. The "main" script should be build/index.js
npm i express
npm i -D typescript @types/express ts-node-dev
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

### Examples of TypeScript setup

Midudev: https://www.youtube.com/watch?v=ZpY5KdGQvwI - https://github.com/midudev/express-typescript

Codely: https://www.youtube.com/watch?v=_1hGZygILd0 - https://github.com/CodelyTV/typescript-api-skeleton
