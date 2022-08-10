---
title: Node
---

API Reference: https://nodejs.org/api

https://endoflife.date/nodejs

## Libraries

Libraries: https://nodejs.libhunt.com

### HTTP clients

https://github.com/sindresorhus/got#comparison

- https://github.com/sindresorhus/got
- https://github.com/node-fetch/node-fetch

### Logging

https://betterstack.com/community/guides/logging/nodejs-logging-best-practices

- https://github.com/winstonjs/winston
- https://github.com/expressjs/morgan -> integrates with Express

## Manage Node versions

https://twitter.com/Netlify/status/1496177878182121472

- nvm - https://github.com/nvm-sh/nvm
- n - https://github.com/tj/n
- Volta - https://volta.sh
- asdf - https://asdf-vm.com - Ojo veure https://news.ycombinator.com/item?id=30917800 i https://github.com/asdf-vm/asdf/issues/290

## REPL

https://nodejs.dev/learn/how-to-use-the-nodejs-repl

Use `node` to start it. To exit, type `.exit`, or press Ctrl+C twice, or press Ctrl+D once.

Commands:

- `.help` - list commands
- `.break` or `.clear`
- `.editor`
- `.load <filename>` - load file
- `.save <filename>` - save commands you've run into a file

## Debug

https://nodejs.org/api/debugger.html

Write `debugger` where you want to stop and then run `node inspect index.js`.

Then:

- `n` steps to the next line
- `c` contiunues the execution. Will stop if a `debugger` is found
- `repl` allows you to inspect variables with `console.log`

## Performance

Detecting Node Event Loop Blockers - https://www.ashbyhq.com/blog/engineering/detecting-event-loop-blockers - https://news.ycombinator.com/item?id=30713567

https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

## Databases

https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/

ORM

- https://github.com/sequelize/sequelize
- https://github.com/typeorm/typeorm/

Query Builder

- https://github.com/knex/knex - https://knexjs.org
- https://github.com/porsager/postgres

## Sample code repos and starters

- https://github.com/hagopj13/node-express-boilerplate - REST, MongoDB
- https://github.com/kriasoft/node-starter-kit - GraphQL, PostgreSQL
- https://github.com/kriasoft/relay-starter-kit - (Full Stack) GraphQL, PostgreSQL, React, Relay
- https://github.com/sahat/hackathon-starter
