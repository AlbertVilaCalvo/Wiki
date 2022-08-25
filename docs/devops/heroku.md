---
title: Heroku
---

Ask HN: Are you leaving Heroku? - https://news.ycombinator.com/item?id=32580597

Autoscaling for Heroku: https://hirefire.io

The `Procfile` contains the command to start the app.

## CLI

https://devcenter.heroku.com/articles/heroku-cli-commands

Install it with `brew tap heroku/brew && brew install heroku`. See https://devcenter.heroku.com/articles/heroku-cli

`heroku --version`

Login: `heroku login`

Open app in the browser: `heroku open`

Run the app locally: `heroku local`. It uses the `Procfile` to determine what to run. You can also do `heroku local web`

Set git remote 'heroku': `heroku git:remote -a <app-name>`

Push changes: `git push heroku main`

Run commands on the dyno: `heroku run bash`

List addons: `heroku addons`

List environment variables (Config Vars): `heroku config`. You can view them in https://dashboard.heroku.com/apps/my-app-name/settings

Set environment variable: `heroku config:set NAME=VALUE`

Get environment variable: `heroku config:get NAME`

## Logs

https://devcenter.heroku.com/articles/logging

View logs: `heroku logs` (100 lines)

View logs, 200 lines: `heroku logs -n 200` (max number is 1500)

View logs updated in real-time: `heroku logs --tail`. Use Ctrl+C to stop.

## `heroku ps` for dyno management

Commands: https://devcenter.heroku.com/articles/dynos#cli-commands-for-dyno-management

Runs the command specified in the `Procfile`.

## Addons

https://elements.heroku.com/addons

## Heroku Postgres addon

https://elements.heroku.com/addons/heroku-postgresql

https://devcenter.heroku.com/articles/heroku-postgresql

Add Heroku Postgres to app: `heroku addons:create heroku-postgresql:hobby-dev`

Show info: `heroku pg`

You can inspect the database by appending `/db` to the app url (tip: open the app with `heroku open`).

## Python apps

https://devcenter.heroku.com/articles/getting-started-with-python

### Specify the runtime

Create a `runtime.txt` file that sets the Python version:

```
python-3.10.2
```

Specifying a Python Runtime: https://devcenter.heroku.com/articles/python-runtimes

Supported Python versions: https://devcenter.heroku.com/articles/python-support#supported-runtimes

### Add the buildpack

Python buildpack: https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-python

Add the Python buildpack: `heroku buildpacks:set heroku/python`

### Procfile

```
web: gunicorn app:app
```

## Node apps

In Express.js, use `process.env.PORT` at `app.listen()`.

With `heroku run node` you have access to the Node REPL, so you can run commands. It has access to the production database.

### Procfile

```
web: node main.js
```
