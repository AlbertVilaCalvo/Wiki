---
title: React
---

https://typeofnan.dev/solid-js-feels-like-what-i-always-wanted-react-to-be/

React re-renders guide: everything, all at once - https://www.developerway.com/posts/react-re-renders-guide

> Creating components inside render function of another component is an anti-pattern that can be the biggest performance killer.

Avoid declaring components inside of components - https://isamatov.com/react-antipatterns/#declaring-components-inside-of-components

Copilot instructions:

- https://github.com/github/awesome-copilot/blob/main/instructions/reactjs.instructions.md
- https://github.com/github/awesome-copilot/blob/main/instructions/nextjs.instructions.md
- https://github.com/github/awesome-copilot/blob/main/instructions/performance-optimization.instructions.md

A Visual Guide to React Rendering - It Always Re-renders - https://alexsidorenko.com/blog/react-render-always-rerenders/

The Interactive Guide to Rendering in React - https://ui.dev/why-react-renders

Preguntas típicas sobre React para entrevistas de trabajo - https://github.com/midudev/preguntas-entrevista-react

TODO read: https://vercel.com/blog/whats-new-in-react-19

Scan for React performance issues and eliminate slow renders in your app - https://github.com/aidenybai/react-scan - https://react-scan.million.dev/

## Lifecycle

https://twitter.com/dan_abramov/status/981712092611989509

https://imgur.com/bmfcRQm

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## `&&` gotcha

Don't do this:

```jsx
{
  condition && <SomeComponent />
}
```

If the condition evaluates to `true` or `false` then `&&` is fine, but you can have trouble with falsy values like 0 or `undefined` (eg a `<div>0</div>` being rendered).

Do this instead:

```jsx
{
  condition ? <SomeComponent /> : null
}
```

https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator

https://medium.com/geekculture/stop-using-for-conditional-rendering-in-react-a0f7b96200f8

## Hooks

When to useMemo and useCallback - https://kentcdodds.com/blog/usememo-and-usecallback

https://labs.factorialhr.com/posts/hooks-considered-harmful

> Most bugs can be solved by moving hooks away from the components and using primitives as the only dependencies

### `useEffect`

:::tip
When you’re not sure whether some code should be in an Effect or in an event handler, ask yourself why this code needs to run. **Use Effects only for code that should run because the component was displayed to the user.** [source](https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers)
:::

https://react.dev/reference/react/useEffect

https://react.dev/learn/synchronizing-with-effects

> Don’t rush to add Effects to your components. Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some external system. This includes browser APIs, third-party widgets, network, and so on. **If your Effect only adjusts some state based on other state, you might not need an Effect.**

https://react.dev/learn/you-might-not-need-an-effect

> You do need Effects to [synchronize](https://react.dev/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events) with external systems. For example, you can write an Effect that keeps a jQuery widget synchronized with the React state. You can also fetch data with Effects: for example, you can synchronize the search results with the current search query. Keep in mind that modern [frameworks](https://react.dev/learn/creating-a-react-app#full-stack-frameworks) provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.

> When something can be calculated from the existing props or state, [don’t put it in state](https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state). Instead, calculate it during rendering. [Thinking in React](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) explains what should go into state.

Why we banned React's `useEffect` - https://x.com/alvinsng/status/2033969062834045089

> Most `useEffect` usage is compensating for something React already gives you better primitives for: derived state, event handlers, and data-fetching abstractions.

https://github.com/nickjvandyke/eslint-plugin-react-you-might-not-need-an-effect

https://github.com/victorpatru/biome-plugin-no-use-effect

https://x.com/steipete/status/1982011815069634878

> Refactored 141 `useEffect` calls today after feeding my agent this: https://react.dev/learn/you-might-not-need-an-effect

https://x.com/theo/status/1788327745925390571

> Things React should rename
>
> "use server" -> "use action" (it used to be this lol)\
> "use client" -> "use interactive"\
> React.cache -> React.dedupe\
> useEffect -> DO_NOT_USE_EFFECT_OR_YOU_WILL_BE_FIRED

#### Cancel async operations done in `useEffect`

Use a cleanup function to avoid updating the UI if the component is unmounted. Or in a search component, to avoid updating the UI with results from a previous search query when the user is typing fast.

https://react.dev/learn/synchronizing-with-effects#fetching-data

> If your Effect fetches something, the cleanup function should either abort the fetch or ignore its result

Example from https://react.dev/learn/you-might-not-need-an-effect#fetching-data

> However, the code above has a bug. Imagine you type "hello" fast. Then the query will change from "h", to "he", "hel", "hell", and "hello". This will kick off separate fetches, but there is no guarantee about which order the responses will arrive in. For example, the "hell" response may arrive after the "hello" response. Since it will call `setResults()` last, you will be displaying the wrong search results. This is called a “race condition”: two different requests “raced” against each other and came in a different order than you expected.
>
> To fix the race condition, you need to add a cleanup function to ignore stale responses:

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    // highlight-next-line-green
    let ignore = false
    fetchResults(query, page).then((json) => {
      // highlight-next-line-green
      if (!ignore) {
        setResults(json)
        // highlight-next-line-green
      }
    })
    // highlight-start-green
    return () => {
      ignore = true
    }
    // highlight-end-green
  }, [query, page])

  function handleNextPageClick() {
    setPage(page + 1)
  }
  // ...
}
```

> This ensures that when your Effect fetches data, all responses except the last requested one will be ignored.

Cancel Axios request using an `unmounted` variable: https://stackoverflow.com/questions/53861916/canceling-an-axios-rest-call-in-react-hooks-useeffects-cleanup-failing. Note that you need to use `AbortController`, not `CancelToken`, see https://axios.rest/pages/advanced/cancellation

#### Do not call `setState` synchronously in `useEffect`

Inside `useEffect`, you can only call `setState` in a callback function, not synchronously.

The rule `react-hooks/set-state-in-effect` of the ESLint plugin [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) catches this.

```
/Users/albert/Programming/Node/Projects/RecipeManager/web/src/recipe/useGetAllRecipes.ts
  11:5  error  Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).

/Users/albert/Programming/Node/Projects/RecipeManager/web/src/recipe/useGetAllRecipes.ts:11:5
   9 |
  10 |   React.useEffect(() => {
> 11 |     setResult('loading')
     |     ^^^^^^^^^ Avoid calling setState() directly within an effect
  12 |     RecipeApi.getAllRecipes()
  13 |       .then((recipes) => {
  14 |         setResult(recipes)  react-hooks/set-state-in-effect
```

See how to fix it at https://github.com/AlbertVilaCalvo/RecipeManager/pull/58

### `useCallback`

https://react.dev/reference/react/useCallback

When to useMemo and useCallback - https://kentcdodds.com/blog/usememo-and-usecallback

> There are specific reasons both of these hooks are built-into React:
>
> 1.  Referential equality
> 2.  Computationally expensive calculations

### `useMemo`

https://react.dev/reference/react/useMemo

When to useMemo and useCallback - https://kentcdodds.com/blog/usememo-and-usecallback

> `useMemo` is similar to `useCallback` except it allows you to apply memoization to any value type (not just functions). It does this by accepting a function which returns the value and then that function is _only_ called when the value needs to be retrieved (which typically will only happen once each time an element in the dependencies array changes between renders).

Example from https://react.dev/learn/you-might-not-need-an-effect#caching-expensive-calculations

```jsx
import { useMemo, useState } from 'react'

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter)
  }, [todos, filter])
  // ...
}
```

> This tells React that you don’t want the inner function to re-run unless either `todos` or `filter` have changed. React will remember the return value of `getFilteredTodos()` during the initial render. During the next renders, it will check if `todos` or `filter` are different. If they’re the same as last time, `useMemo` will return the last result it has stored. But if they are different, React will call the inner function again (and store its result).

## Create React App

https://create-react-app.dev/docs/advanced-configuration

Prevent automatically open browser on 'yarn start': `"start": "BROWSER=none react-scripts start"`

### Deprecated

https://github.com/reactjs/react.dev/pull/5487#issuecomment-1409720741

https://github.com/facebook/create-react-app/issues/13072

https://react.dev/blog/2025/02/14/sunsetting-create-react-app

https://github.com/bhbs/viject

## Imports

Correct:

```js
import { useState } from 'react'
import * as React from 'react'
```

Not correct: `import React from 'react'`

See https://twitter.com/dan_abramov/status/1308739731551858689

Also, the new JSX transform: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

https://stackoverflow.com/questions/54585763/what-is-the-difference-between-import-as-react-from-react-vs-import-react-fr

https://stackoverflow.com/questions/54585763/what-is-the-difference-between-import-as-react-from-react-vs-import-react-fr

## Inputs

```jsx
<textarea
  type="text"
  value={text}
  placeholder="Type"
  onChange={(e) => setText(e.target.value)}
/>
```

```jsx
<input
  type="text"
  value={text}
  placeholder="New Todo"
  onChange={(e) => setText(e.target.value)}
/>
```

## Context

https://reactjs.org/docs/hooks-reference.html#usecontext

```tsx
import * as React from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {
    console.warn('Warning: using ThemeContext outside the Provider')
  },
})
// Or we can do something like:
// const ThemeContext = React.createContext<ThemeContextValue>({} as ThemeContextValue)

export function useThemeContext() {
  return React.useContext(ThemeContext)
}

export function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = React.useState<Theme>('light')

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
```

### Context performance

[Preventing rerenders with React.memo and useContext hook](https://github.com/facebook/react/issues/15156#issuecomment-474590693)

https://thoughtspile.github.io/2021/10/04/react-context-dangers

## Element vs Component

- Element: `<SomeComponent />`
- Component: `SomeComponent`

https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html

https://stackoverflow.com/questions/33199959/how-to-detect-a-react-component-vs-a-react-element

See examples at 'React component as prop: the right way' - https://www.developerway.com/posts/react-component-as-prop-the-right-way

### `React.isValidElement()`

Used in FlatList `ListHeaderComponent` - see [source code](https://github.com/facebook/react-native/blob/8eeb01686f70a87ae4c38540283e9f9374f5bb0e/Libraries/Lists/VirtualizedList.js#L904).

```tsx
interface Props {
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null
}
```

```jsx
ListHeaderComponent={() => <SomeComponent />}
ListHeaderComponent={<SomeComponent />}
ListHeaderComponent={SomeComponent}
```

```jsx
const element = React.isValidElement(ListHeaderComponent) ? (
  ListHeaderComponent
) : (
  <ListHeaderComponent />
)

<View>{element}</View>
```

### A component prop must be capitalized

Important: to pass a component as a prop, the prop name must start with a capital letter:

```ts
// Definition
type Props = {
  ComponentProp: React.ComponentType<any>
}
function MyComponent({ ComponentProp }: Props) {
  return <ComponentProp />
}

// Usage
<MyComponent ComponentProp={AnotherComponent}>
```

Note that you can capitalize it to make it an element: https://queen.raae.codes/emails/2022-10-10-semantic-react

### Component prop example

<!-- prettier-ignore -->
```tsx
// The component that we pass as prop.
type IconProps = {
  color: string
}
function SettingsIcon(props: IconProps) {
  // ...
}

// The component that takes another component as a prop.
// Notice that we set IconProps as the generic type of React.ComponentType!
// By doing this there will be errors if we pass the wrong component :)
// If we instead do React.ComponentType<any> there won't :(
function Button({ Icon }: { Icon: React.ComponentType<IconProps> /* <- important! */ }) {
  return (
    <Pressable>
      <Icon />
    </Pressable>
  )
}

// Usage
<Button Icon={SettingsIcon} />
```

### Dynamically render different HTML elements

https://queen.raae.codes/emails/2022-10-10-semantic-react

## Libraries

- https://github.com/shuding/tilg - A magical React Hook that helps you debug components
- Why did you render: https://github.com/welldone-software/why-did-you-render

## State management libraries

Technical matrix of some React global state libraries - https://twitter.com/dai_shi/status/1342464894155640833

The new wave of React state management - https://news.ycombinator.com/item?id=31959289 - https://frontendmastery.com/posts/the-new-wave-of-react-state-management/

With Proxy:

- MobX: https://github.com/mobxjs/mobx
- Valtio: https://github.com/pmndrs/valtio
  - When I Use Valtio and When I Use Jotai - https://blog.axlight.com/posts/when-i-use-valtio-and-when-i-use-jotai/
- Legend-State: https://github.com/LegendApp/legend-state
  - See https://legendapp.com/dev/state/fast/
  - > Legend-State uses Proxy, which is how it exposes the observable functions (get/set/listen etc...) on anything within state. But it differs from other Proxy-based systems by not touching the underlying data all. Each proxy node represents a path within the object tree, and to get the value of any node it traverses the raw data to that path and returns the value. So every node within the state object stores minimal metadata, and never has to modify or clone the underlying data, which keeps object creation to a minimum and memory usage down.

Others:

- https://github.com/nanostores/nanostores

## UI design libraries

https://reactbits.dev - https://github.com/DavidHDev/react-bits

See comparison: https://chakra-ui.com/getting-started/comparison

Chakra UI: https://chakra-ui.com/ - https://github.com/chakra-ui/chakra-ui. Uses Emotion - see https://chakra-ui.com/getting-started/comparison#the-runtime-trade-off-%EF%B8%8F.

Ant Design: https://ant.design/ - https://github.com/ant-design/ant-design/. Uses Less - see https://ant.design/docs/react/use-with-create-react-app#Customize-Theme.

Material UI and Joy UI: https://mui.com/ - https://github.com/mui/material-ui.

### Headless

https://martinfowler.com/articles/headless-component.html

_A component that doesn’t have a UI, but has the functionality._ - https://blog.logrocket.com/the-complete-guide-to-building-headless-interface-components-in-react/

https://headlessui.com

## TypeScript

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

See examples at https://fettblog.eu/typescript-react-component-patterns

### Children

```ts title="Children.tsx"
import * as React from 'react'

/**
 * Instead of doing eg `MyText(props: TextProps & {children: React.ReactNode})`
 * you can do `MyText(props: RequiredChildren<TextProps>)`.
 */
export type RequiredChildren<Props> = Props & { children: React.ReactNode }

/**
 * Instead of doing eg `MyText(props: TextProps & {children?: React.ReactNode})`
 * you can do `MyText(props: OptionalChildren<TextProps>)`.
 */
export type OptionalChildren<Props> = Props & { children?: React.ReactNode }
```

If you get the error _TS2322: Type 'ReactNode' is not assignable to type 'Element'_ change `React.ReactNode` to `JSX.Element`:

```ts
export type WithChildren<T> = T & { children: JSX.Element }
```

[source](https://fettblog.eu/typescript-react-component-patterns/#withchildren-helper-type)

Note that this [already exists on `@types/react`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/24f1d0c82da2d898acd03fbb3e692eba3c431f82/types/react/index.d.ts#L773), but children is optional.

## Performance

Are Your React Components Too BIG? - https://www.youtube.com/watch?v=NsFmOttIW9Y

## Portals

https://marvinh.dev/blog/portals-considered-harmful/

## Interview questions

https://scrimba.com/react-interview-questions-c01t:toc
