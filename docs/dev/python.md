---
title: Python
---

[Python Package Index - pypi.org](https://pypi.org)

Cheatsheet: https://www.pythonsheets.com


## Steps to create a Python project

1. Set Python version: `pyenv local 3.10.0`. Check the lastest Python version with `pyenv versions`.
2. Init Pypenv: `pipenv --python 3.10`. This creates the Pipfile.
3. Enable the virtual environment: `pipenv shell`.
4. Set the Python interpreter in PyCharm. At the Preferences, add the new Python interpreter with the location given by `pipenv --venv`.
5. Setup Black and configure it in PyCharm: [follow instructions](#black). `which flask` should be something like `/Users/albert/.local/share/virtualenvs/project-name--zmW4vHg/bin/black`.
6. Install libraries, eg: `pipenv install flask`.


## pyenv

https://github.com/pyenv/pyenv

Python versions are installed in `pyenv root`.

Upgrade it with `brew upgrade pyenv`.

The global version is set in `~/.pyenv/version`. You can use `system` as a value.

### pyenv commands

https://github.com/pyenv/pyenv/blob/master/COMMANDS.md

List commands: `pyenv commands`

Set local version (overrides the global version): `pyenv local 3.10.0`

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

Managing Application Dependencies (Python Packaging User Guide): https://packaging.python.org/tutorials/managing-dependencies

### Tools

[github.com/pypa/pipenv](https://github.com/pypa/pipenv) - Python Development Workflow for Humans (Pipfile.lock)

[github.com/python-poetry/poetry](https://github.com/python-poetry/poetry) - Python dependency management and packaging made easy

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

If we want a version compatible with eg 2.1.3 (2.1.4 or 2.1.5) we can do: `pip install requests~=2.1.3`.
You can also do: `pip install package==2.1.*`

If we want a lower version than X we can do: `pip install "flask<2"`.

Install package from Git repo: `pip install git+https://github.com/user/repo.git@branch` or `pip install git+https://github.com/user/repo.git@commit-hash` or `pip install git+https://github.com/user/repo.git@tag`

List installed packages: `pip list`

Info about installed package (eg show package version): `pip3 show requests`

List outdated packages: `pip list --outdated`

Upgrade package: `pip install --upgrade requests` or `pip install -U requests`

Uninstall package: `pip uninstall requests`. Important: this does _not_ remove the uninstalled package dependencies! Those will remain :/


## venv

Docs: https://docs.python.org/3/library/venv.html

Integrated into the Python standard library, available since Python 3.3.

Provides isolated Python environments, with project-specific dependencies and Python interpreter. pip installs dependencies systemwide (globally), which means that you can only have 1 version of a library. venv allows 2 projects to use different versions of the same library, and also different Python versions.

Create virtual environment: `python3 -m venv <DIR>`. Eg `python3 -m venv venv` or `python3 -m venv ~/.virtualenvs/djangodev`.

(This creates lots of files and folders - see them with `tree venv`.)

Activate the virtual environment: `source venv/bin/activate` or `source ~/.virtualenvs/djangodev/bin/activate`. This needs to be done for each new terminal session.

(After activating, doing `which pip` points to the binary in the venv folder, not the global `/usr/local/bin/pip3`. Same with the Python interpreter: `which python` points to the venv interpreter, not `/usr/bin/python`.)

Leave active venv and go back to the global environment: `deactivate`

To destroy the venv first run `deactivate` (if active) and then delete the folder (eg `rm -rf ./venv`).


## virtualenv

Similar than venv but with more features.

Docs: https://virtualenv.pypa.io/en/latest

https://packaging.python.org/key_projects/#virtualenv

Install it using pipx: `pipx install virtualenv`.

Create virtual environment: `python3 -m virtualenv <DIR>`.

Activate the virtual environment: `source <DIR>/bin/activate`.


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


## Pipenv

[github.com/pypa/pipenv](https://github.com/pypa/pipenv)

Docs: https://pipenv.pypa.io/en/latest

Upgrade Pipenv: `pip3 install --user --upgrade pipenv`

### Commands

Create a new project: `pipenv --three` or `pipenv --python 3.7`

☢️ Activate project's virtualenv: `pipenv shell`. Type 'exit' or 'Ctrl+D' to return.
Virtual environments are located in `~/.local/share/virtualenvs`.

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

Locate the virtualenv: `pipenv --venv`. Is something like `/Users/albertvilacalvo/.local/share/virtualenvs/My-App-K-OEJVkt`

Locate the Python interpreter: `pipenv --py`

Show graph of dependencies: `pipenv graph`

### Fix errors

Get "✘ Locking Failed! ResolutionFailure" when doing `pipenv install black --dev`. Fixed it with `pipenv lock --pre --clear`.

From https://stackoverflow.com/questions/51540404/how-do-you-resolve-python-package-dependencies-with-pipenv


## Black

https://github.com/psf/black

Docs: https://black.readthedocs.io/en/stable/

### Installation
- With Pipenv:
  - Make sure that the environment is active, ie run `pipenv shell`.
  - `pipenv install black --dev`.
  - Then on the Pipfile replace version value '*' with the actual version in the Pipfile (eg "==21.12b0").
  - Finally run `pipenv lock`. If the error '✘ Locking Failed! ResolutionFailure' happens, run `pipenv lock --pre --clear`.
- With venv or virtualenv: `pip install black` (environment needs to be active, otherwise black is installed globally).

### Commands

List commands: `black --help`

`black --version`

Check: `black --check <dir>`, eg `black --check .`

Format: `black .`

### PyCharm integration

https://black.readthedocs.io/en/stable/integrations/editors.html#pycharm-intellij-idea

Requires the [File Watchers](https://plugins.jetbrains.com/plugin/7177-file-watchers) plugin, which is installed by default in PyCharm.

`which black` should be something like `/Users/albertvilacalvo/.local/share/virtualenvs/todo-app-quaXzdRU/bin/black` if we are on an active virtual environment created with Pipenv and we've installed black on the environment (`pipenv install black --dev`).

#### Add the External Tool

_This needs to be done only once ever._

Preferences -> Tools -> External Tools. Click +.

- Name: Black
- Description: Code formatter
- Program: `$PyInterpreterDirectory$/black`
- Arguments: `"$FilePath$"`
- Working directory: `$ProjectFileDir$`

#### Create the File Watcher

_This needs to be done for every project._

Preferences -> Tools -> File Watchers. Click + and select 'custom'.

- Name: Black
- File type: Python
- Scope: Project Files
- Program: `$PyInterpreterDirectory$/black` (or the output of `which black` if we are on a active venv)
- Arguments: `"$FilePath$"`
- Output paths to refresh: `$FilePath$`
- Working directory: `$ProjectFileDir$`

In Advanced Options:
- Uncheck "Auto-save edited files to trigger the watcher"
- Uncheck "Trigger the watcher on external changes"
- Uncheck "Trigger the watcher regardless of syntax errors"
- Uncheck "Create output file from stdout"

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
