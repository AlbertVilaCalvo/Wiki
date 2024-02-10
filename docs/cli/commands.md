---
title: Commands
---

tldr man pages: https://tldr.sh

https://en.wikipedia.org/wiki/List_of_POSIX_commands

Bash Reference Manual: https://www.gnu.org/software/bash/manual/html_node/index.html

The Art of Command Line: https://github.com/jlevy/the-art-of-command-line

Pure bash snippets: https://github.com/dylanaraps/pure-bash-bible

Reusable Bash functions: https://github.com/gruntwork-io/bash-commons

Bash Guide: https://mywiki.wooledge.org/BashGuide - New version: https://guide.bash.academy - https://github.com/lhunath/guide.bash.academy

zsh is the default shell in macOS since Catalina (10.15, released October 2019) - see https://support.apple.com/kb/HT208050

https://github.com/trimstray/the-book-of-secret-knowledge#shell-one-liners-toc

Oh-heck, a terminal command for when you forget other terminal commands - https://news.ycombinator.com/item?id=30720834 - https://oh-heck.dev

Command history is saved in `~/.zsh_history`.

Advanced macOS Command-Line Tools - https://saurabhs.org/advanced-macos-commands

## Terminal shortcuts

- Ctrl + R: Recall
  - Ctrl + R again to see next match
  - Return to execute
  - Ctrl + G to exit without executing
  - Esc to exit but leaving searched command
- Ctrl + Z: send to the background

## Various commands & tips

```shell
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

```shell
touch index.{js,css} # creates index.js and index.css
touch {P,H1,H2}.tsx # creates P.tsx, H1.tsx and H2.tsx
```

You can also use this with npm: https://twitter.com/nucliweb/status/1096327937308135425

## Command substitution

https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html

```shell
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

## Aliases

On your `.zshrc` or `.bash_profile` put:

```shell
alias l='ls -la'
```

## cd

```shell
cd # Go to user's home (~). You can also do 'cd ~'
cd - # Go to the previous directory
cd / # Go to the root directory
cd ~username # Go to the user's root directory
```

## cp

```shell
cp -r dir1 dir2 # Recursively
```

## mv

```shell
mv file.txt dir
```

## rm

```shell
rm -r dir # Recursive is required to delete a directory
```

## mkdir / rmdir

```shell
mkdir -p dir1/dir2/dir3 # With -p if dir1 and dir2 don't exist, it creates them
rmdir -p dir1/dir2/dir3 # With -p it removes dir1 and dir2 too
```

## touch

Either updates the access or modification date of a file, or creates an empty file if it doesn't exist.

Useful to create locks, eg to avoid multiple editing or access. See https://unix.stackexchange.com/questions/109003/what-are-the-legitimate-uses-of-the-touch-command

## echo

```shell
echo "Java home is $JAVA_HOME"
echo "something" >> file.txt # Appends
echo "something" > file.txt # OVERWRITES ALL FILE CONTENT
echo -n "abc" # Do not add a newline (at the end)
```

## cat

Backup some file before modifying it, just in case:

```shell
cat file.txt > file-backup.txt # Equivalent to 'cp file.txt file-backup.txt'
```

## less

If the file is big is better use `less` not `cat`.

```shell
less file.txt
```

Use `/Whatever` for searching.

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
