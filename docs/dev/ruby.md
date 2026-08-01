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

https://rbenv.org

https://github.com/rbenv/rbenv

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

Uninstall version ([docs](https://github.com/rbenv/rbenv#uninstalling-ruby-versions)). Versions are installed at `~/.rbenv/versions`. You simply need to delete the directory with `rm -rf`. Doing `rbenv prefix <version>` gives you the path, so you can do:

```shell
rbenv prefix 3.4.4 | xargs rm -rf
```

Doing `rbenv init` adds the following to `~/.zprofile`:

```shell
# Added by `rbenv init` on Mon Jul 14 11:28:47 CEST 2025
eval "$(rbenv init - --no-rehash zsh)"
```

If you instead add this to your `~/.zshrc`, when you do `rbenv shell 3.4.4` it says "rbenv: shell integration not enabled. Run `rbenv init' for instructions.".

## CocoaPods

https://cocoapods.org

Install cocoapods: `gem install cocoapods`. (If using the macOS system ruby, you need to do `sudo gem install cocoapods`, see https://guides.cocoapods.org/using/getting-started.html#installation.) After installing, doing `which pod` should output something like `/Users/albert/.rbenv/shims/pod`. Run `pod --version` to get the version.

Install dependencies (on a folder with a `Podfile`):

```shell
bundle exec pod install
```

This creates a `Podfile.lock`.

## gem

https://rubygems.org

Gemfile:

- https://guides.rubygems.org/gemfile/
- https://bundler.io/man/gemfile.5.html

Display information about the RubyGems environment:

```shell
gem environment
```

List all installed gems:

```shell
gem list
```

Install a gem:

```shell
gem install <gem-name>
gem install <gem-name> -v <version>
gem install rails -v 8.0.2
```

### Version constraints

https://rubylearning.com/guides/ruby-gems-guide.html

| Specifier           | Example             | Meaning                                     |
| ------------------- | ------------------- | ------------------------------------------- |
| Exact               | `"2.1.0"`           | Only version 2.1.0                          |
| Pessimistic (~>)    | `"~> 2.1"`          | Any version >= 2.1 and < 3.0                |
| Pessimistic (patch) | `"~> 2.1.0"`        | Any version >= 2.1.0 and < 2.2.0            |
| Greater or equal    | `">= 1.0"`          | Any version 1.0 or higher                   |
| Combined            | `">= 1.0", "< 3.0"` | Between 1.0 (inclusive) and 3.0 (exclusive) |

## bundle

Ruby Dependency Management

https://bundler.io

https://guides.rubygems.org/getting_started/ - What is Bundler?

Install the exact gem versions.

Bundler reads a `Gemfile` that declares which gems your project needs, resolves compatible versions, and locks them in a `Gemfile.lock` ([source](https://rubylearning.com/guides/ruby-gems-guide.html)).

Always commit both `Gemfile` and `Gemfile.lock` to version control ([source](https://betterstack.com/community/guides/scaling-ruby/ruby-gems-guide/)).

:::important
`Gemfile.lock` pins Bundler to a version using the `BUNDLED WITH` section. It's recommended to install Bundler with the same version, like this: `gem install bundler -v '4.0.12'`. Otherwise, on machines that have an older Bundler major installed, `bundle install` can fail due to an incompatible Bundler version. Pinning the install command to the lockfile’s Bundler version makes setup deterministic.
:::

Install bundler: `gem install bundler -v 4.0.12` or `gem install bundler`. After installing, doing `which bundle` should output something like `/Users/albert/.rbenv/shims/bundle`. After installing, you may get a message like this:

```
A new release of RubyGems is available: 3.6.9 → 4.0.15!
Run `gem update --system 4.0.15` to update your installation.
```

Run `bundle --version` to get the version.

Help:

```shell
bundle help
```

Display detailed help for each subcommand:

```shell
bundle help <command>
bundle help install

bundle <command> --help
bundle install --help
```

Install the gems specified by the `Gemfile` or `Gemfile.lock` ([docs](https://bundler.io/man/bundle-install.1.html)):

```shell
bundle install
```

Update dependencies to their latest versions ([docs](https://bundler.io/man/bundle-update.1.html)):

```shell
bundle update
```

Execute a script in the current bundle ([docs](https://bundler.io/man/bundle-exec.1.html)):

```shell
bundle exec <command>
bundle exec pod install
```

Show all the gems in your bundle, or the path to a gem ([docs](https://bundler.io/man/bundle-show.1.html)):

```shell
bundle show
bundle show fastlane
```
