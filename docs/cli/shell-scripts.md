---
title: Shell Scripts
---

https://www.shellcheck.net - finds bugs in your shell scripts

Google Shell Style Guide: https://google.github.io/styleguide/shellguide.html

Bash Reference Manual: https://www.gnu.org/software/bash/manual/html_node/index.html

Pure bash snippets: https://github.com/dylanaraps/pure-bash-bible

Reusable Bash functions: https://github.com/gruntwork-io/bash-commons

Bash Guide: https://mywiki.wooledge.org/BashGuide - New version: https://guide.bash.academy - https://github.com/lhunath/guide.bash.academy

https://github.com/sandervanvugt/bash-scripting - https://learning.oreilly.com/course/bash-shell-scripting/9780137689064/

## Run script

You can run a non-executable script with `bash myscript.sh`. To run it with `./myscript.sh` you need to make it executable first:

```shell
chmod +x myscript.sh
```

## Shebang

`#!/bin/bash` or `#!/usr/bin/env bash`

:::info
`sh` is not `bash`, so don't use `#!/bin/sh`

> Please do not be fooled by scripts or examples on the Internet that use `/bin/sh` as the interpreter. `sh` is not `bash`! Bash itself is a "sh-compatible" shell (meaning that it can run most 'sh' scripts and carries much of the same syntax) however, the opposite is not true; some features of Bash will break or cause unexpected behavior in `sh`.

[source](https://mywiki.wooledge.org/BashGuide/CommandsAndArguments#Scripts)
:::

Bash is the default shell in Linux, whereas zsh is the default in macOS. And we may be using another shell (run `echo $SHELL` to know which). Every shell comes with a specific feature set. Bash features might not exist in other shells. To ensure that we run the scripts with bash, we add the shebang on the first line.

What is the preferred Bash shebang ("#!")? - https://stackoverflow.com/questions/10376206/what-is-the-preferred-bash-shebang

## Internal Commands and Builtins

Some commands are built in, for performance or other reasons.

- Internal Commands and Builtins - https://tldp.org/LDP/abs/html/internal.html
- Bash Builtin Commands - https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html

You can list them with the `help` command. (On a Mac, since zsh is the default shell, run `bash` and then `shell`.)

If you run `type <builtin>` (eg `type alias`) it says "alias is a shell builtin".

## Subshell

Bash scripts run in a subshell. It's a local scope, an isolated environment with its own variables. It's a child process (or subprocess) that allows parallel execution of tasks.

What is a Subshell? - https://bash.cyberciti.biz/guide/What_is_a_Subshell%3F

Subshells - https://tldp.org/LDP/abs/html/subshells.html

What are all the ways to create a subshell in bash? - https://unix.stackexchange.com/questions/358850/what-are-all-the-ways-to-create-a-subshell-in-bash

Is `$()` a subshell? - https://unix.stackexchange.com/questions/442692/is-a-subshell/442704#442704

Do parentheses really put the command in a subshell? - https://unix.stackexchange.com/questions/138463/do-parentheses-really-put-the-command-in-a-subshell

## Variables

List all environment variables: `printenv` or `env`. See [What is the difference between 'env' and 'printenv'?](https://unix.stackexchange.com/questions/123473/what-is-the-difference-between-env-and-printenv/284069). You can also print a specific envar: `printenv ANDROID_HOME`. In Linux you can print many (eg `printenv ANDROID_HOME PATH`) but this does not work in macOS (it only prints the first one).

```shell
# set variable
color="red"

# set environment variable in the current shell and all subshells
export TF_VAR_vpc_cidr_block="10.0.0.0/16"

# unset environment variable
unset NODE_ENV
```

Use `export` to make a variable available to a subshell:

```shell title="hi.sh"
echo name: $name
echo age: $age
```

```shell
name=Peter
export age=30
bash hi.sh
# name:
# age: 30
```

Use `local` to make a variable scoped only to a function:

```shell
hi() {
  name=Peter
  local age=30
}
hi
echo "name: $name"
# name: Peter
echo "age: $age"
# age:
```

[Defining a variable with or without export](https://stackoverflow.com/questions/1158091/defining-a-variable-with-or-without-export)

[What is the difference between env, setenv, export and when to use?](https://unix.stackexchange.com/questions/368944/what-is-the-difference-between-env-setenv-export-and-when-to-use)

[What is the difference between set, env, declare and export when setting a variable in a Linux shell?](https://superuser.com/questions/821094/what-is-the-difference-between-set-env-declare-and-export-when-setting-a-varia)

## stdin, stdout and stderr

https://en.wikipedia.org/wiki/Standard_streams

https://www.gnu.org/software/bash/manual/html_node/Redirections.html

https://tldp.org/LDP/abs/html/io-redirection.html

- stdin: the keyboard
- stdout: the screen
- stderr: error messages output to the screen

Use `2>&1` to redirect both stdout and stderr to the same destination ([source](https://stackoverflow.com/questions/876239/how-to-redirect-and-append-both-standard-output-and-standard-error-to-a-file-wit)):

```shell
$command > file.txt 2>&1 # overwrite or create
$command >> file.txt 2>&1 # append or create
```

Both display output in the terminal and save it to a file:

```shell
docker compose up --build 2>&1 | tee docker.log
```

To suppress use ([source](https://stackoverflow.com/a/51045329/4034572)):

- `> /dev/null` throw away stdout
- `1> /dev/null` throw away stdout
- `2> /dev/null` throw away stderr
- `&> /dev/null` throw away both stdout and stderr

For example, to suppress an error:

```shell
API_URL=$(terraform output -raw website_cloudfront_domain_name 2>/dev/null)
OUTPUT_CODE=$?
```

## `set`

```shell
set -euo pipefail # Exit on error, unset variable, or pipe failure
```

Set or unset values of shell options and positional parameters.

https://linuxcommand.org/lc3_man_pages/seth.html

https://pubs.opengroup.org/onlinepubs/9699919799.2018edition/utilities/V3_chap02.html#set

http://redsymbol.net/articles/unofficial-bash-strict-mode/

https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425

- `set -e` or `set -o errexit`. Exit on error. _Exit immediately if a command exits with a non-zero status._
- `set -u` or `set -o nounset`. Error when using undefined variables, for example to catch typos. _Treat unset variables as an error when substituting._
- `set -o pipefail`. Avoid swallowing errors in pipelines (`|`). _The return value of a pipeline is the status of the last command to exit with a non-zero status, or zero if no command exited with a non-zero status._

An option can be temporarily disabled and re-enabled. For example, if a command exits with non-zero status and we don't want to exit:

```shell
set +e # Temporarily disable exit on error
terraform plan -detailed-exitcode -out=tfplan # Exit code is 2 if there are changes
local tf_plan_exit_code=$?
set -e # Re-enable exit on error
```

For `set -e` we can also use `|| true` to avoid exiting immediately:

```shell
count=$(grep -c some-string some-file || true)
```

The colon (`:`) is a shell built-in command that does nothing (it's a no-op). We can use it to check for the existence of variables that are _not_ used in the script, maybe because they are interpolated to another file. For example ([source](https://github.com/bootstrapping-microservices-2nd-edition/chapter-8-example-3/blob/ae37b015081016ea3d26f56b9d04f5d970295f48/scripts/deploy.sh#L16-L18)):

```shell
set -u # or set -o nounset
: "$CONTAINER_REGISTRY"
: "$VERSION"

envsubst < ./scripts/kubernetes/deploy.yaml | kubectl apply -f -
```

This works because the shell tries to expand the parameters. If unset, you get the error "./scripts/deploy.sh: line 18: VERSION: unbound variable". You can also check for arguments ([source](https://github.com/ashleydavis/kubernetes-log-aggregation-example/blob/8a5c19cb883408db9c43e852287ddf8fffb50d73/scripts/docker/build-image.sh)):

```shell
set -u # or set -o nounset
: "$1"
: "$DOCKER_REGISTRY"
: "$VERSION"

export DIR=$1
```

## Command substitution

https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html

Preferred:

```shell
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

Old style:

```shell
AWS_ACCOUNT_ID=`aws sts get-caller-identity --query Account --output text`
```

See [Why is $(...) preferred over `...` (backticks)?](https://mywiki.wooledge.org/BashFAQ/082).

## Run the same command multiple times

https://stackoverflow.com/questions/3737740/is-there-a-better-way-to-run-a-command-n-times-in-bash

From https://developer.hashicorp.com/terraform/tutorials/aws/aws-asg#scale-instances:

```shell
for i in `seq 1 5`; do curl https://www.google.com; echo; done
```

Another example (to generate load to an AWS load balancer, [source](https://github.com/nealdct/aws-clf-code/blob/main/amazon-ec2/generate-load-on-alb.md)):

```shell
for i in {1..200}; do curl http://alb-address.com & done; wait
```

## Conditionals

https://www.gnu.org/software/bash/manual/html_node/Conditional-Constructs.html

### `if` statement

https://stackoverflow.com/questions/669452/are-double-square-brackets-preferable-over-single-square-brackets-in-b

https://stackoverflow.com/questions/3427872/whats-the-difference-between-and-in-bash

### Ternary operator

```shell
[[ $b = 5 ]] && a="$c" || a="$d"
a=$([ "$b" == 5 ] && echo "$c" || echo "$d")
```

## Test

https://www.gnu.org/software/bash/manual/html_node/Bash-Conditional-Expressions.html

### Check if directory exists

```shell
if [ -d src/app ]; then
  echo "Directory exists"
else
  mkdir src/app
fi
```

One line:

```shell
[ -d src ] && echo "Exists"
```

https://stackoverflow.com/questions/59838/how-do-i-check-if-a-directory-exists-or-not-in-a-bash-shell-script

### Check if file exists

https://linuxize.com/post/bash-check-if-file-exists/

```shell
if [ -f src/.env ]; then
  echo "File exists"
fi
```

```shell
if [ ! -f src/.env ]; then
  echo "File doesn't exist"
fi
```

See more tests at https://stackoverflow.com/a/21164441/4034572

### Check if environment variable is set

```shell
if [[ -z $ENVIRONMENT ]]; then
  echo "ENVIRONMENT is empty"
else
  echo "ENVIRONMENT is set to '$ENVIRONMENT'"
fi
```

`-z` checks if the length of the string is zero.

https://stackoverflow.com/questions/39296472/how-to-check-if-an-environment-variable-exists-and-get-its-value

## Wait for some condition

https://linuxsimply.com/bash-scripting-tutorial/loop/until-loop/

Wait until a file exists([source](https://superuser.com/questions/878640/unix-script-wait-until-a-file-exists)):

```shell
until [ -f /tmp/examplefile.txt ]
do
  sleep 5
done
echo "File found"
exit
```

Wait for EFS mount target in EC2 ([source](https://github.com/AWSinAction/code3/blob/e8131b2a740d22cd5d487aa30d242336421c496e/chapter09/efs.yaml#L289-L290)):

```shell
while ! (echo > /dev/tcp/${FileSystem}.efs.${AWS::Region}.amazonaws.com/2049) >/dev/null 2>&1
do
  sleep 5
done
```

## Arguments

- `$1` is the first argument, , `$2` the second argument... Starting from 10 and above we need to use `${10}`, `${11}`...
- `$@` stores all the arguments in a list of string
- `$*` stores all the arguments as a single string
- `$#` stores the number of arguments

Without quotes, `$@` and `$*` are identical. With quotes, `$@` expands to properly quoted arguments, and `$*` makes all
arguments into a single argument.

https://stackoverflow.com/questions/9994295/what-does-mean-in-a-shell-script

https://stackoverflow.com/questions/3898665/what-is-in-bash

https://stackoverflow.com/questions/2761723/what-is-the-difference-between-and-in-shell-scripts

https://stackoverflow.com/questions/3008695/what-is-the-difference-between-and-in-bash

## Input

```shell
echo "Enter your name"
read name
echo "Your name is $name"
```

```shell
read -p "Enter your name" name
```

```shell
echo Press enter to continue
read
echo Continuing...
```

https://stackoverflow.com/questions/18544359/how-do-i-read-user-input-into-a-variable-in-bash

## Pattern matching

- `${1#}` prints the string length of $1
- `${1#pattern}` removes the shortest match of pattern from the start of $1
- `${1##pattern}` removes the longest match of pattern from the start of $1
- `${1%pattern}` removes the shortest match of pattern from the end of $1
- `${1%%pattern}` removes the longest match of pattern from the end of $1

See:

- https://abochannek.github.io/bash/globbing/2021/06/30/bash-pattern-matching.html
- https://abochannek.github.io/bash/globbing/2021/09/10/bash-pattern-matching.html
- https://abochannek.github.io/bash/globbing/2021/10/31/bash-pattern-matching.html

## Parameter expansion

https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html

```shell
NAME=Albert
echo Hi, ${NAME}
# Hi, Albert
```

Set a default value if no value is provided:

```shell
read -p "Enter your name" name
name=${name:-Peter}
```

https://stackoverflow.com/questions/2642585/read-a-variable-in-bash-with-a-default-value

## Heredoc

Multiline strings without `\n`.

https://linuxize.com/post/bash-heredoc/

You can combine heredoc with `cat` to create a multiline file:

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
