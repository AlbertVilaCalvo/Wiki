---
title: TypeScript
---

Docs: https://www.typescriptlang.org/docs

Handbook: https://www.typescriptlang.org/docs/handbook/intro.html


## CLI

Setup: https://www.typescriptlang.org/download

Install locally, don't use a global install:
```
npm install typescript --save-dev
yarn add typescript --dev
```

If we install it locally in our project, we can run that version using npx or yarn:
```
npx tsc
yarn tsc
yarn tsc --noEmit
```

## tsconfig.json

TSConfig Reference: https://www.typescriptlang.org/tsconfig

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

Create tsconfig.json: `npx tsc --init` or `yarn run tsc --init`.

### tsconfig.json options to enable

`"noImplicitReturns": true /* Report error when not all code paths in function return a value. */`


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


## Type guards

https://basarat.gitbook.io/typescript/type-system/typeguard

https://www.typescriptlang.org/docs/handbook/2/narrowing.html


## Utility Types

https://www.typescriptlang.org/docs/handbook/utility-types.html

Return type of an async function: https://stackoverflow.com/questions/48011353/how-to-unwrap-type-of-a-promise


## With React

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

https://fettblog.eu/typescript-react-component-patterns


```typescript
import * as React from 'react';

/**
 * Instead of doing eg `MyText(props: {children: React.ReactNode} & TextProps)`
 * you can do `MyText(props: WithChildren<TextProps>)`.
 * Note that the `children` prop is required.
 */
type WithChildren<T> = T & {children: React.ReactNode};
```
[source](https://fettblog.eu/typescript-react-component-patterns/)

[It's already defined on the definitions!](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/24f1d0c82da2d898acd03fbb3e692eba3c431f82/types/react/index.d.ts#L773)
