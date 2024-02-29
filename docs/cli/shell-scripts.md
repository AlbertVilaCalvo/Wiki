---
title: Shell Scripts
---

Google Shell Style Guide: https://google.github.io/styleguide/shellguide.html

Bash Reference Manual: https://www.gnu.org/software/bash/manual/html_node/index.html

Pure bash snippets: https://github.com/dylanaraps/pure-bash-bible

Reusable Bash functions: https://github.com/gruntwork-io/bash-commons

Bash Guide: https://mywiki.wooledge.org/BashGuide - New version: https://guide.bash.academy - https://github.com/lhunath/guide.bash.academy

## Ternary operator

```shell
[[ $b = 5 ]] && a="$c" || a="$d"
a=$([ "$b" == 5 ] && echo "$c" || echo "$d")
```
