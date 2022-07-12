---
title: React
---

## Lifecycle

https://twitter.com/dan_abramov/status/981712092611989509

https://imgur.com/bmfcRQm

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

## Cancel async operations done in useEffect

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

### Examples

<!-- prettier-ignore -->
```tsx
<Button Icon={IconAddUser} />

function Button({ Icon }: { Icon: React.ComponentType<any> }) {
  return (
    <Pressable>
      <Icon />
    </Pressable>
  )
}
```
