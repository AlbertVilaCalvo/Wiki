---
title: Authentication
---

https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

https://www.keycloak.org/

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
