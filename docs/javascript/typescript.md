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
```

### `--noEmit`

Use [`--noEmit`](https://www.typescriptlang.org/tsconfig/#noEmit) to only typecheck, without outputting JS files:

```
npx tsc --noEmit
yarn tsc --noEmit
```

It's common to have a 'typecheck' script on `package.json`:

```json title="package.json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Run it with `npm run typecheck`.

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

## Show full expanded type

https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type

## Excess property checking

For object literals.

https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks

```ts
type User = {
  id: number
  name: string
}

const user: User = {
  id: 1,
  name: 'Anna',
  password: 'abcd', // <- error
}
// TS2322: Type '{ id: number; name: string; password: string; }' is not assignable to type 'User'.
// Object literal may only specify known properties, and 'password' does not exist in type 'User'.

function printUser(user: User) {
  alert(user.name)
}

printUser({
  id: 1,
  name: 'Anna',
  password: 'abcd', // <- Same error as above
})

// Note that it doesn't work if we define an intermediate variable:
const data = {
  id: 1,
  name: 'Anna',
  password: 'abcd',
}
const user: User = data // No error here
```

Can be disabled:

- At `tsconfig.json` with `suppressExcessPropertyErrors` - https://www.typescriptlang.org/tsconfig#suppressExcessPropertyErrors
- At `tsc` with `--suppressExcessPropertyErrors` - https://www.typescriptlang.org/docs/handbook/compiler-options.html

## Make `switch` exhaustive

```ts
/**
 * Use it to ensure that a switch is exhaustive.
 * From https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(switchParameter: never): never {
  throw Error('Unreachable code violation')
}
```

Usage:

```ts
type Char = 'A' | 'B' | 'C'

function doSomething(char: Char): void {
  switch (char) {
    case 'A':
      break
    case 'B':
      break
    // case 'C' is missing
    default:
      // TS2345: Argument of type 'string' is not assignable to parameter of type 'never'.
      assertUnreachable(char)
  }
}
```

Here there are some ideas: https://basarat.gitbook.io/typescript/type-system/discriminated-unions

## Classes

### Arrow function property vs method

From https://www.typescriptlang.org/docs/handbook/2/classes.html#arrow-functions

```ts
class MyClass {
  name = 'MyClass'
  getName = () => {
    return this.name
  }
}
```

> This will use more memory, because each class instance will have its own copy of each function defined this way

Also see https://stackoverflow.com/questions/51464318/arrow-function-vs-class-methods-memory-footprint

### Exclude methods from classes

https://stackoverflow.com/questions/55479658/how-to-create-a-type-excluding-instance-methods-from-a-class-in-typescript

https://stackoverflow.com/questions/59272031/how-to-define-typescript-partial-type-to-accept-only-properties

```ts
class Folder {
  name: string
  isPublic: boolean

  constructor(name: string, isPublic: boolean) {
    this.name = name
    this.isPublic = isPublic
  }

  // There are 3 ways to add an instance "method"

  // Method - folder.isPrivate()
  isPrivate(): boolean {
    return !this.isPublic
  }

  // Field - folder.isPrivate()
  isPrivate = () => {
    return !this.isPublic
  }
  // We can specify the type:
  isPrivate: () => boolean = () => {
    return !this.isPublic
  }

  // Getter - folder.isPrivate
  get isPrivate(): boolean {
    return !this.isPublic
  }
}

// All 3 options trigger this error:
// TS2741: Property 'isPrivate' is missing in type '{ name: string; isPublic: false; }' but
//   required in type 'Folder'.
const folder: Folder = {
  name: 'Documents',
  isPublic: false,
}

// We can exclude the methods with:
type ExcludeFunctionProperties<T> = Omit<
  T,
  { [K in keyof T]-?: T[K] extends Function ? K : never }[keyof T]
>

// The resulting type is {name: string, isPublic: boolean} if `isPrivate` is defined
// with a method or field, but will be {name: string, isPublic: boolean, isPrivate: boolean}
// if defined with the getter (so don't use getters!).
type FolderNoFunc = ExcludeFunctionProperties<Folder>

// No error "Property 'isPrivate' is missing..." here :)
const folderNoFunc: FolderNoFunc = {
  name: 'Documents',
  isPublic: false,
}

// TS2339: Property 'isPrivate' does not exist on type 'FolderNoFunc'.
folderNoFunc.isPrivate()

// We can use a Folder where it expects a FolderNoFunc, since a Folder has more properties:
function printFolderNoFunc(folderNoFunc: FolderNoFunc) {}
printFolderNoFunc(folder) // OK :)
// But we can't use FolderNoFunc where it expects Folder, we get the error:
// TS2345: Argument of type 'FolderNoFunc' is not assignable to parameter of type 'Folder'.
//   Property 'isPrivate' is missing in type 'FolderNoFunc' but required in type 'Folder'.
function printFolder(folder: Folder) {}
printFolder(folderNoFunc) // Error :(
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

## Type narrowing in `filter` with type predicates

https://www.alexhughes.dev/blog/typed-filter

https://www.skovy.dev/blog/typescript-filter-array-with-type-guard

https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

https://stackoverflow.com/questions/58882530/typescript-filter-array-of-conditional-types-and-have-proper-return-type

Say that we have a type `User` with optional email:

```ts
type User = {
  name: string
  email?: string
}
```

To filter an array of users to get only the ones that have email we can do:

```ts
type UserWithEmail = User & { email: string }

function hasEmail(user: User): user is UserWithEmail {
  return !!user.email
}

const emails: string[] = users
  .filter(hasEmail)
  .map((user: UserWithEmail) => user.email)
```

We can also do it inline without writing `hasEmail`:

```ts
const emails: string[] = users
  .filter((user: User): user is UserWithEmail => !!user.email)
  .map((user: UserWithEmail) => user.email)
```

Another example using `typeof`:

```ts
const emails: string[] = users
  .map((user) => user.email)
  .filter(
    (email: string | undefined): email is string => typeof email === 'string'
  )
```

## Assertion functions

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions

https://www.lucaspaganini.com/academy/assertion-functions-typescript-narrowing-5

```ts
export function assertUser(user: User | undefined): asserts user is User {
  if (!user) {
    throw new Error('User is undefined')
  }
}

function doSomething(user: User | undefined) {
  user.name // TS2532: Object is possibly 'undefined'.
  const u: User = user // TS2322: Type 'User | undefined' is not assignable to type 'User'.
  assertUser(user)
  // user is now just User, not User | undefined
  user.name // No error
  const u: User = user // No error
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

## `const` assertions

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions

## `satisfies`

Announcement: https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-rc/#the-satisfies-operator

Issue proposing this: https://github.com/microsoft/TypeScript/issues/47920

Pull request: https://github.com/microsoft/TypeScript/pull/46827

Improvement example in Next.js: https://twitter.com/leeerob/status/1563540593003106306

How TypeScript 4.9 `satisfies` Your Prisma Workflows: https://www.prisma.io/blog/satisfies-operator-ur8ys8ccq7zb

## Utility Types

https://www.typescriptlang.org/docs/handbook/utility-types.html

Implementation: https://github.com/microsoft/TypeScript/blob/df6b9e57542b3c5c68cee0e340d1c82207e41dbc/lib/lib.es5.d.ts#L1550-L1659

A library with extra types: https://github.com/ts-essentials/ts-essentials

Make _all_ fields optional: `Partial<User>`. Example: `Partial<{ email: string; password: string }>` is `{email?: string, password?: string}`.

Make _all_ fields required: `Required<User>`. Is the opposite of `Partial`.

Make _some_ fields optional:

```ts
/**
 * Like the built-in [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utility,
 * but it allows you to make just some of the fields optional, not all.
 * From https://stackoverflow.com/a/61108377/4034572.
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
```

Make _some_ fields required:

```ts
/**
 * Like the built-in [Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) utility,
 * but it allows you to make just some of the fields required, not all.
 * From https://stackoverflow.com/a/72075415/4034572.
 */
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>
```

See alternative implementation in https://stackoverflow.com/questions/69327990/how-can-i-make-one-property-non-optional-in-a-typescript-type

Return type of an async function: https://stackoverflow.com/questions/48011353/how-to-unwrap-type-of-a-promise

Get function argument type: `Parameters`. See https://stackoverflow.com/questions/51851677/how-to-get-argument-types-from-function-in-typescript.
Useful to avoid exporting a type (eg if we only need it in tests).

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
