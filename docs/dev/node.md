---
title: Node
---

API Reference: https://nodejs.org/api

https://endoflife.date/nodejs

https://github.com/goldbergyoni/nodebestpractices

## Libraries

Libraries: https://nodejs.libhunt.com

### HTTP clients

https://github.com/sindresorhus/got#comparison

- https://github.com/sindresorhus/got
- https://github.com/node-fetch/node-fetch

### HTTP testing

- https://github.com/nock/nock - HTTP server mocking and expectations library for Node.js

### Logging

https://betterstack.com/community/guides/logging/nodejs-logging-best-practices

- https://github.com/winstonjs/winston
- https://github.com/debug-js/debug
- https://github.com/pinojs/pino -> use it on Express with https://github.com/pinojs/pino-http (see https://github.com/pinojs/pino/blob/master/docs/web.md#pino-with-express)
- https://github.com/klaussinani/signale
- https://github.com/expressjs/morgan -> request logger middleware that integrates with Express
- https://github.com/gajus/roarr

### Email

- https://github.com/nodemailer/nodemailer
- https://github.com/forwardemail/email-templates
  - This project uses it: https://github.com/Saas-Starter-Kit/SAAS-Starter-Kit-Pro/tree/main/server/emails / https://github.com/Saas-Starter-Kit/SAAS-Starter-Kit-Pro/blob/cdec5491b8ed52313cedb07ecfbc7657966689f2/server/src/Config/email.js
- https://github.com/eladnava/mailgen
- https://github.com/eleith/emailjs
- Convert HTML to text: https://github.com/EthanRBrown/web-development-with-node-and-express-2e/blob/99c116fb90f2e08c9f231e52d167ad6097df444a/ch11/04-rendering-html-email.js#L63 The project uses Handlebars for HTML emails and it uses [html-to-formatted-text](https://www.npmjs.com/package/html-to-formatted-text) to get the text version of the email

### Rate limit

- https://github.com/animir/node-rate-limiter-flexible
- https://github.com/nfriedly/express-rate-limit
- https://github.com/tj/node-ratelimiter

See https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/security/login-rate-limit.md

With Redis:

- https://github.com/guardian/gateway/tree/main/src/server/lib/rate-limit
- https://github.dev/lesterfernandez/react-live-messenger/blob/master/packages/server/controllers/express/rateLimiter.js

### Environment variables

- https://github.com/motdotla/dotenv
- https://github.com/KATT/envsafe

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
- `c` continues the execution. Will stop if a `debugger` is found
- `repl` allows you to inspect variables with `console.log`

## Performance

Detecting Node Event Loop Blockers - https://www.ashbyhq.com/blog/engineering/detecting-event-loop-blockers - https://news.ycombinator.com/item?id=30713567

https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

## Databases

https://blog.logrocket.com/why-you-should-avoid-orms-with-examples-in-node-js-e0baab73fa5/

https://contra.com/p/gkOQlbLq-validating-postgre-sql-query-results-using-runtime-checks

ESLint plugin: https://safeql.dev

PostgreSQL client

- https://github.com/brianc/node-postgres (pg) - https://node-postgres.com
- https://github.com/vitaly-t/pg-promise - Adds features to node-postgres
- https://github.com/gajus/slonik - Built on top of node-postgres
- https://github.com/porsager/postgres

Query Builder

- https://github.com/knex/knex - https://knexjs.org
  - See Stop using Knex.js: https://gajus.medium.com/stop-using-knex-js-and-earn-30-bf410349856c

ORM

- https://github.com/sequelize/sequelize
- https://github.com/typeorm/typeorm/
- https://github.com/mikro-orm/mikro-orm

Data mapper

- https://gitlab.com/dmfay/massive-js

Generate TypeScript from SQL

- https://github.com/adelsz/pgtyped

## Sample code repos and starters

- https://github.com/hagopj13/node-express-boilerplate
  - REST, MongoDB, Docker, JWT (in Authorization header, not in cookie), reset password, verify email, testing with Jest, supertest and node-mocks-http
- https://github.com/ljlm0402/typescript-express-starter
  - Express, TypeScript, pg, TypeORM, GraphQL, Docker
- https://github.com/kriasoft/node-starter-kit
  - Node.js / GraphQL project template pre-configured with TypeScript, PostgreSQL, login flow, transactional emails, unit tests, CI/CD workflow.
  - GraphQL, PostgreSQL, JWT stored in cookie
- https://github.com/kriasoft/relay-starter-kit
  - Monorepo template (seed project) pre-configured with GraphQL API, PostgreSQL, React, Relay, Material UI.
  - (Full Stack) Terraform, SPA with React, GraphQL, Relay, PostgreSQL (Google Cloud SQL, Knex), session cookie
- https://github.com/danielfsousa/express-rest-boilerplate
  - Docker
- https://github.com/guardian/gateway
  - React, Redis, Cypress, Jest, [Rate limit](https://github.com/guardian/gateway/tree/main/src/server/lib/rate-limit)
- https://github.com/async-labs/builderbook - https://builderbook.org/
  - Open source web application to learn JS stack: React, Material-UI, Next.js, Node.js, Express.js, Mongoose, MongoDB database.
  - AWS Cloudfront
- https://github.com/diegohaz/rest
  - REST API generator with Node.js, Express and Mongoose
  - Password reset,
- https://github.com/ljlm0402/typescript-express-starter
  - Quick and Easy TypeScript Express Starter
  - Docker, auth with JWT in cookie (see the 'default' template), GraphQL, TypeORM, Sequelize
- https://github.com/tanem/express-bookshelf-realworld-example-app
  - Docker
- https://github.com/sahat/hackathon-starter
  - A boilerplate for Node.js web applications
  - Not really good, very basic. MongoDB

## HTTP2

https://github.com/azat-co/practicalnode/blob/master/chapter13/chapter13.md

## Docker

https://github.com/azat-co/practicalnode/blob/master/chapter15/chapter15.md
