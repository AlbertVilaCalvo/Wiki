---
title: Python
---

https://pypi.org - Python Package Index


## pip

Python Package Index - https://github.com/pypa/pip

Docs: https://pip.pypa.io/en/stable

Python Packaging User Guide: https://packaging.python.org

To search packages go to https://pypi.org

https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/pip

### Commands

_pip installs packages systemwide (globally) by default if we are not on a venv_

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

Provides isolated Python environments, with project-specific dependencies and Python interpreter. pip installs dependencies systemwide (globally), which means that you can only have 1 version of a library. venv allows 2 projects to use different versions of the same library, and also different Python versions.

Create virtual environment: `python3 -m venv ./venv` or `python3 -m venv ~/.virtualenvs/djangodev`

(This creates a lof of files and folder - see them with `tree venv`.)

Activate the virtual environment: `source ./venv/bin/activate` or `source ~/.virtualenvs/djangodev/bin/activate`. This needs to be done for each new terminal session.

(After activating, doing `which pip` points to the binary in the venv folder, not the global `/usr/local/bin/pip3`. Same with the Python interpreter: `which python` points to the venv interpreter, not `/usr/bin/python`.)

Leave active venv and go back to the global environment: `deactivate`

To destroy the venv first run `deactivate` (if active) and then delete the folder (eg `rm -rf ./venv`).
