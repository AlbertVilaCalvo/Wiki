---
title: hosts
---

https://github.com/StevenBlack/hosts

The `hosts` file is located in `/private/etc`.

```shell
cd ~/Informàtica/hosts
gco -- .
ggpull
python3 updateHostsFile.py [--backup]
```

```shell
cd ~/Informàtica/hosts && gco -- . && ggpull && python3 updateHostsFile.py
```

## Error ModuleNotFoundError: No module named 'requests'

If the error "ModuleNotFoundError: No module named 'requests'" is thrown when running `updateHostsFile.py`, then install the required dependencies: requests.

At [Generate your own unified hosts file](https://github.com/StevenBlack/hosts#generate-your-own-unified-hosts-file) it says to run `pip3 install --user -r requirements.txt`. However, when you run this, you get the error externally-managed-environment (This environment is externally managed), see below. There are solutions [at StackOverflow](https://stackoverflow.com/questions/75608323/how-do-i-solve-error-externally-managed-environment-every-time-i-use-pip-3?answertab=trending).

A correct way to install requests is to use a virtual environment:

```shell
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install requests
```

The error is:

```
$ pip3 install --user -r requirements.txt
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try brew install
    xyz, where xyz is the package you are trying to
    install.

    If you wish to install a Python library that isn't in Homebrew,
    use a virtual environment:

    python3 -m venv path/to/venv
    source path/to/venv/bin/activate
    python3 -m pip install xyz

    If you wish to install a Python application that isn't in Homebrew,
    it may be easiest to use 'pipx install xyz', which will manage a
    virtual environment for you. You can install pipx with

    brew install pipx

    You may restore the old behavior of pip by passing
    the '--break-system-packages' flag to pip, or by adding
    'break-system-packages = true' to your pip.conf file. The latter
    will permanently disable this error.

    If you disable this error, we STRONGLY recommend that you additionally
    pass the '--user' flag to pip, or set 'user = true' in your pip.conf
    file. Failure to do this can result in a broken Homebrew installation.

    Read more about this behavior here: <https://peps.python.org/pep-0668/>

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```

## Other tools

https://host-flash.com
