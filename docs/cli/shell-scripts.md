---
title: Shell Scripts
---

Google Shell Style Guide: https://google.github.io/styleguide/shellguide.html

Bash Reference Manual: https://www.gnu.org/software/bash/manual/html_node/index.html

Pure bash snippets: https://github.com/dylanaraps/pure-bash-bible

Reusable Bash functions: https://github.com/gruntwork-io/bash-commons

Bash Guide: https://mywiki.wooledge.org/BashGuide - New version: https://guide.bash.academy - https://github.com/lhunath/guide.bash.academy

## Environment variables

List all environment variables: `printenv` or `env`. See [What is the difference between 'env' and 'printenv'?](https://unix.stackexchange.com/questions/123473/what-is-the-difference-between-env-and-printenv/284069). You can also print a specific envar: `printenv ANDROID_HOME`. In Linux you can print many (eg `printenv ANDROID_HOME PATH`) but this does not work in macOS (it only prints the first one).

```shell
# set environment variable
export TF_VAR_vpc_cidr_block="10.0.0.0/16"

# unset environment variable
unset NODE_ENV
```

[What is the difference between env, setenv, export and when to use?](https://unix.stackexchange.com/questions/368944/what-is-the-difference-between-env-setenv-export-and-when-to-use)

[What is the difference between set, env, declare and export when setting a variable in a Linux shell?](https://superuser.com/questions/821094/what-is-the-difference-between-set-env-declare-and-export-when-setting-a-varia)

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

```shell
NAME=Albert
echo Hi, ${NAME}
# Hi, Albert
```

https://stackoverflow.com/questions/2642585/read-a-variable-in-bash-with-a-default-value

```shell
read -p "Enter your name" name
name=${name:-Peter}
```

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
