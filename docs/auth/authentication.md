---
title: Authentication
---

https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

https://www.keycloak.org

https://github.com/teesloane/Auth-Boss

## API Routes

| Action           | Method | Route                   | HTML | Auth Token | Success Code             | Failure Code                                                                                      |                          Request Body                          | Response Body |
| ---------------- | ------ | ----------------------- | :--: | :--------: | ------------------------ | ------------------------------------------------------------------------------------------------- | :------------------------------------------------------------: | ------------- |
| Register form    | GET    | `/register`             |  ✓   |            | 200 OK                   | 404 Not Found                                                                                     |                               ✖                                | HTML          |
| Register         | POST   | `/auth/register`        |      |            | 201 Created              | 400 Bad Request if missing fields, 409 Conflict if email/username already exist                   |              Email, password, name, username etc               | Tokens, User  |
| Login form       | GET    | `/login`                |  ✓   |            | 200 OK                   | 404 Not Found                                                                                     |                               ✖                                | HTML          |
| Login            | POST   | `/auth/login`           |      |            | 200 OK                   | 400 Bad Request if missing fields, 200 + error if wrong password or email/username not registered |                  Email/username and password                   | Tokens, User  |
| Logout           | POST   | `/auth/logout`          |      |     ✓      | 200 OK or 204 No Content | 401 Unauthorized                                                                                  |                               ✖                                | Optional      |
| Recover password | POST   | `/auth/reset-password`  |      |    ✓\*     | 200 OK or 204 No Content | 401 Unauthorized                                                                                  |                          New password                          | Optional      |
| Change password  | POST   | `/auth/change-password` |      |     ✓      | 200 OK or 204 No Content | 401 Unauthorized, 400 Bad Request if missing field, 200 + error if wrong password                 | Current and new password, optionally new password confirmation | Optional      |
| Delete account   | POST   | `/auth/delete-account`  |      |     ✓      | 200 OK or 204 No Content | 401 Unauthorized                                                                                  |                        Current password                        | Optional      |
| Get my user      | GET    | `/account/profile`      |      |     ✓      | 200 OK                   | 401 Unauthorized                                                                                  |                               ✖                                | User          |
| Update my user   | PATCH  | `/account/profile`      |      |     ✓      | 200 OK or 204 No Content | 401 Unauthorized, 400 Bad Request if missing field                                                |                          User fields                           | Optional      |

See CSRF: https://next-auth.js.org/getting-started/rest-api

### Logout use POST not GET

Logout: GET or POST? - https://stackoverflow.com/questions/3521290/logout-get-or-post

> Signing the user out is a POST submission to prevent malicious links from triggering signing a user out without their consent. [source](https://next-auth.js.org/getting-started/rest-api#post-apiauthsignout)

### Register with an email or username that already exists

409 Conflict

- Which HTTP response code for "This email is already registered"? -https://stackoverflow.com/questions/9269040/which-http-response-code-for-this-email-is-already-registered
- 422 or 409 status code for existing email during signup - https://stackoverflow.com/questions/50946698/422-or-409-status-code-for-existing-email-during-signup
- HTTP Status Code for username already exists when registering new account - https://stackoverflow.com/questions/26587082/http-status-code-for-username-already-exists-when-registering-new-account

### Login with wrong credentials

401 Unauthorized doesn't make sense as a response to login request, since it is for a request that lacks or doesn't have correct authentication credentials, and the response "MUST send a WWW-Authenticate header field (Section 4.1) containing at least one challenge applicable to the target resource." ([source](https://www.rfc-editor.org/rfc/rfc7235#section-3.1)).

Return 200 with an error message.

- What's the appropriate HTTP status code to return if a user tries logging in with an incorrect username / password, but correct format? https://stackoverflow.com/questions/32752578/whats-the-appropriate-http-status-code-to-return-if-a-user-tries-logging-in-wit
- Which HTTP status code to say username or password were incorrect? - https://stackoverflow.com/questions/26093875/which-http-status-code-to-say-username-or-password-were-incorrect
- Correct HTTP status code for login form? - https://stackoverflow.com/questions/6110672/correct-http-status-code-for-login-form
- What status code should a REST API return for login requests performed with wrong credentials? - https://stackoverflow.com/questions/45357111/what-status-code-should-a-rest-api-return-for-login-requests-performed-with-wron

Django returns 200:

- Django login with wrong credentials returns 200 not 401 - https://stackoverflow.com/questions/25839434/django-login-with-wrong-credentials-returns-200-not-401
- Django Rest Framework - Why is a 200 status code returned when trying to login a user using incorrect credentials? - https://stackoverflow.com/questions/32728935/django-rest-framework-why-is-a-200-status-code-returned-when-trying-to-login-a

Wordpress returns 200:

- Return HTTP status code 401 upon failed login - https://core.trac.wordpress.org/ticket/25446

## Single Page Apps

Part 1: How to store an access token in your SPA - https://jcbaey.com/authentication-in-spa-reactjs-and-vuejs-the-right-way/

How to use an Identity Provider to identify users and provides SSO in your SPA (ODIC, OAuth2 concepts) - https://jcbaey.com/oauth2-oidc-best-practices-in-spa/

https://povio.com/blog/handling-authentication-in-spa-with-jwt-and-cookies/

https://dev.indooroutdoor.io/authentication-patterns-and-best-practices-for-spas

> - Option 1: Stateful session with cookie
> - Option 2: Stateless JWT authentication
> - Option 3: OpenID connect

https://curity.io/resources/learn/spa-best-practices/

> If the APIs reside in a different domain from the SPAs, the APIs must support Cross-Origin Resource Sharing (CORS) for the browsers to allow the cross-domain communications to take place.

> From the OAuth perspective, an SPA exhibits the following:
>
> - It must be a public client
>
> An SPA is deemed a public client since it cannot hold a secret. Such a secret would be part of the JavaScript loaded by the website and, thus, be accessible to anyone inspecting the source code.
>
> - Tokens are available in the browser
>
> As tokens are used when communicating with APIs, they are available in the browser. Consequently, they can be obtained by common Open Web Application Security Project (OWASP) defined attacks like Cross-Site Scripting (XSS).
>
> - Storage mechanisms are unsafe
>
> It is not possible to store something in the browser safely over a long time without using a back end to secure it. Any browser-based storage mechanism is susceptible to attacks.
>
> - Token lifetimes should be kept short
>
> With the before mentioned properties, it stands to reason that any token issued for an SPA should have a lifetime that is as short as possible. The risk of using a longer-lived token needs to be weighed against the potential damage that leakage of such a token can cause.

> Because of the issues outlined above, the best security recommendation for an SPA is to avoid keeping tokens in the browser at all. This can be achieved with the help of a lightweight back-end component, often described as a Backend-For-Frontend.
>
> The backend component can then be configured as a confidential OAuth client and used to keep tokens away from the browser. It can either be stateful and keep tokens in custom storage, or stateless and store the tokens in encrypted HTTP-only, same-site cookies. Whichever variant is chosen, the backend component creates a session for the SPA, using HTTP-only, secure, same-site cookies, thus enabling a high level of security.
>
> Such cookies cannot be read by scripts and are limited to the domain of the SPA. When combined with strict Content Security Policy headers, such architecture can provide a robust protection against stealing tokens. It should be noted, though, that introducing a cookie-based session for the SPA means that it can get vulnerable to Cross-Site Request Forgery attacks (CSRF), and appropriate protections should be put in place.
