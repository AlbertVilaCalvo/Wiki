# [albert.wiki](https://albert.wiki) - My personal Wiki

My software development knowledge base.

## Develop

Install the packages with `yarn install`, then run `yarn start` and open http://localhost:3000/.

## Run ESLint manually

```
npx eslint . --ext ts --ext tsx --ext js
```

## Git pre-commit hook to run Prettier, ESLint and TypeScript

To run Prettier, ESLint and TypeScript checks on every commit, run `cp pre-commit .git/hooks`.

Note that the checks do not abort the commit, they only inform you of any issues found.
