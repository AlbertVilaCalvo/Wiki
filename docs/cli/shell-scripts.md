---
title: Shell Scripts
---

Google Shell Style Guide: https://google.github.io/styleguide/shellguide.html

Bash Reference Manual: https://www.gnu.org/software/bash/manual/html_node/index.html

Pure bash snippets: https://github.com/dylanaraps/pure-bash-bible

Reusable Bash functions: https://github.com/gruntwork-io/bash-commons

Bash Guide: https://mywiki.wooledge.org/BashGuide - New version: https://guide.bash.academy - https://github.com/lhunath/guide.bash.academy

## If statement

https://stackoverflow.com/questions/669452/are-double-square-brackets-preferable-over-single-square-brackets-in-b

https://stackoverflow.com/questions/3427872/whats-the-difference-between-and-in-bash

## Ternary operator

```shell
[[ $b = 5 ]] && a="$c" || a="$d"
a=$([ "$b" == 5 ] && echo "$c" || echo "$d")
```

## Check if directory exists

```shell
if [ -d src/app ]; then
  echo "Directory exists"
else
  mkdir src/app
fi
```

https://stackoverflow.com/questions/59838/how-do-i-check-if-a-directory-exists-or-not-in-a-bash-shell-script

## Check if environment variable is set

```shell
if [[ -z $ENVIRONMENT ]]; then
  echo "ENVIRONMENT is empty"
else
  echo "ENVIRONMENT is set to '$ENVIRONMENT'"
fi
```

https://stackoverflow.com/questions/39296472/how-to-check-if-an-environment-variable-exists-and-get-its-value

## Arguments

- `$@` stores all the arguments in a list of string
- `$*` stores all the arguments as a single string
- `$#` stores the number of arguments

https://stackoverflow.com/questions/9994295/what-does-mean-in-a-shell-script

https://stackoverflow.com/questions/3898665/what-is-in-bash

https://stackoverflow.com/questions/2761723/what-is-the-difference-between-and-in-shell-scripts

https://stackoverflow.com/questions/3008695/what-is-the-difference-between-and-in-bash

## Input

```shell
echo "Enter your name"
read name
```

```shell
read -p "Enter your name" name
```

https://stackoverflow.com/questions/18544359/how-do-i-read-user-input-into-a-variable-in-bash

## Parameter expansion

https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html

https://stackoverflow.com/questions/2642585/read-a-variable-in-bash-with-a-default-value

```shell
read -p "Enter your name" name
name=${name:-Peter}
```
