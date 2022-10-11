---
title: Cypress
---

https://docs.cypress.io

Install: `npm install cypress --save-dev` or `yarn add cypress --dev`

https://docs.cypress.io/guides/getting-started/installing-cypress

Open:

```
./node_modules/.bin/cypress open
npx cypress open
yarn run cypress open
```

Script to open: in package.json "scripts" section add `"cypress:open": "cypress open"`. Run it with `npm run cypress:open`.

Run all tests: `cypress run`. Add `"cypress:run": "cypress run"` to package.json

baseUrl: Add `"baseUrl": "http://localhost:8080"` to cypress.json. It will be used as a prefix in `cy.visit()`

## Example repositories

- Sample app (React): https://github.com/cypress-io/cypress-realworld-app
- https://github.com/guardian/gateway/tree/main/cypress
- https://github.com/guardian/dotcom-rendering/tree/main/dotcom-rendering/cypress
- https://github.com/AJarombek/saints-xctf-web/tree/master/cypress
