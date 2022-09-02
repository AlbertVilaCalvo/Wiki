---
title: TypeScript
---

Docs: https://www.typescriptlang.org/docs

Handbook: https://www.typescriptlang.org/docs/handbook/intro.html

## CLI

Setup: https://www.typescriptlang.org/download

Install locally, don't use a global install:

```
npm install --save-dev typescript
npm i -D typescript
yarn add --dev typescript
```

If we install it locally in our project, we can run that version using npx or yarn:

```
npx tsc
yarn tsc
yarn tsc --noEmit
```

### Run tsc on a specific files:

- https://www.npmjs.com/package/tsc-files
- Allow tsconfig.json when input files are specified - https://github.com/microsoft/TypeScript/issues/27379
- https://stackoverflow.com/questions/44676944/how-to-compile-a-specific-file-with-tsc-using-the-paths-compiler-option

## tsconfig.json

TSConfig Reference: https://www.typescriptlang.org/tsconfig

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

Create tsconfig.json: `npx tsc --init` or `yarn run tsc --init`.

### tsconfig.json options to enable

`"noImplicitReturns": true /* Report error when not all code paths in function return a value. */`

### Share tsconfig.json

https://stackoverflow.com/questions/37579969/how-to-use-multiple-tsconfig-files-in-vs-code

```
├── tsconfig-base.json
├── server/
│   ├── tsconfig.json
├── client/
│   ├── tsconfig.json
```

```js
// tsconfig-base.json
{
  "compilerOptions": {
  },
  "exclude": [],
  "include": []
}

// server/tsconfig.json or client/tsconfig.json
{
  "extends": "../tsconfig-base.json",
  "compilerOptions": {
  },
  "include": []
}
```

### "strict": true

Setting [`strict`](https://www.typescriptlang.org/tsconfig#strict) to `true` in `tsconfig.json` (or using the `tsc` `--strict` flag) enables all this compiler options:

1. [`alwaysStrict`](https://www.typescriptlang.org/tsconfig#alwaysStrict)
2. [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny)
3. [`noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis)
4. [`strictBindCallApply`](https://www.typescriptlang.org/tsconfig#strictBindCallApply)
5. [`strictFunctionTypes`](https://www.typescriptlang.org/tsconfig#strictFunctionTypes)
6. [`strictNullChecks`](https://www.typescriptlang.org/tsconfig#strictNullChecks)
7. [`strictPropertyInitialization`](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization)
8. [`useUnknownInCatchVariables`](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables)

To know which checks are enabled by 'strict' search for 'true if strict' here:

- https://www.typescriptlang.org/tsconfig
- https://www.typescriptlang.org/docs/handbook/compiler-options.html

## @ts-expect-error

From https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments

ts-ignore or ts-expect-error?

In some ways // @ts-expect-error can act as a suppression comment, similar to // @ts-ignore. The difference is that // @ts-ignore will do nothing if the following line is error-free.

You might be tempted to switch existing // @ts-ignore comments over to // @ts-expect-error, and you might be wondering which is appropriate for future code. While it’s entirely up to you and your team, we have some ideas of which to pick in certain situations.

Pick ts-expect-error if:

- you’re writing test code where you actually want the type system to error on an operation
- you expect a fix to be coming in fairly quickly and you just need a quick workaround
- you’re in a reasonably-sized project with a proactive team that wants to remove suppression comments as soon affected code is valid again

Pick ts-ignore if:

- you have a larger project and new errors have appeared in code with no clear owner
- you are in the middle of an upgrade between two different versions of TypeScript, and a line of code errors in one version but not another.
- you honestly don’t have the time to decide which of these options is better.

## null or undefined?

https://stackoverflow.com/questions/6604749/what-reason-is-there-to-use-null-instead-of-undefined-in-javascript

https://basarat.gitbook.io/typescript/recap/null-undefined

https://basarat.medium.com/null-vs-undefined-in-typescript-land-dc0c7a5f240a

Douglas Crockford: pick undefined, avoid null - https://www.youtube.com/watch?v=PSGEjv3Tqo0&t=561s

https://github.com/microsoft/TypeScript/issues/9653

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html

https://dev.to/johannesjo/how-do-you-deal-with-null-vs-undefined-4899

https://github.com/nene/eslint-plugin-no-null

Gotcha. If we use `undefined` we don't get an error if we forget to initialize a field in a class constructor,
but if we use `null` we do:

```ts
class User {
  name: string | null // GOOD - TS2564: Property 'country' has no initializer and is not definitely assigned in the constructor.
  country: string | undefined // BAD - No error :(

  constructor(name: string | undefined, country: string | null) {
    // We forgot to initialize the fields here:
    // this.name = name
    // this.country = country
  }
}
```


## Type guards / type narrowing

https://basarat.gitbook.io/typescript/type-system/typeguard

https://www.typescriptlang.org/docs/handbook/2/narrowing.html

A user-defined type guard is a function whose return type is a _type predicate_.

```ts
export function isLoading<T>(arg: 'loading' | T | Error): arg is 'loading' {
  return arg === 'loading'
}

export function isSuccess<T>(arg: 'loading' | T | Error): arg is T {
  return arg !== 'loading' && !(arg instanceof Error)
}

export function isError<T>(arg: 'loading' | T | Error): arg is Error {
  return arg instanceof Error
}
```

## `Result<T, E>` type

https://gist.github.com/s-panferov/5269524dcf23dad9a1ef

```ts
interface Loading {
  kind: 'loading'
}

interface Success<T> {
  kind: 'success'
  data: T
}

interface Error<T> {
  kind: 'error'
  error: T
}

type Result<S, E> = Loading | Success<S> | Error<E>

type GetProductResult = Result<Product, 'network-error' | 'product-not-found'>
```

## Utility Types

https://www.typescriptlang.org/docs/handbook/utility-types.html

Make fields optional: `Partial<User>`. Example: `Partial<{ email: string; password: string }>` is `{email?: string, password?: string}`

Return type of an async function: https://stackoverflow.com/questions/48011353/how-to-unwrap-type-of-a-promise

## typescript-eslint ban-types

https://typescript-eslint.io/rules/ban-types/

https://github.com/microsoft/TypeScript/issues/21732#issuecomment-886221640

I prefer `{}` over `Record<string, never>` for an empty object because it triggers an error sooner.

```ts
const a: {} = {}
a.x // Error TS2339: Property 'x' does not exist on type '{}'.

const b: Record<string, never> = {}
b.x // It's just 'never' but no error is shown yet :/
b.x.y // Error TS2339: Property 'bye' does not exist on type 'never'.
```

To use `{}` suppress the rule with `// eslint-disable-next-line @typescript-eslint/ban-types`.

## With React

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

https://fettblog.eu/typescript-react-component-patterns

```ts
import * as React from 'react'

/**
 * Instead of doing eg `MyText(props: TextProps & {children: React.ReactNode})`
 * you can do `MyText(props: WithChildren<TextProps>)`.
 * Note that the `children` prop is required.
 */
export type WithChildren<T> = T & { children: React.ReactNode }

// If you get the error "TS2322: Type 'ReactNode' is not assignable to type 'Element'." then do:
export type WithChildren<T> = T & { children: JSX.Element }
```

[source](https://fettblog.eu/typescript-react-component-patterns/)

[It's already defined on the definitions, but children is optional :/](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/24f1d0c82da2d898acd03fbb3e692eba3c431f82/types/react/index.d.ts#L773)
