---
title: FastAPI
---

https://fastapi.tiangolo.com

https://github.com/fastapi/fastapi

Tutorial: Developing FastAPI Application using K8s & AWS - https://www.jetbrains.com/guide/python/tutorials/fastapi-aws-kubernetes/

VSCode Extension - https://marketplace.visualstudio.com/items?itemName=FastAPILabs.fastapi-vscode

## URLs

- http://127.0.0.1:8000
- http://127.0.0.1:8000/docs Swagger
- http://127.0.0.1:8000/openapi.json OpenAPI
- http://127.0.0.1:8000/redoc ReDoc

## Develop with uv

Installation - https://fastapi.tiangolo.com/tutorial/#install-fastapi

FastAPI CLI - https://fastapi.tiangolo.com/fastapi-cli/

Using uv with FastAPI - https://docs.astral.sh/uv/guides/integration/fastapi/

### Create new project

```shell
uv init --bare
uv add "fastapi[standard-no-fastapi-cloud-cli]"
```

You can also do `uv init myproject --bare` (and `cd myproject`) which creates the project in a new directory `myproject/`.

- `[standard]` installs FastAPI, the `fastapi` CLI, uvicorn and `fastapi-cloud-cli` for deployment to [FastAPI Cloud](https://fastapicloud.com).
- `[standard-no-fastapi-cloud-cli]` is the same, minus `fastapi-cloud-cli`.

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

### Existing project

```shell
uv sync  # Create .venv from pyproject.toml + uv.lock
```

### Run

```shell
uv run fastapi dev        # Auto-reload; finds main.py, app.py, api/main.py...
uv run fastapi dev my_file.py  # Other filenames must be passed explicitly
uv run fastapi run        # Production mode (no reload)
```
