---
title: Ruby
---

## Install

Do not use [Homebrew](https://formulae.brew.sh/formula/ruby#default) because it doesn't add it to your path. Doing `brew install ruby` prints:

```
ruby is keg-only, which means it was not symlinked into /opt/homebrew,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
```

### With rbenv and ruby-build

https://github.com/rbenv/rbenv

https://github.com/rbenv/ruby-build

Install [rbenv](https://formulae.brew.sh/formula/rbenv#default) with `brew install rbenv`. This installs [ruby-build](https://formulae.brew.sh/formula/ruby-build), required to build ruby.

To build ruby with ruby-build, also install the required dependencies [listed here](https://github.com/rbenv/ruby-build/wiki#suggested-build-environment): `brew install openssl@3 readline libyaml gmp autoconf`

## rbenv

```shell
rbenv --help
```

Get versions:

```shell
rbenv versions
# * system
#   3.4.4
```

Get current active version:

```shell
rbenv version
```

Prints `system` or `3.3.0 (set by /Users/albert/.rbenv/version)`.

Set version:

```shell
rbenv global 3.4.4
rbenv local 3.4.4
rbenv shell 3.4.4
```

List all versions available to install:

```shell
rbenv install -L
rbenv install --list-all
```

List only the latest stable versions available to install:

```shell
rbenv install -l
```

Install specific version:

```shell
rbenv install 3.4.4
```

Doing `rbenv init` adds the following to `~/.zprofile`:

```shell
# Added by `rbenv init` on Mon Jul 14 11:28:47 CEST 2025
eval "$(rbenv init - --no-rehash zsh)"
```

If you instead add this to your `~/.zshrc`, when you do `rbenv shell 3.4.4` it says "rbenv: shell integration not enabled. Run `rbenv init' for instructions.".

## CocoaPods

https://cocoapods.org

Install cocoapods: `gem install cocoapods`. If using the macOS system ruby, you need to do `sudo gem install cocoapods`, see https://guides.cocoapods.org/using/getting-started.html#installation.

Install dependencies (on a folder with a `Podfile`):

```shell
bundle exec pod install
```

This creates a `Podfile.lock`.
