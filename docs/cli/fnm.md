---
title: fnm
---

https://github.com/Schniz/fnm

## Install

Run `curl -fsSL https://fnm.vercel.app/install | bash`. It installs with Homebrew. It says:

```
Installing for Zsh. Appending the following to /Users/albert/.zshrc:

# fnm
FNM_PATH="/Users/albert/Library/Application Support/fnm"
if [ -d "$FNM_PATH" ]; then
  export PATH="/Users/albert/Library/Application Support/fnm:$PATH"
  eval "`fnm env`"
fi

In order to apply the changes, open a new terminal or run the following command:

  source /Users/albert/.zshrc
```

The [install script](https://github.com/Schniz/fnm/blob/64ef825c545526dc9ca2b6e9c84e69cb4dafd9a2/.ci/install.sh#L167-L179) adds the following to `~/.zshrc`:

```shell
# fnm
FNM_PATH="/Users/albert/Library/Application Support/fnm"
if [ -d "$FNM_PATH" ]; then
  export PATH="/Users/albert/Library/Application Support/fnm:$PATH"
  eval "`fnm env`"
fi
```

But it doesn't work. I've had to replace it with `eval "$(fnm env --shell zsh)"` or `eval "$(fnm env --use-on-cd --shell zsh)"`.

At https://nodejs.org/en/download it says:

```shell
# Download and install fnm:
curl -o- https://fnm.vercel.app/install | bash

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node -v # Should print "v22.16.0".

# Verify npm version:
npm -v # Should print "10.9.2".
```

## Upgrade

Upgrade using Homebrew (`brew upgrade`).
