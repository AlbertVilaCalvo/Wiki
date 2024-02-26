---
title: MobX
---

https://github.com/mobxjs/mobx

https://github.com/mobxjs/mobx-state-tree

https://github.com/mobxjs/mobx-utils

https://mobx.js.org/README.html

https://mobx.js.org/getting-started

mobx-react-lite - _lighter version of mobx-react which supports React functional components only and as such makes the library slightly faster and smaller_ - https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite

https://michel.codes/blogs/ui-as-an-afterthought

> Initially, design your state, stores, processes as if you were building a CLI, not a web app.
> Nothing beats the simplicity of invoking your business processes directly as a set of functions.
> Most components will be dumb
> At this point you might also understand why I am not a fan of the things that mix back-end interaction directly into the UI. Such as the react-apollo bindings as means to interact with graphQL. Back-end interaction like submitting mutations or fetching data is the responsibility of my domain stores. Not the UI layer. React-Apollo so far feels to me as a shortcut that too easily leads to a tightly coupled setup.

## Concepts & API

> Anything that can be derived from the application state, should be derived. Automatically.

[source](https://mobx.js.org/getting-started)

- [action](https://mobx.js.org/api.html#actions): alters the state
- derivation: value computed automatically from the state, see [computed](https://mobx.js.org/api.html#computed)
- [reaction](https://mobx.js.org/api.html#reactions): run automatically to perform some task

> Changes to the application state caused by your actions are automatically processed by all derivations and reactions.

> With MobX there is no need to normalize data first and to write selectors to make sure our components will be updated. In fact, it doesn't even matter where the data is stored. As long as objects are made [`observable`](https://mobx.js.org/api.html#observable), MobX will be able to track them.

## autorun

https://mobx.js.org/api.html#autorun

> `autorun` creates a **reaction** that runs once, and after that automatically re-runs whenever any observable data that was used inside the function changes.

> useful for logging, making network requests, etc.

## action

https://mobx.js.org/api.html#action

> makes sure that both mutations are processed in a single transaction, making sure any observers are only notified after both updates have completed [source](https://mobx.js.org/getting-started)

## observer

https://mobx.js.org/api.html#observer

Is a React higher order component, comes with the package mobx-react or mobx-react-lite.

> For observer to work, it doesn't matter how the observables arrive in the component, only that they are read. Reading observables deeply is fine, complex expression like todos[0].author.displayName work out of the box. This makes the subscription mechanism much more precise and efficient compared to other frameworks in which data dependencies have to be declared explicitly or be pre-computed (e.g. selectors). [source](https://mobx.js.org/react-integration.html)

## Error: [MobX] Cannot apply 'observable' to 'UserStore@1.user': Field not found.

We need to initialize each class field before using `make(Auto)Observable` to avoid this error.

https://stackoverflow.com/questions/67266810/error-mobx-cannot-apply-observable-to-storeuser-field-not-found

From https://mobx.js.org/observable-state.html#limitations:

> `make(Auto)Observable` only supports properties that are already defined. Make sure your [compiler configuration is correct](https://mobx.js.org/installation.html#use-spec-compliant-transpilation-for-class-properties), or as work-around, that a value is assigned to all properties before using `make(Auto)Observable`. Without correct configuration, fields that are declared but not initialized (like in `class X { y; }`) will not be picked up correctly.

```ts
// Triggers error
class UserStore {
  user: User | undefined
  constructor() {
    makeObservable(this, {
      user: observable,
    })
  }
}
// Does not trigger error
class UserStore {
  user: User | undefined
  constructor() {
    this.user = undefined
    makeObservable(this, {
      user: observable,
    })
  }
}
class UserStore {
  user: User | undefined = undefined
  constructor() {
    makeObservable(this, {
      user: observable,
    })
  }
}
```

## Articles

Show HN: MobX-Style Observables in Svelte - https://news.ycombinator.com/item?id=26235034

MobX 6 - https://news.ycombinator.com/item?id=24648363

imho, 5 with legacy decorators is still the best DX - https://twitter.com/mweststrate/status/1507379484403679237

https://news.ycombinator.com/item?id=31960121

> I’d say the two biggest hazards with the reactive/declarative style are **cyclic dependencies** in the data model and remembering history.
