---
title: uv
---

https://docs.astral.sh/uv/

Commands - https://docs.astral.sh/uv/getting-started/features/

https://github.com/astral-sh/uv

Fast Python package manager, drop-in replacement for common `pip` workflows.

https://astral.sh/blog/uv-unified-python-packaging

Recommended in the Technology Radar - https://www.thoughtworks.com/radar/tools/summary/uv - https://www.thoughtworks.com/radar/tools/uv

Fun with uv and PEP 723 - https://news.ycombinator.com/item?id=44369388

Switching from Pyenv to Uv - https://news.ycombinator.com/item?id=43307563

Switching Pip to Uv in a Dockerized Flask / Django App (nickjanetakis.com) - https://news.ycombinator.com/item?id=44364406

> It's worth noting that uv also supports a workflow that directly replaces pyenv, virtualenv and pip without mandating a change to a lockfile/pyproject.toml approach.

uv is the best thing to happen to the Python ecosystem in a decade - https://news.ycombinator.com/item?id=45751400

Install either with Brew (`brew install uv`) or with the [standalone installer](https://docs.astral.sh/uv/getting-started/installation/#standalone-installer).

## Manage Python versions

```shell
uv python list
uv python install <version>
uv python uninstall <version>
```

## Scripts

https://docs.astral.sh/uv/guides/scripts/

uv: running a script with dependencies - https://news.ycombinator.com/item?id=44641521

```shell
uv run --no-project --with-requirements requirements.txt main.py
uv run --with requests main.py
```

## Projects

https://docs.astral.sh/uv/guides/projects/

Create new project:

```shell
uv init --bare
```

You can also do `uv init myproject --bare` (and `cd myproject`) which creates the project in a new directory `myproject/`.

With `--bare` it only creates a `pyproject.toml` file.
Without `--bare` it creates:

```
.git
.gitignore
.python-version
pyproject.toml
README.md
src/myproject/__init__.py
```

Add dependency:

```shell
uv add <package>
```

Remove dependency:

```shell
uv remove <package>
```

Install dependencies:

```shell
uv sync
```

Reset project:

```shell
rm -rf .venv && uv sync   # Rebuild the environment from scratch
```

## `pyproject.toml`

Minimum Release Age is an Underrated Supply Chain Defense - https://daniakash.com/posts/simplest-supply-chain-defense/

```toml title="pyproject.toml"
[tool.uv]
exclude-newer = "7d"
```

## `.gitignore`

Commit `pyproject.toml` and `uv.lock`; ignore `.venv/`.

This is the `.gitignore` file created automatically by `uv` with `uv init`:

```shell title=".gitignore"
# Python-generated files
__pycache__/
*.py[oc]
build/
dist/
wheels/
*.egg-info

# Virtual environments
.venv
```

## pip replacement

```shell
uv pip list # List installed packages
```
