---
title: Nx
---

https://nx.dev

Nx Cloud: https://nx.app

Webinars: https://nx.dev/webinar

Good intro video: https://www.youtube.com/watch?v=E188J7E_MDU

https://dev.to/this-is-learning/architects-delight-enforcing-layers-and-project-boundaries-with-nx-2d8o

## 3 different ways to use Nx

https://nx.dev/getting-started/intro

https://nx.dev/concepts/integrated-vs-package-based

```
$ npx create-nx-workspace@latest

? Choose what to create
Package-based monorepo:   Nx makes it fast, but lets you run things your way.
Integrated monorepo:      Nx configures your favorite frameworks and lets you focus on shipping features.
Standalone React app:     Nx configures a React app with an optional framework (e.g. Next.js).
Standalone Angular app:   Nx configures Jest, ESLint and Cypress.
Standalone Node app:      Nx configures a framework (e.g. Express), esbuild, ESlint and Jest.
```

### Package-based monorepo

https://nx.dev/tutorials/package-based-repo-tutorial

Add Nx on top of a npm/yarn/pnpm workspace - https://nx.dev/recipes/adopting-nx/adding-to-monorepo

### Integrated monorepo

https://nx.dev/tutorials/integrated-repo-tutorial

### Standalone app

For a single app, not a monorepo with multiple apps. To modularize an app into packages/libraries/submodules.

Nice explanation: https://www.youtube.com/watch?v=qEaVzh-oBBc

Notice there's no `app` directory, but a `src` directory.

## TypeScript Project References

New NPM/Yarn/PNPM/Bun workspaces-based setup combined with TypeScript project references that is an improvement over the current TypeScript alias based setup.

- Everything You Need to Know About TypeScript Project References - https://nx.dev/blog/typescript-project-references
- Managing TypeScript Packages in Monorepos - https://nx.dev/blog/managing-ts-packages-in-monorepos
- A New Nx Experience for TypeScript Monorepos and Beyond - https://nx.dev/blog/new-nx-experience-for-typescript-monorepos

> Going forward, the recommended approach is to use NPM, Yarn, PNPM, or Bun workspaces combined with TypeScript project references. This setup integrates more seamlessly with modern tooling and can potentially lead to a more performant setup.

## Editor Extensions

VSCode: https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console

JetBrains:

- Official: https://plugins.jetbrains.com/plugin/21060-nx-console
- https://plugins.jetbrains.com/plugin/15101-nx-console-idea
- https://plugins.jetbrains.com/plugin/15000-nx-console-ui

## Examples

- https://github.com/streetwriters/notesnook
- https://github.com/openops-cloud/openops
- https://github.com/aws-containers/retail-store-sample-app - Contains Go, Node, Java...
