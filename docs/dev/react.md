---
title: React
---

## Lifecycle

https://twitter.com/dan_abramov/status/981712092611989509

https://imgur.com/bmfcRQm

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/


## Create React App

https://create-react-app.dev/docs/advanced-configuration

Prevent automatically open browser on 'yarn start': `"start": "BROWSER=none react-scripts start"`



# Inputs

```
<textarea
  type='text'
  value={text}
  placeholder='Type'
  onChange={(e) => setText(e.target.value)}
/>
```

```
<input
  type='text'
  value={text}
  placeholder='New Todo'
  onChange={(e) => setText(e.target.value)}
/>
```
