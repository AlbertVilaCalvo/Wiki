---
title: Git Hooks
---

Prettier docs show a few options: https://prettier.io/docs/en/precommit.html


## pre-commit hook

Inspired by https://stackoverflow.com/questions/57591839/how-to-commit-git-hooks and https://prettier.io/docs/en/precommit.html#option-5-shell-script

This setup allows to have the pre-commit hook on version control.

Setup:

```bash
mkdir git-hooks
echo "#\!/bin/sh" > git-hooks/pre-commit
# Fill the file git-hooks/pre-commit with some validation code
chmod +x git-hooks/pre-commit
cp git-hooks/pre-commit .git/hooks
```

Every time we update the pre-commit hook we need to run `cp git-hooks/pre-commit .git/hooks`.

Example of pre-commit hook that checks Prettier and ESLint:

```bash
#!/bin/sh

# Runs Prettier and ESLint on .ts/.tsx/.js files. Only checks the committed files.
# Always commits (never aborts, even with errors), and does not modify the files (ie
# does not do `prettier write`), just checks them.
# Inspired by https://prettier.io/docs/en/precommit.html#option-5-shell-script

FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g' | awk '/\.ts$|\.tsx$|\.js$/')

printf "📁 Files\n\n%s" "$FILES"

[ -z "$FILES" ] && exit 0

printf "\n\n🔍 Prettier\n\n"
echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --check

printf "\n🔍 ESLint\n"
echo "$FILES" | xargs ./node_modules/.bin/eslint
printf "ESLint check done\n\n"

exit 0
```


## lint-staged

https://github.com/okonet/lint-staged

`.husky/pre-commit` is always the same:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

Then in `package.json` we specify the commands:

```json
"lint-staged": {
  "*.js": "eslint --cache --fix",
  "*.{js,css,md}": "prettier --write"
}
```

We can [run multiple commands](https://github.com/okonet/lint-staged/#running-multiple-commands-in-a-sequence), one after another, using an array:

```json
"lint-staged": {
  "*.{js,ts,tsx}": [
    "prettier",
    "eslint"
  ]
}
```


## Husky

https://typicode.github.io/husky/#/

Add scripts at `package.json`:

```json
"scripts": {
  "prettier-check": "prettier --check .",
  "eslint-check": "eslint . --ext ts --ext tsx --ext js"
}
```

Then in `.husky/pre-commit` we can have:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run prettier-check ||
(
    echo 'Prettier check failed. Run 'npx prettier --write .', add changes and try to commit again.';
    false;
)

echo '✅ Success :) ✅'
```

[source blog](https://blog.jarrodwatts.com/nextjs-eslint-prettier-husky), [source video](https://www.youtube.com/watch?v=sH93pQb9bWM)

Note that we can also put hooks in `package.json`:

```json
"scripts": {
  "lint": "eslint src/**/*.js",
  "lint:fix": "eslint --fix src/**/*.js",
},
"husky": {
  "hooks": {
    "pre-commit": "npm run lint:fix",
    "pre-push": "npm run lint"
  }
},
```
