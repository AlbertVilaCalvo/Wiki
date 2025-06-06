---
title: Python Tools
---

[Python Package Index - pypi.org](https://pypi.org)

Cheatsheet: https://www.pythonsheets.com

## Steps to create a Python project

1. Set Python version: `pyenv local 3.10.0`. Check the latest Python version with `pyenv versions`.
2. Init Pypenv: `pipenv --python 3.10.2`. This creates the `Pipfile`.
3. Enable the virtual environment: `pipenv shell`.
4. Set the Python interpreter in PyCharm.
   - At the Preferences, go to 'Python Interpreter' (you can click 'Interpreter Settings...' at the bottom-right).
   - Open the 'Python Interpreter' drop-down and click 'Show All...'.
   - At the dialog that opens (Python Interpreters), click '+'.
   - At the dialog that opens (Add Python Interpreter), select 'Existing environment' and set the path to the location of new Python interpreter given by `pipenv --venv` + `/bin/python`.
   - Close the dialogs and at the drop-down select the new interpreter just added and then click 'OK'.
5. Install Black and configure it in PyCharm: [follow instructions](#black).
   - Doing `which black` should be something like `/Users/albert/.local/share/virtualenvs/project-name--zmW4vHg/bin/black`. → This is not true now, it prints `/Users/albertvilacalvo/.pyenv/shims/black`.
6. Install libraries, eg: `pipenv install flask`.

## `-m` flag

From 'man python': `-m <module-name>` Searches sys.path for the named module and runs the corresponding .py file as a script.

https://stackoverflow.com/questions/50821312/meaning-of-python-m-flag

## pyenv

https://github.com/pyenv/pyenv

Python versions are installed in `pyenv root`.

Installed with Homebrew (see 'Notes Python.odt').

Upgrade it with `brew upgrade pyenv`.

The global Python version is set in `~/.pyenv/version`. We can use `system` as a value.

### pyenv commands

https://github.com/pyenv/pyenv/blob/master/COMMANDS.md

List commands: `pyenv commands`

Set local version (overrides the global version): `pyenv local 3.10.0`

Display current version: `pyenv version`

List versions: `pyenv versions`

List available versions to install: `pyenv install --list`

Install version: `pyenv install 3.9.7`

_After installing_ a new Python version we can upgrade pip and pipenv, so that we use their latest versions:

- `pip install --upgrade pip` or `/Users/albert/.pyenv/versions/3.10.2/bin/python3.10 -m pip install --upgrade pip`
- `pip install --user pipenv`
- Important: after upgrading pipenv we need to close the current shell and open a new one (see [upgrade pipenv](#upgrade-pipenv))

## Packaging

:::info
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

[github.com/astral-sh/ruff](https://github.com/astral-sh/ruff) - An extremely fast Python linter and code formatter, written in Rust - https://www.thoughtworks.com/radar/tools/ruff

https://docs.astral.sh/uv - [github.com/astral-sh/uv](https://github.com/astral-sh/uv) - An extremely fast Python package and project manager, written in Rust

### Search packages

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

Help of a command: `pip install --help`

Upgrade pip itself:

- From https://pip.pypa.io/en/stable/installation/#upgrading-pip: `python -m pip install --upgrade pip`
- `pip install --upgrade pip` or `pip install -U pip`
- Commonly setuptools is upgraded too: `pip install -U pip setuptools`

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

Workflow:

```shell
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install requests
```

Integrated into the Python standard library, available since Python 3.3.

Provides isolated Python environments, with project-specific dependencies and Python interpreter. pip installs dependencies systemwide (globally), which means that you can only have 1 version of a library. venv allows 2 projects to use different versions of the same library, and also different Python versions.

Create virtual environment: `python3 -m venv <DIR>`. For example:

- `python3 -m venv venv`
- `python3 -m venv .venv`
- `python3 -m venv ~/.virtualenvs/djangodev`

This creates lots of files and folders - see them with `tree venv`.

Activate the virtual environment: `source venv/bin/activate` or `source ~/.virtualenvs/djangodev/bin/activate`. This needs to be done for each new terminal session. Doing `. venv/bin/activate` also works.

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

Install:

- Installation with Homebrew is discouraged _because updates to the brewed Python distribution will break Pipenv, and perhaps all virtual environments managed by it. You’ll then need to re-install Pipenv at least_. ([source](https://pipenv.pypa.io/en/latest/#install-pipenv-today))
- https://pipenv.pypa.io/en/latest/#install-pipenv-today
- https://pipenv.pypa.io/en/latest/install/
- `pip(3) install --user pipenv`

### Upgrade Pipenv

`pip3 install --user --upgrade pipenv`

Important note after upgrading. If we are using a Python version from pyenv (ie we have a `.python-version` file created with eg `pyenv local 3.10.2`), after upgrading pipenv it's possible that doing `pipenv --version` still shows the old/previous pipenv version. We need to open a new shell (and close the current one) so that it picks up the new pipenv (just doing `source ~/.zshrc` is not enough). Note that we have an 'eval' for pyenv at `~/.zprofile` and another at `~/.zshrc`, which explains this behavior (see https://github.com/pyenv/pyenv#basic-github-checkout).

### Commands

Create a new project: `pipenv --three` or `pipenv --python 3.7` or `pipenv --python 3` or `pipenv --python 3.10.2`.
Note that even though we may do `pipenv --python 3.10.2`, and it does indeed use 3.10.2 (it says 'Using /Users/albertvilacalvo/.pyenv/versions/3.10.2/bin/python3 (3.10.2) to create virtualenv...'), it writes `python_version = "3.10"` at `Pipfile`, not 3.10.2.

☢️ Activate project's virtualenv: `pipenv shell`. Type 'exit' or 'Ctrl+D' to return.
Virtual environments are located in `~/.local/share/virtualenvs`.

(If we do `which python` or `which pip3` outside the environment we get `/usr/bin/python` and `/usr/local/bin/pip3`. Inside we get `/Users/albertvilacalvo/.local/share/virtualenvs/.../bin/...`.)

Install the packages in `[packages]` but not in `[dev-packages]`: `pipenv install` → Can modify Pipfile.lock

Install all packages, including dev dependencies: `pipenv install --dev`

Install all packages specified in Pipfile.lock: `pipenv sync` → Never modifies Pipfile.lock

Enforce that your Pipfile.lock is up to date: `pipenv install --deploy` → This will fail a build if the Pipfile.lock is out–of–date, instead of generating a new one ([source](https://pipenv.pypa.io/en/latest/advanced/#using-pipenv-for-deployments))

`pipenv install` vs `pipenv sync`:

- https://stackoverflow.com/questions/52447791/what-are-the-advantages-of-using-pipenv-sync-over-pipenv-install
- https://pipenv.pypa.io/en/latest/advanced/#using-pipenv-for-deployments
- Difference between pipenv sync and pipenv install --deploy: https://github.com/pypa/pipenv/issues/3582

> `pipenv install` will install all dependencies from the Pipfile, and update Pipfile.lock with the versions it used. `pipenv sync` will install the exact versions specified in Pipfile.lock.

> `pipenv install --ignore-pipfile` is nearly equivalent to `pipenv sync`, but `pipenv sync` will never attempt to re-lock your dependencies as it is considered an atomic operation. `pipenv install` by default does attempt to re-lock unless using the `--deploy` flag.

> `pipenv sync` will never try to relock your dependencies (you can regard it as blind to Pipfile) while `pipenv install --deploy` will first check the consistency between Pipfile and Pipfile.lock and abort if they don't match

_To avoid having '\*' as version number, when we add a new dependency we need to set the dependency version number from Pipfile.lock to Pipfile. Then run `pipenv lock` which updates the Pipfile.lock \_meta sha256._

Install package: `pipenv install requests`

Install package to dev: `pipenv install pytest --dev`

Uninstall package: `pipenv uninstall requests`

Generate a lockfile: `pipenv lock`

Run: `pipenv run python main.py`

Locate the virtualenv: `pipenv --venv`. Is something like `/Users/albertvilacalvo/.local/share/virtualenvs/My-App-K-OEJVkt`

Locate the Python interpreter: `pipenv --py`

Show graph of dependencies: `pipenv graph`

### Fix errors

Get "✘ Locking Failed! ResolutionFailure" when doing `pipenv install black --dev`. Fixed it with `pipenv lock --pre --clear`.

From https://stackoverflow.com/questions/51540404/how-do-you-resolve-python-package-dependencies-with-pipenv

## Pyright

Static Type Checker for Python

https://github.com/microsoft/pyright

In VSCode, should be used with the [Pylance extension](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance).

## uv

https://github.com/astral-sh/uv

Recommended in the Technology Radar - https://www.thoughtworks.com/radar/tools/summary/uv - https://www.thoughtworks.com/radar/tools/uv

## Black

https://github.com/psf/black

Docs: https://black.readthedocs.io/en/stable/

### Installation

- With Pipenv:
  - Make sure that the environment is active, ie run `pipenv shell`.
  - `pipenv install black --dev`.
  - Then on the Pipfile replace version value '\*' with the actual version in the Pipfile (eg "==21.12b0").
  - Finally run `pipenv lock`. If the error '✘ Locking Failed! ResolutionFailure' happens, run `pipenv lock --pre --clear`.
- With venv or virtualenv:
  - Make sure that the environment is active, ie run `source venv/bin/activate`, otherwise black is installed globally.
  - `pip install black`

### Commands

List commands: `black --help`

`black --version`

Check: `black --check <dir>`, eg `black --check .`

Format: `black .`

### PyCharm integration

https://black.readthedocs.io/en/stable/integrations/editors.html#pycharm-intellij-idea

Requires the [File Watchers](https://plugins.jetbrains.com/plugin/7177-file-watchers) plugin, which is installed by default in PyCharm.

`which black` should be something like `/Users/albertvilacalvo/.local/share/virtualenvs/todo-app-quaXzdRU/bin/black` if we are on an active virtual environment created with Pipenv and we've installed black on the environment (`pipenv install black --dev`). → This is not true now, it prints `/Users/albertvilacalvo/.pyenv/shims/black`.

#### Add the External Tool

_This needs to be done only once ever._

Preferences → Tools → External Tools. Click +.

- Name: Black
- Description: Code formatter
- Program: `$PyInterpreterDirectory$/black`
- Arguments: `"$FilePath$"`
- Working directory: `$ProjectFileDir$`

#### Create the File Watcher

_This needs to be done for every project._

Preferences → Tools → File Watchers. Click + and select 'custom'.

- Name: Black
- File type: Python
- Scope: Project Files
- Program: `$PyInterpreterDirectory$/black` (or the output of `which black` if we are on a active venv)
- Arguments: `"$FilePath$"`
- Output paths to refresh: `$FilePath$`
- Working directory: `$ProjectFileDir$`
- Environment variables: leave it emtpy

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

## pycodestyle

https://github.com/PyCQA/pycodestyle

Check your Python code against some of the style conventions in [PEP 8](http://www.python.org/dev/peps/pep-0008).
