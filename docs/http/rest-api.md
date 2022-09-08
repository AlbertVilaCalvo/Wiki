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

## CRUD Routes

| Method | Route             | Action | HTML | Description                                | Success Code                                               | Failure Code                                                                        | Request Body | Response Body                                 |
| ------ | ----------------- | ------ | :--: | ------------------------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------------------- | :----------: | --------------------------------------------- |
| GET    | `/users`          | index  |      | List all users                             | 200 OK                                                     | 404 Not Found                                                                       |      ✖       | Resource list                                 |
| GET    | `/users/:id`      | show   |      | Get single user                            | 200 OK                                                     | 404 Not Found                                                                       |      ✖       | Resource                                      |
| GET    | `/users/new`      | new    |  ✓   | Render create form                         | 200 OK                                                     | 404 Not Found                                                                       |      ✖       | HTML                                          |
| POST   | `/users`          | create |      | Create new user                            | 201 Created                                                | 400 Bad Request or 422 Unprocessable Entity if malformed, 409 Conflict if duplicate |   Resource   | Location header + status - [see below](#post) |
| GET    | `/users/:id/edit` | edit   |  ✓   | Render edit form                           | 200 OK                                                     | 404 Not Found                                                                       |      ✖       | HTML                                          |
| PUT    | `/users/:id`      | update |      | Update user, or create if it doesn't exist | 200 OK or 204 No Content if updated, otherwise 201 Created |                                                                                     |   Resource   | Optional                                      |
| PATCH  | `/users/:id`      | update |      | Update user, partial                       | 200 OK or 204 No Content                                   | 404 Not Found                                                                       |   Resource   | Optional                                      |
| DELETE | `/users/:id`      | delete |      | Delete user                                | 200 OK or 204 No Content                                   |                                                                                     |      ✖       | Entity describing status or nothing           |

Notes:

- Use 204 No Content if the response has no body, otherwise 200 OK.
- [202 Accepted](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) can be used if the operation is accepted but action is deferred.

### GET

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET

Request has no body, response does.

### POST

Response should have "a Location header field that provides an identifier for the primary resource created and a representation that describes the status of the request while referring to the new resource(s)".

Source: https://stackoverflow.com/a/49054482/4034572

Also see: https://stackoverflow.com/questions/1226810/is-http-post-request-allowed-to-send-back-a-response-body

If the request is malformed (eg a missing parameter) you can use either 400 Bad Request or 422 Unprocessable Entity. See:

- https://stackoverflow.com/questions/16133923/400-vs-422-response-to-post-of-data
- https://stackoverflow.com/questions/3050518/what-http-status-response-code-should-i-use-if-the-request-is-missing-a-required

### POST if the resource already exists (eg duplicate username or email)

409 Conflict

- HTTP response code for POST when resource already exists - https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
- What's a proper response status code to REST POST request when duplicate is found? - https://stackoverflow.com/questions/9414374/whats-a-proper-response-status-code-to-rest-post-request-when-duplicate-is-foun
- Which HTTP response code for "This email is already registered"? - https://stackoverflow.com/questions/9269040/which-http-response-code-for-this-email-is-already-registered
- 422 or 409 status code for existing email during signup - https://stackoverflow.com/questions/50946698/422-or-409-status-code-for-existing-email-during-signup
- HTTP Status Code for username already exists when registering new account - https://stackoverflow.com/questions/26587082/http-status-code-for-username-already-exists-when-registering-new-account

### PUT

PUT creates a resource if it doesn't exist, or updates it if it does (UPSERT).

### PATCH

Return 404 if the resource does not exist.

According to https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#742-patch it should support UPSERT.

### DELETE

https://stackoverflow.com/questions/6439416/status-code-when-deleting-a-resource-using-http-delete-for-the-second-time

https://stackoverflow.com/questions/6581285/is-a-response-body-allowed-for-a-http-delete-request

https://stackoverflow.com/questions/25970523/restful-what-should-a-delete-response-body-contain

### CRUD Examples

- https://hexdocs.pm/phoenix/routing.html#resources
- https://guides.rubyonrails.org/routing.html#crud-verbs-and-actions
- https://cloud.google.com/apis/design/standard_methods

## Fake API

https://httpstat.us

## REST vs RPC

https://cloud.google.com/blog/products/application-development/rest-vs-rpc-what-problems-are-you-trying-to-solve-with-your-apis

> the RPC model makes it very simple and direct for programmers to write a procedure in one program and call it from another. This is one of the characteristics that makes RPC so popular, but it also makes it easy for technology and use-case assumptions to flow easily from one application to the other, thereby coupling the two and making the system brittle.

## Guidelines

- https://github.com/microsoft/api-guidelines
- https://cloud.google.com/apis/design/
- https://opensource.zalando.com/restful-api-guidelines/
- https://github.com/shieldfy/API-Security-Checklist

## Examples

- Jira - https://docs.atlassian.com/software/jira/docs/api/REST/9.2.0/
- Stripe - https://stripe.com/docs/api
