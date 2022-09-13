---
title: JavaScript Modules
sidebar_label: Modules
---

Introduced in ES6 / ES2015.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

https://tc39.es/ecma262/#sec-modules

https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/

https://hacks.mozilla.org/2015/08/es6-in-depth-modules/

## Named

```ts
// sayHello.js
export function sayHello() {
  alert('hello')
}

// main.js
import { sayHello } from './sayHello'

sayHello()
```

You can also have a single, grouped export:

```ts
function sayHello() {
  alert('hello')
}

export { sayHello }
```

## Default

```ts
// sayHello.js
export default function sayHello() {
  alert('hello')
}

// main.js
import whateverName from './sayHello'

whateverName()
```

https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/

https://basarat.gitbook.io/typescript/main-1/defaultisbad

Prohibit default exports with https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md

## Rename with `as`

```ts
// Api.js
const getX = () => 'x'
const getY = () => 'y'

export { getX, getY as getYSync }

// main.js
import { getX as getXSync, getYSync } from './Api'

getXSync()
getYSync()
```

## Namespace or wildcard import (module object) - `import * as React from 'react'`

Creates a module object.

https://medium.com/unsplash/named-namespace-imports-7345212bbffb

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#creating_a_module_object

```ts
// Api.js
export const getX = () => 'x'
export const getY = () => 'y'

// main.js
import * as Api from './Api'

Api.getX()
Api.getY()
```

Issues:

- We can use any name, eg: `import * as ServerApi from './Api'`
- Editors may not add these imports automatically
- https://github.com/import-js/eslint-plugin-import/issues/1547
  - Namespace imports are only for two reasons: metaprogramming and laziness. They’re the entire reason “treeshaking” exists as a concept - because namespace imports encourage files that export many things, which encourages non-deep imports, which causes too much code to end up in bundles.
  - Specifically, if you have a file that exports 20 things, and you do import { three } from './twenty' or import \* as moreThanWeNeed from './twenty', a bundler will include by default all 20 things. Treeshaking is required to try to guess which of the other 19 it can delete/omit. If, instead, you have 20 files, each that export one thing, then no guessing is required and no omitting/deleting is required; you will have exactly the code you need in your bundle and no more.

Prohibit them with https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md

## `export * as ns from "mod"`

https://github.com/tc39/proposal-export-ns-from

https://github.com/tc39/ecma262/pull/1174

```ts
// Api.js
export const getX = () => 'x'
export const getY = () => 'y'

export * as Api from './Api'

// main.js
import { Api } from './Api'

Api.getX()
Api.getY()
```

Note that we can still import individually:

```ts
// main.js
import { Api, getX, getY } from './Api'

getX()
getY()
Api.getX()
Api.getY()
```

## Re-export

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#aggregating_modules

https://javascript.info/import-export#re-export

## Dynamic import

https://github.com/tc39/proposal-dynamic-import

## Import assertions

https://github.com/tc39/proposal-import-assertions

## JSON modules

https://github.com/tc39/proposal-json-modules
