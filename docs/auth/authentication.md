---
title: Authentication
---

https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

https://www.keycloak.org

https://github.com/teesloane/Auth-Boss

https://www.manning.com/books/api-security-in-action

https://thecopenhagenbook.com - A basic guideline on implementing auth for the web - https://github.com/pilcrowonpaper/copenhagen

https://lucia-auth.com

## API Routes

| Action                             | Method    | Route                                | HTML | Auth Token | Notes                                                                                             | Success Code             | Failure Code                                                                                      |                      Request Body                       | Response Body |
| ---------------------------------- | --------- | ------------------------------------ | :--: | :--------: | ------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------- | :-----------------------------------------------------: | ------------- |
| Register form page                 | GET       | `/register`                          |  ✓   |            |                                                                                                   | 200 OK                   | 404 Not Found                                                                                     |                           ✖                            | HTML          |
| Register                           | POST      | `/auth/register`                     |      |            |                                                                                                   | 201 Created              | 400 Bad Request if missing fields, 409 Conflict if email/username already exist                   |           Email, password, name, username etc           | Tokens, User  |
| Login form page                    | GET       | `/login`                             |  ✓   |            |                                                                                                   | 200 OK                   | 404 Not Found                                                                                     |                           ✖                            | HTML          |
| Login                              | POST      | `/auth/login`                        |      |            |                                                                                                   | 200 OK                   | 400 Bad Request if missing fields, 200 + error if wrong password or email/username not registered |                Email/username + password                | Tokens, User  |
| Logout                             | POST      | `/auth/logout`                       |      |     ✓      |                                                                                                   | 200 OK or 204 No Content | 401 Unauthorized                                                                                  |                            -                            | Optional      |
| Verify email page                  | GET       | `/email-verification?token=${token}` |  ✓   |            |                                                                                                   | 200 OK                   | 404 Not Found                                                                                     |                           ✖                            | Optional      |
| Verify email                       | POST      | `/auth/email-verification`           |      |            | Set user `validated` true. Invalidates token. Token can be used once only → not idempotent → POST | 200 OK or 204 No Content | 200 with error message if token expired                                                           |             Token from the URL query string             | Optional      |
| Reset password, send email to user | POST      | `/auth/password-reset/email`         |      |            | Generates new token (which should expire) + sends email with link → not idempotent → POST         | 200 OK or 204 No Content |                                                                                                   |                          Email                          | Optional      |
| Reset password form page           | GET       | `/password-reset?token=${token}`     |  ✓   |            |                                                                                                   | 200 OK or 204 No Content |                                                                                                   |                           ✖                            | HTML          |
| Reset password form submission     | POST      | `/auth/password-reset`               |      |            | Invalidates token. Token can be used once only → not idempotent → POST                            | 200 OK or 204 No Content |                                                                                                   |     Token from the URL query string + new password      | Optional      |
| Change password                    | PUT       | `/auth/change-password`              |      |     ✓      |                                                                                                   | 200 OK or 204 No Content | 401 Unauthorized, 400 Bad Request if missing field, 200 + error if wrong password                 | Current + new password, optionally new password confirm | Optional      |
| Delete account                     | POST      | `/auth/delete-account`               |      |     ✓      |                                                                                                   | 200 OK or 204 No Content | 401 Unauthorized                                                                                  |                    Current password                     | Optional      |
| Get my user                        | GET       | `/account/profile`                   |      |     ✓      |                                                                                                   | 200 OK                   | 401 Unauthorized                                                                                  |                           ✖                            | User          |
| Update my user                     | PUT/PATCH | `/account/profile`                   |      |     ✓      |                                                                                                   | 200 OK or 204 No Content | 401 Unauthorized, 400 Bad Request if missing field                                                |                       User fields                       | Optional      |

See CSRF: https://next-auth.js.org/getting-started/rest-api

### Use POST not GET for logout, email triggers etc

> Confirmation links using GET can cause problems as they might be auto-confirmed by prefetching and so on. [source](https://stackoverflow.com/questions/39690159/whats-the-rest-way-to-verify-an-email?noredirect=1&lq=1#comment87866692_39690463)

Logout: GET or POST? - https://stackoverflow.com/questions/3521290/logout-get-or-post

Don't Let Users Confirm Via HTTP GET - https://www.artima.com/weblogs/viewpost.jsp?thread=152805

> **scheme violates the rule not to change state as a result of a GET**
> Prefetching is a good example of why you should avoid using one-click confirmation emails. Google has a tool called Web Accelerator that you can install in your browser to speed up your experience of surfing of the web. Among other techniques, the Web Accelerator prefetches URLs mentioned on the page you are looking at

> Signing the user out is a POST submission to prevent malicious links from triggering signing a user out without their consent. [source](https://next-auth.js.org/getting-started/rest-api#post-apiauthsignout)

User's browser seems to trigger requests multiple times a day - https://stackoverflow.com/questions/50365264/users-browser-seems-to-trigger-requests-multiple-times-a-day

> We have a HTTP GET URL which triggers an email. The URL was sent out in a mailing so it is not possible without further consequences to make it a POST URL. Currently we face the problem that a user is getting such confirmation mails multiple times a day.

### Register with an email or username that already exists

Error messages: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#account-creation

409 Conflict

- Which HTTP response code for "This email is already registered"? -https://stackoverflow.com/questions/9269040/which-http-response-code-for-this-email-is-already-registered
- 422 or 409 status code for existing email during signup - https://stackoverflow.com/questions/50946698/422-or-409-status-code-for-existing-email-during-signup
- HTTP Status Code for username already exists when registering new account - https://stackoverflow.com/questions/26587082/http-status-code-for-username-already-exists-when-registering-new-account

### Login with wrong credentials

Error messages: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#login

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

### Recover/Reset password

Password recovery messages: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#password-recovery

RESTful password reset - https://stackoverflow.com/questions/3077229/restful-password-reset

> PUT requests should be idempotent (i.e. repeated requests should not affect the outcome)

Examples:

- Heroku:
  - At the login page https://id.heroku.com/login clicking the link 'Forgot your password?' sends you to https://id.heroku.com/account/password/reset
  - This page has a title 'Reset Password', a form with 1 input to enter your email and the button is 'Reset Password'
  - After submitting the form, it disappears and its replaced with the message "Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address."
  - You receive an email "Reset your Heroku password" with a link https://id.heroku.com/account/password/reset/280a6f2f2bff0a585772887122c390cb and the text "Someone (hopefully you) has requested a password reset for your Heroku account. Follow the link below to set a new password:Someone (hopefully you) has requested a password reset for your Heroku account. Follow the link below to set a new password: (link) If you don't wish to reset your password, disregard this email and no action will be taken."
  - Clicking the link does a **redirect** to https://id.heroku.com/account/password/reset/edit. This page has a form with 2 input fields, 'New password' and 'Confirm new password', and the button is 'Save Password'. After setting the new password you are sent to the login page, where you can login.

### Change password

Validate/Change Password via REST API - https://stackoverflow.com/questions/8231430/validate-change-password-via-rest-api

## Verify email flow

- https://stackoverflow.com/a/39093058/4034572 - How to confirm email address using express/node?
- https://stackoverflow.com/a/3237506/4034572 - validation link via email
- https://stackoverflow.com/a/14128171/4034572 - Best practices with creating an e-mail verification link?

What's the REST way to verify an email? - https://stackoverflow.com/questions/39690159/whats-the-rest-way-to-verify-an-email

> Does it fire an email after validating the user for example? If so, it is not an idempotent method and you should use POST.

UX:

- Best way to handle new user registration when email verification is required - https://ux.stackexchange.com/questions/109958/best-way-to-handle-new-user-registration-when-email-verification-is-required
  - > the best rule is to allow them to do and see anything that doesn't strictly require email verification -- e.g., view community content, make and edit a profile, etc.
- Limiting access before email address is confirmed - https://ux.stackexchange.com/questions/29145/limiting-access-before-email-address-is-confirmed
  - > immediately send the email, but allow them to access non-critical areas of the site in the meantime.
  - > Dead accounts are usually not much of a cost to a service, whereas ensuring that you maximise volume of signups is usually quite important.

When changing an email:

- Is a "Confirm Email" input good practice when user changes email address? - https://stackoverflow.com/questions/4880/is-a-confirm-email-input-good-practice-when-user-changes-email-address
  - > I've seen plenty of people type their email address wrong and I've also looked through user databases full of invalid email address.
  - > I tend to have it send a verification code to the email address specified (and only ask for it once), and not change the email address until the user has entered the code I sent them.
- What is the suggested best practice for changing a user's email address? - https://security.stackexchange.com/questions/234060/what-is-the-suggested-best-practice-for-changing-a-users-email-address
  - > You will receive a confirmation email to the new address you provide. This will assure you typed in the e-mail correctly

Examples:

- https://acloud.guru
  - Link: https://acloudguru.auth0.com/u/email-verification?ticket=wsr9SznW4H4UtWc9xEZgZRZO6aHm7PCV#
  - Text: Thank you for signing up for your new account! To complete your account setup, please verify abcd@gmail.com is your email by clicking the following link. This link is valid for the next 7 days
- Monica CRM
  - Link: https://app.monicahq.com/email/verify/33418/5b17c69ac6fbf8b48d2971eb36660c918be330d6?expires=1667157634&signature=570844048cb502bb8206ab1bde884a204992cf37760f743fa676e12a260614d1
  - Text: Para validar tu email haz click en el botón de abajo
- Figma
  - Link: https://www.figma.com/email/validate/stv2-1176440661f457cde51092fa2ccf1e94355cd2d9860f1ef14d293654456-b4c807a6648a785b517ed467-1669029713
  - Text: Verify your email address. To start using Figma, just click the verify email button below:

## Passwordless authentication via email

What Medium and Vercel do.

Link format:

- Medium: https://medium.com/m/callback/email?token=4bf8e82a7a5&operation=login&state=medium
- Vercel: https://vercel.com/confirm?email=albertvila%40gmail.com&token=lYL0YtkuV0Xu6Djqt1GLjv0N&mode=login
  - Note that they also add an extra code/text that is sent on the email

## Single Page Apps

Single-page application OAuth login using authorization code grant with JWTs and refresh tokens - https://fusionauth.io/learn/expert-advice/authentication/spa/oauth-authorization-code-grant-jwts-refresh-tokens-cookies

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

## TOTP

Time-Based One-Time Password Algorithm

RFC 6238 - https://datatracker.ietf.org/doc/html/rfc6238

FIDO2 security key providers - https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless#fido2-security-key-providers

## Passkeys

_Password-based security is an oxymoron_ - https://venturebeat.com/security/google-passkeys-chrome-android/

https://passage.id - https://blog.1password.com/1password-acquires-passage

https://developer.apple.com/passkeys

About the security of passkeys - https://support.apple.com/en-us/HT213305

Passkeys were introduced in Safari 16.0 (Sept 2022) - https://webkit.org/blog/13152/webkit-features-in-safari-16-0/

https://www.apple.com/newsroom/2022/10/macos-ventura-is-now-available

> Whenever users create a passkey, a unique digital key is created that stays on device and is never stored on a web server, so hackers can’t leak them or trick users into sharing them. With passkeys, it’s easy for users to sign in securely using Touch ID or Face ID for biometric verification, and passkeys are securely synced with end-to-end encryption using iCloud Keychain so they are available across Apple devices including Mac, iPhone, and iPad. Passkeys also work across apps and the web, and users can even sign in to websites or apps on non-Apple devices using their iPhone.

https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless

Understand passkeys in 4 minutes - https://www.youtube.com/watch?v=2xdV-xut7EQ

Passwordless login with passkeys - https://developers.google.com/identity/passkeys/

# WebAuthn

WebAuthn: what it is, and how it works - https://blog.1password.com/what-is-webauthn
