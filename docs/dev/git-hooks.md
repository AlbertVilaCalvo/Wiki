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

# Runs Prettier, ESLint and tsc on .ts, .tsx and .js files (not .md nor .json files). Prettier and ESLint only check the
# committed files, whereas tsc checks all project files, since it's not possible to run tsc on specific files while
# obeying the tsconfig.json options (see https://github.com/microsoft/TypeScript/issues/27379 and
# https://www.npmjs.com/package/tsc-files).
# This hook always commits, even if errors are found. And it does not modify the files (ie it does not do `prettier
# write`), it only checks if there is any issue and reports it.
# Inspired by https://prettier.io/docs/en/precommit.html#option-6-shell-script

print_result() {
  ERROR_CODE=$?
  if [ $ERROR_CODE -eq 0 ]; then
    printf "✅ %s Success\n\n" "$1"
  else
    printf "❌ %s Failure\n\n" "$1"
  fi
}

FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g' | awk '/\.ts$|\.tsx$|\.js$/')

printf "📁 Files\n\n%s" "$FILES"

[ -z "$FILES" ] && exit 0

printf "\n\n🔍 Prettier\n\n"
echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --check
printf "\n"
print_result "Prettier"

printf "\n🔍 ESLint\n"
echo "$FILES" | xargs ./node_modules/.bin/eslint
print_result "ESLint"

printf "\n🔍 tsc\n"
npx tsc --noEmit
print_result "tsc"

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
