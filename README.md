# albert.wiki

## Develop

Run `yarn start`, then open http://localhost:3000/.

## Git pre-commit hook to run Prettier, ESLint and TypeScript checks on every commit

To run Prettier and ESLint on every commit, run `cp pre-commit .git/hooks`.

Note that the checks do not abort the commit, they only inform you of any issues found.
