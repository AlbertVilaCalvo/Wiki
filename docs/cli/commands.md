---
title: Commands
---

tldr man pages: https://tldr.sh

Bash Reference Manual: https://www.gnu.org/software/bash/manual/html_node/index.html

The Art of Command Line: https://github.com/jlevy/the-art-of-command-line

Pure bash snippets: https://github.com/dylanaraps/pure-bash-bible

Reusable Bash functions: https://github.com/gruntwork-io/bash-commons

Bash Guide: https://mywiki.wooledge.org/BashGuide - New version: https://guide.bash.academy - https://github.com/lhunath/guide.bash.academy

zsh is the default shell in macOS since Catalina (10.15, released October 2019) - see https://support.apple.com/kb/HT208050

https://github.com/trimstray/the-book-of-secret-knowledge#shell-one-liners-toc

Oh-heck, a terminal command for when you forget other terminal commands - https://news.ycombinator.com/item?id=30720834 - https://oh-heck.dev

Command history is saved in `~/.zsh_history`.

## Terminal shortcuts

- Ctrl + R: Recall
  - Ctrl + R again to see next match
  - Return to execute
  - Ctrl + G to exit without executing
  - Esc to exit but leaving searched command
- Ctrl + Z: send to the background

## Various commands & tips

```bash
# set environment variable
NODE_ENV=production

# unset environment variable
unset NODE_ENV
```

- !!: run the previous command
- What shell is used: `echo $SHELL`
- List all environment variables: `printenv`. You can also print a specific envar: `printenv ANDROID_HOME`. (In Linux you can print many, eg `printenv ANDROID_HOME PATH`, but does not work in macOS.)

Command-line pro tips: https://twitter.com/addyosmani/status/1264854298799665152

Use curly braces in the command-line to quickly create multiple related files with less typing [source](https://twitter.com/addyosmani/status/1265693572033961984):

```bash
touch index.{js,css} # creates index.js and index.css
touch {P,H1,H2}.tsx # creates P.tsx, H1.tsx and H2.tsx
```

You can also use this with npm: https://twitter.com/nucliweb/status/1096327937308135425

## Command substitution

https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html

```shell
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

## find

`find . -type d -name "build"`

`find . -type d -name "build" -exec rm -rf {} +`

`find . -type f -name "*.iml"`

`find . -type f -name "*.iml" -exec rm -rf {} +`

Exclude: `find . -type d -name "dist" | grep -v 'node_modules'`

## diff

`diff -qr Carpeta1 Carpeta2`

## tree

`tree somefolder`

To ignore something (eg a folder) use `-I <wild-card-pattern>`. Eg `tree -I node_modules` or `tree -I venv`. There can be multiple -I options.

## fc

`fc [-e ename] [-lnr] [first] [last]`

`fc -s [pat=rep] [command]`

https://www.geeksforgeeks.org/fc-command-linux-examples

List recent commands in history: `fc -l`

## lsof

If we are running a server at (eg) port 3000 we can do `lsof -i :3000` and it will print information about the process that started the server. Doing `lsof -t -i :5000` gives the process id. Hence, to kill the process you can do `kill -9 $(lsof -t -i :3000)`.
