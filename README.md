# [albert.wiki](https://albert.wiki) - My personal Wiki

My software development knowledge base.

## Develop

Install the packages with `npm install`, then run `npm start` and open http://localhost:3000/.

## Run ESLint manually

```
npm run eslint
```

## Git pre-commit hook to run Prettier, ESLint and TypeScript

To run Prettier, ESLint and TypeScript checks on every commit, run `cp pre-commit .git/hooks`.

Note that the checks do not abort the commit, they only inform you of any issues found.

## Upgrade packages

Docusaurus: http://localhost:3000/dev/docusaurus#upgrade

ESLint packages: `npm i -D -E @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest eslint@latest eslint-plugin-react@latest`
