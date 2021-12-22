---
title: REST API
---

Endpoints should be based on resources, not on actions. The request method determines the action.

Use nouns (not verbs) in the path, since the request method already has the verb.

- Good: `https://example.com/users`
- Bad: `https://example.com/create-user`

Limit levels/nesting to maximum `collection/<id>/collection`.

- Good: `https://example.com/employee/3/tasks`
- Bad: `https://example.com/company/4/employee/3/tasks`

## Idempotent and Safe

https://stackoverflow.com/questions/45016234/what-is-idempotency-in-http-methods

https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

**Idempotent**: can be applied multiple times without changing the result beyond the initial application ([source](https://en.wikipedia.org/wiki/Idempotence)).

**Safe**: it doesn't alter the state of the server, ie performs a read-only operation.

All safe methods are also idempotent, but not all idempotent methods are safe. For example, PUT and DELETE are both idempotent but unsafe.

| Verb   | Description                                                            | Idempotent                                                                            | Safe |
| ------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---- |
| GET    | Read                                                                   | Yes                                                                                   | Yes  |
| POST   | Create                                                                 | No (we create new records every time unless there's some duplicated field validation) | No   |
| PUT    | Replace existing record entirely (requires sending all fields)         | Yes (we can perform it multiple times, only the first PUT will take effect)           | No   |
| PATCH  | Partially update existing record (does not require sending all fields) | No (surprising, see why in https://stackoverflow.com/a/39338329/4034572)              | No   |
| DELETE | Delete                                                                 | Yes (we can delete the same record multiple times)                                    | No   |

## Fake API

https://httpstat.us
