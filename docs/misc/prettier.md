---
title: Prettier
---

https://prettier.io/docs/en/install.html

```
npm install --save-dev --save-exact prettier

echo {}> .prettierrc.json

touch .prettierignore
```

> Tip! Base your .prettierignore on .gitignore and .eslintignore.

Note that it ignores files located in `node_modules` directory - [docs](https://prettier.io/docs/en/cli.html#--with-node-modules)

Run: `npx prettier --write .`

Check: `npx prettier --check .`
