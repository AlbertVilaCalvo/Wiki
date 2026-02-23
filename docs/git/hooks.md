---
title: Git Hooks
sidebar_label: Hooks
---

Customizing Git - Git Hooks: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks

Prettier docs show a few options: https://prettier.io/docs/en/precommit.html

Why We Abandoned Git Hooks for Quality Gating (and What We Use Instead) - https://iaindavis.dev/blog/2025/06/17/2025-06-17-why-i-backed-away-from-githooks/why-i-backed-away-from-githooks/

> In practice, Git hooks can fall short, and create a frustrating drag on DevX
>
> With all of that in mind, we've arrived at the following strategy.
>
> - Code changes live in two states: vetted and unvetted
> - The boundary between these states exists only in the origin repository on GitHub, and is the boundary between a feature branch and a trunk branch (`develop`)
> - The boundary between `local` and `remote` is irrelevant for the purposes of vetting code changes
> - The PR is the sole quality gate between feature branches and trunk branches
> - branch protection rules protect canonical branches on `origin`
> - any checks in the local environment are advisory only and do not prevent commits/pushes
> - we will rely on the developer to use other tools (like the `--watch` flag in vitest) to provide ongoing or periodic feedback on quality checks, as needed.

## Apply a git hook to all repositories

https://git-scm.com/docs/git-config#Documentation/git-config.txt-corehooksPath

```shell
git config --global core.hooksPath ~/githooks
```

https://stackoverflow.com/questions/2293498/applying-a-git-post-commit-hook-to-all-current-and-future-repositories

https://stackoverflow.com/questions/1977610/change-default-git-hooks

## pre-commit hook

Inspired by https://stackoverflow.com/questions/57591839/how-to-commit-git-hooks and https://prettier.io/docs/en/precommit.html#option-5-shell-script

This setup allows to have the pre-commit hook on version control.

Setup:

```shell
mkdir git-hooks
echo "#\!/bin/sh" > git-hooks/pre-commit
# Fill the file git-hooks/pre-commit with some validation code
chmod +x git-hooks/pre-commit
cp git-hooks/pre-commit .git/hooks
```

Every time we update the pre-commit hook we need to run `cp git-hooks/pre-commit .git/hooks`.

Example of pre-commit hook that runs Prettier, ESLint and tsc:

```shell
#!/bin/bash

# Runs Prettier on ts/tsx/js/jsx/md/yml/yaml/css/json files, and ESLint and tsc on ts/tsx/js/jsx files.
# Prettier and ESLint only check the committed files, whereas tsc checks all project files, since it's not possible to
# run tsc on specific files while obeying the tsconfig.json options (see
# https://github.com/microsoft/TypeScript/issues/27379 and https://www.npmjs.com/package/tsc-files).
# This hook always commits, even if errors are found. And it does not modify the files (ie it does not do `prettier
# write`), it only checks if there is any issue and reports it.
# Inspired by https://prettier.io/docs/en/precommit.html#option-6-shell-script

# Validate that pre-commit and .git/hooks/pre-commit have the same content.
# If content is not the same, do not commit.
diff pre-commit .git/hooks/pre-commit > /dev/null
if [ $? = 1 ]
then
  echo "Error: pre-commit and .git/hooks/pre-commit have different content."
  echo "Commit aborted."
  echo "To fix this run: cp pre-commit .git/hooks"
  exit 1
fi

get_staged_files() {
  ALL_FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g' | awk '/\.ts$|\.tsx$|\.js$|\.jsx$|\.mjs$|\.md$|\.yml$|\.yaml$|\.css$|\.json$/')
  CODE_FILES=$(echo "$ALL_FILES" | awk '/\.ts$|\.tsx$|\.js$|\.jsx$|\.mjs$/')
}

print_title() {
  printf "\n\n🔍 %s\n\n" "$1"
}

print_result() {
  ERROR_CODE=$?
  if [ $ERROR_CODE -eq 0 ]; then
    printf "\n✅ %s Success\n\n" "$1"
  else
    printf "\n❌ %s Failure\n\n" "$1"
  fi
}

get_staged_files

printf "📁 Files\n\n%s" "$ALL_FILES"
[ -z "$ALL_FILES" ] && exit 0

print_title "Prettier"
echo "$ALL_FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --check
print_result "Prettier"

[ -z "$CODE_FILES" ] && exit 0

print_title "ESLint"
echo "$CODE_FILES" | xargs ./node_modules/.bin/eslint
print_result "ESLint"

print_title "tsc"
npx tsc --noEmit
print_result "tsc"

exit 0
```

<details>
  <summary>Old version. Does not format md/css/json files.</summary>

```shell
#!/bin/bash

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
    printf "\n✅ %s Success\n\n" "$1"
  else
    printf "\n❌ %s Failure\n\n" "$1"
  fi
}

FILES=$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\ |g' | awk '/\.ts$|\.tsx$|\.js$/')

printf "📁 Files\n\n%s" "$FILES"

[ -z "$FILES" ] && exit 0

printf "\n\n🔍 Prettier\n\n"
echo "$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --check
print_result "Prettier"

printf "\n🔍 ESLint\n"
echo "$FILES" | xargs ./node_modules/.bin/eslint
print_result "ESLint"

printf "\n🔍 tsc\n"
npx tsc --noEmit
print_result "tsc"

exit 0
```

</details>

## pre-commit framework

https://pre-commit.com

https://github.com/antonbabenko/pre-commit-terraform

## lint-staged

https://github.com/lint-staged/lint-staged

`.husky/pre-commit` is always the same:

```shell
#!/bin/bash
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

We can [run multiple commands](https://github.com/lint-staged/lint-staged#running-multiple-commands-in-a-sequence), one after another, using an array:

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

```shell
#!/bin/bash
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

## commitlint - Lint commit messages

https://commitlint.js.org

https://github.com/conventional-changelog/commitlint
