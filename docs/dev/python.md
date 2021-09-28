---
title: Python
---

[Python Package Index - pypi.org](https://pypi.org)


## pyenv

Python versions are installed in `pyenv root`.

Upgrade it with `brew upgrade pyenv`.

The global version is set in `~/.pyenv/version`. You can use `system`.

Commands: https://github.com/pyenv/pyenv/blob/master/COMMANDS.md

List commands: `pyenv commands`

Display current version: `pyenv version`

List versions: `pyenv versions`


## Packaging

:::important
Best practice: pin package versions!

To avoid surprises and bugs, always use exacte versions (`==`) for all dependencies, including transitive/secondary dependencies.
:::

Python Packaging User Guide: https://packaging.python.org

### Tools

[github.com/pypa/pipenv](https://github.com/pypa/pipenv) - Python Development Workflow for Humans (Pipfile.lock)

[github.com/jazzband/pip](https://github.com/jazzband/pip-tools) - A set of tools to keep your pinned Python dependencies fresh (requirements.in)

[github.com/bndr/pipreqs](https://github.com/bndr/pipreqs) - Generate pip requirements.txt file based on imports of any project

[github.com/naiquevin/pipdeptree](https://github.com/naiquevin/pipdeptree) - A command line utility to display dependency tree of the installed Python packages

[github.com/pypa/pipx](https://github.com/pypa/pipx) - Install and Run Python Applications in Isolated Environments

### Search pacakges

[pypi.org](https://pypi.org)

[awesome-python.com](https://awesome-python.com)

[python.libhunt.com](https://python.libhunt.com/)


## pip

Python package installer - https://github.com/pypa/pip

Docs: https://pip.pypa.io/en/stable

https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/pip

_pip installs packages systemwide (globally) by default if we are not on a venv_

### Commands

Docs: https://pip.pypa.io/en/stable/cli/

`pip3 --version`

List commands: `pip3 --help`

Install package: `pip install requests`

Install specific version of a package: `pip install requests==2.1.3` or `pip install requests>=2,<3`

If we want a version compatible with eg 2.1.3 (2.1.4 or 2.1.5) we can do: `pip install requests~=2.1.3`

Install package from Git repo: `pip install git+https://github.com/user/repo.git@branch` or `pip install git+https://github.com/user/repo.git@commit-hash` or `pip install git+https://github.com/user/repo.git@tag`

List installed packages: `pip list`

Info about installed package: `pip3 show requests`

List outdated packages: `pip list --outdated`

Upgrade package: `pip install --upgrade requests` or `pip install -U requests`

Uninstall package: `pip uninstall requests`. Important: this does _not_ remove the uninstalled package dependencies! Those will remain :/


## venv

Docs: https://docs.python.org/3/library/venv.html

Provides isolated Python environments, with project-specific dependencies and Python interpreter. pip installs dependencies systemwide (globally), which means that you can only have 1 version of a library. venv allows 2 projects to use different versions of the same library, and also different Python versions.

Create virtual environment: `python3 -m venv ./venv` or `python3 -m venv ~/.virtualenvs/djangodev`

(This creates lots of files and folders - see them with `tree venv`.)

Activate the virtual environment: `source ./venv/bin/activate` or `source ~/.virtualenvs/djangodev/bin/activate`. This needs to be done for each new terminal session.

(After activating, doing `which pip` points to the binary in the venv folder, not the global `/usr/local/bin/pip3`. Same with the Python interpreter: `which python` points to the venv interpreter, not `/usr/bin/python`.)

Leave active venv and go back to the global environment: `deactivate`

To destroy the venv first run `deactivate` (if active) and then delete the folder (eg `rm -rf ./venv`).


## requirements.txt

Docs: https://pip.pypa.io/en/latest/user_guide/#requirements-files

It includes transitive (secondary) dependencies. Does not specify the Python version.

Print packages: `pip freeze`

Create file: `pip freeze > requirements.txt`

Install dependencies: `pip install -r requirements.txt` or `pip install -r requirements.txt -t ./venv`

Every time we do `pip install somepackage` we need to do `pip freeze > requirements.txt`.

### Example
```
# This is a comment
requests>=2.20
flake8>=3.8,<=4.0
schedule==0.4.2
```
See the example in the docs: https://pip.pypa.io/en/stable/cli/pip_install/#example-requirements-file

### dev dependencies

requirements.txt
```
Flask==1.0
```
requirements-dev.txt
```
-r requirements.txt
mock==2.0.0
```
Example: https://github.com/Yelp/love

### pip-tools

https://github.com/jazzband/pip-tools

https://stackoverflow.com/questions/61536466/pips-requirements-txt-best-practice
