---
title: Python
---

[Python Package Index - pypi.org](https://pypi.org)

Cheatsheet: https://www.pythonsheets.com


## pyenv

https://github.com/pyenv/pyenv

Python versions are installed in `pyenv root`.

Upgrade it with `brew upgrade pyenv`.

The global version is set in `~/.pyenv/version`. You can use `system`.

Commands: https://github.com/pyenv/pyenv/blob/master/COMMANDS.md

List commands: `pyenv commands`

Display current version: `pyenv version`

List versions: `pyenv versions`

List available versions to install: `pyenv install --list`

Install version: `pyenv install 3.9.7`


## Packaging

:::important
Best practice: pin package versions!

To avoid surprises and bugs, always use exacte versions (`==`) for all dependencies, including transitive/secondary dependencies.
:::

Python Packaging User Guide: https://packaging.python.org

### Tools

[github.com/pypa/pipenv](https://github.com/pypa/pipenv) - Python Development Workflow for Humans (Pipfile.lock)

[github.com/jazzband/pip-tools](https://github.com/jazzband/pip-tools) - A set of tools to keep your pinned Python dependencies fresh (requirements.in)

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


## pipenv

[github.com/pypa/pipenv](https://github.com/pypa/pipenv)

Docs: https://pipenv.pypa.io/en/latest

Upgrade pipenv: `pip3 install --user --upgrade pipenv`

### Commands

Create a new project: `pipenv --three` or `pipenv --python 3.7`

Activate project's virtualenv: `pipenv shell`. Type 'exit' or 'Ctrl+D' to return

(If we do `which python` or `which pip3` outside the environment we get `/usr/bin/python` and `/usr/local/bin/pip3`. Inside we get `/Users/albertvilacalvo/.local/share/virtualenvs/.../bin/...`.)

Install all packages: `pipenv install`

Install all packages, including dev dependencies: `pipenv install --dev`

_To avoid having * as version number, when we add a new dependency we need to set the dependency version number from Pipfile.lock to Pipfile. Then run `pipenv lock` which updates the Pipfile.lock _meta sha256._

Install package: `pipenv install requests`

Install package to dev: `pipenv install pytest --dev`

Uninstall package: `pipenv uninstall requests`

Generate a lockfile: `pipenv lock`

Install all packages specified in Pipfile.lock: `pipenv sync`

Run: `pipenv run python main.py`

Locate the virtualenv: `pipenv --venv`

Locate the Python interpreter: `pipenv --py`

Show graph of dependencies: `pipenv graph`

### Fix errors

Get "✘ Locking Failed! ResolutionFailure" when doing `pipenv install black --dev`. Fixed it with `pipenv lock --pre --clear`.

From https://stackoverflow.com/questions/51540404/how-do-you-resolve-python-package-dependencies-with-pipenv


## Black

https://github.com/psf/black

Docs: https://black.readthedocs.io/en/stable/

`black --help`

`black --version`

### VSCode integration

https://code.visualstudio.com/docs/python/editing#_formatting

At the global settings (⌘,):
- Disable 'Format On Paste', 'Format On Save' and 'Format On Type'
- Set 'Format On Save Mode' to 'file'
- Set 'Default Formatter' to 'None'.

At the project (not global) `.vscode/settings.json` set:

```
"python.formatting.provider": "black",
"editor.formatOnSave": true,
"editor.formatOnSaveMode": "file",
"editor.formatOnType": true,
"editor.formatOnPaste": true,
```