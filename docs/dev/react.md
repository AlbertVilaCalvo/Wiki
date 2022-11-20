---
title: React
---

https://typeofnan.dev/solid-js-feels-like-what-i-always-wanted-react-to-be/

React re-renders guide: everything, all at once - https://www.developerway.com/posts/react-re-renders-guide

> Creating components inside render function of another component is an anti-pattern that can be the biggest performance killer.

Avoid declaring components inside of components - https://isamatov.com/react-antipatterns/#declaring-components-inside-of-components

A Visual Guide to React Rendering - It Always Re-renders - https://alexsidorenko.com/blog/react-render-always-rerenders/

When to useMemo and useCallback - https://kentcdodds.com/blog/usememo-and-usecallback

Preguntas típicas sobre React para entrevistas de trabajo - https://github.com/midudev/preguntas-entrevista-react

## Lifecycle

https://twitter.com/dan_abramov/status/981712092611989509

https://imgur.com/bmfcRQm

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## && gotchas

https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator

https://medium.com/geekculture/stop-using-for-conditional-rendering-in-react-a0f7b96200f8

## Hooks

https://labs.factorialhr.com/posts/hooks-considered-harmful

> Most bugs can be solved by moving hooks away from the components and using primitives as the only dependencies

### Cancel async operations done in useEffect

To avoid updating the UI if the component is unmounted.

Using an `unmounted` variable: https://stackoverflow.com/questions/53861916/canceling-an-axios-rest-call-in-react-hooks-useeffects-cleanup-failing

## Create React App

https://create-react-app.dev/docs/advanced-configuration

Prevent automatically open browser on 'yarn start': `"start": "BROWSER=none react-scripts start"`

## Imports

Correct:

```js
import { useState } from 'react'
import * as React from 'react'
```

Not correct: `import React from 'react'`

See https://twitter.com/dan_abramov/status/1308739731551858689

Also, the new JSX transform: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

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

## UI design libraries

See comparison: https://chakra-ui.com/getting-started/comparison

Chakra UI: https://chakra-ui.com/ - https://github.com/chakra-ui/chakra-ui. Uses Emotion - see https://chakra-ui.com/getting-started/comparison#the-runtime-trade-off-%EF%B8%8F.

Ant Design: https://ant.design/ - https://github.com/ant-design/ant-design/. Uses Less - see https://ant.design/docs/react/use-with-create-react-app#Customize-Theme.

Material UI and Joy UI: https://mui.com/ - https://github.com/mui/material-ui.

## TypeScript

[React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)

See examples at https://fettblog.eu/typescript-react-component-patterns

### Children

```ts title=Children.tsx
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
