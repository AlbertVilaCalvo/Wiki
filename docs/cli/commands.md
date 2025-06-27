---
title: Commands
---

tldr man pages: https://tldr.sh

List of POSIX commands: https://en.wikipedia.org/wiki/List_of_POSIX_commands

The Art of Command Line: https://github.com/jlevy/the-art-of-command-line

Shell One-liners: https://github.com/trimstray/the-book-of-secret-knowledge#shell-one-liners-toc

Introduction to the Command Line - https://shop.fsf.org/books-docs/introduction-command-line (can be downloaded as PDF)

Oh-heck, a terminal command for when you forget other terminal commands - https://news.ycombinator.com/item?id=30720834 - https://oh-heck.dev

Advanced macOS Command-Line Tools: https://saurabhs.org/advanced-macos-commands

Use the GNU tools instead fo the macOS: https://ryanparman.com/posts/2019/using-gnu-command-line-tools-in-macos-instead-of-freebsd-tools/

## Misc

zsh is the default shell in macOS since Catalina (10.15, released October 2019) - see https://support.apple.com/kb/HT208050

Command history is saved in `~/.zsh_history`. You can run `history` to print it.

## Terminal shortcuts

- Ctrl + R: Recall
  - Ctrl + R again to see next match
  - Return to execute
  - Ctrl + G to exit without executing
  - Esc to exit but leaving searched command
- Ctrl + Z: send to the background

## `&` to run in the background

From https://manpages.org/bash

> If a command is terminated by the control operator &, the shell executes the command in the background in a subshell. The shell does not wait for the command to finish, and the return status is 0.

https://unix.stackexchange.com/questions/86247/what-does-ampersand-mean-at-the-end-of-a-shell-script-line

## `nohup` to continue running when you close the shell

https://en.wikipedia.org/wiki/Nohup

Means "no hang up".

Is usually combined with `&`, like this: `nohup command &`. Together, you can use it to run a web server indefinitely, for example.

## Tips

- !!: run the previous command
- What shell is used: `echo $SHELL`. Prints `/bin/bash` or `/bin/zsh`

Command-line pro tips: https://twitter.com/addyosmani/status/1264854298799665152

Use curly braces in the command-line to quickly create multiple related files with less typing [source](https://twitter.com/addyosmani/status/1265693572033961984):

```shell
touch index.{js,css} # creates index.js and index.css
touch {P,H1,H2}.tsx # creates P.tsx, H1.tsx and H2.tsx
```

You can also use this with npm: https://twitter.com/nucliweb/status/1096327937308135425

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
rm -r * # Remove all files in current directory, except hidden files
rm -r * .* # Remove all files in current directory, including hidden files
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

You can combine `cat` with heredoc to create a multiline file:

```shell
cat << EOF > pod.yml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  namespace: ckad-prep
spec:
  containers:
  - image: nginx:1.15.12
    name: mypod
    ports:
    - containerPort: 80
EOF
```

You can also use `tee` for this, see https://stackoverflow.com/questions/2953081/how-can-i-write-a-heredoc-to-a-file-in-bash-script

Use `cat /proc/cpuinfo` to display CPU information on a EC2 instance.

## less

If the file is big is better use `less` not `cat`.

```shell
less file.txt
```

Use `/Whatever` for searching.

## find

`find . -type d -name "build"`

`find . -type d -name "build" -exec rm -rf {} +`

`find . -type f -name ".DS_Store" -exec rm -rf {} +`

`find . -type f -name "*.iml"`

`find . -type f -name "*.iml" -exec rm -rf {} +`

Exclude: `find . -type d -name "dist" | grep -v 'node_modules'`

Count files and directories:

```shell
find . -type f | wc -l
find . -type d | wc -l
```

See user-friendly alternative `fd` - https://github.com/sharkdp/fd

## diff

```shell
diff -qr Dir1 Dir2

# Exclude directories
diff -qr Dir1 Dir2 --exclude=.git --exclude=node_modules
```

## tree

````shell
tree # current folder
tree somefolder
tree -a # print hidden files too
tree --gitignore # filters files and directories using .gitignore files
tree -a | grep directories | grep files # just print the number of files and directories
```

To ignore something (eg a folder) use `-I <wild-card-pattern>`. Eg `tree -I node_modules` or `tree -I venv`. There can be multiple -I options.

## fc

`fc [-e ename] [-lnr] [first] [last]`

`fc -s [pat=rep] [command]`

https://www.geeksforgeeks.org/fc-command-linux-examples

List recent commands in history: `fc -l`

## lsof

If we are running a server at (eg) port 3000 we can do `lsof -i :3000` and it will print information about the process that started the server. Doing `lsof -t -i :5000` gives the process id. Hence, to kill the process you can do `kill -9 $(lsof -t -i :3000)`.

## free

Prints information about the machine's memory. You can use it on a EC2 instance.

```shell
free -m
```

Output:

```
              total        used        free      shared  buff/cache   available
Mem:           3856        1024        2012          64         819         2549
Swap:          2047           0        2047
```

See [What is available memory while using free command?](https://askubuntu.com/questions/867068/what-is-available-memory-while-using-free-command), [What is available and free memory in response of free command on Linux?](https://stackoverflow.com/questions/41426656/what-is-available-and-free-memory-in-response-of-free-command-on-linux) and https://www.linuxatemyram.com.

## at

To schedule tasks in the future.

```shell
echo "command_to_be_run" | at 09:00
echo "command_to_be_run" | at now + 10 minutes
```

Example: terminate EC2 instance at N minutes: https://github.com/AWSinAction/code3/blob/e8131b2a740d22cd5d487aa30d242336421c496e/chapter05/ec2-iam-role.yaml#L111

## sed

On macOS, don't bother to try to use the built-in `sed`, since you get the error _'sed: 1: "eas.json": invalid command code e'_ all the time. Use GNU sed instead, as [advised here](https://stackoverflow.com/a/60562182/4034572). Install it with `brew install gnu-sed`. Then use `gsed` instead of `sed`, or alias it with `alias sed='gsed'`, or add it to the path with `PATH="/opt/homebrew/opt/gnu-sed/libexec/gnubin:$PATH"`.

https://www.gnu.org/software/sed

Manual: https://www.gnu.org/software/sed/manual/sed.html

Replace value in file:

```shell
sed -i "s/THE_VALUE/some_value/" file.txt
sed -i "s/THE_VALUE/$SOME_VAR/" file.txt
```

`s` means substitute. See [The `s` Command](https://www.gnu.org/software/sed/manual/sed.html#The-_0022s_0022-Command) for more options.

Another example. If we have:

```ts
const a = {
  version: '0.0.1',
}
```

We can do:

```shell
sed -i "s|version: '.*'|version: '$VERSION'|" file.ts
```

### sed: -e expression #1, char 19: unknown option to `s'

Beware that if the interpolated value contains a `/` (eg a URL or a path) it will fail with:

```
sed: -e expression #1, char 19: unknown option to `s'
```

See:

- https://stackoverflow.com/questions/9366816/sed-fails-with-unknown-option-to-s-error
- https://stackoverflow.com/questions/24705650/sed-unknown-option-to-s-in-bash-script

Since **you can use any delimiter**, to fix it do for example:

```shell
sed -i "s|THE_VALUE|$SOME_VAR|" file.txt
```
