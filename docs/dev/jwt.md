---
title: JWT
---

_JSON Web Token_

https://en.wikipedia.org/wiki/JSON_Web_Token

https://jwt.io

https://token.dev

JWT = JSON Data + Signature [source](https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens)

JWT are self-contained.

Anatomy of a JWT: https://news.ycombinator.com/item?id=30499618 - https://fusionauth.io/learn/expert-advice/tokens/anatomy-of-jwt

Security cheatsheet: https://assets.pentesterlab.com/jwt_security_cheatsheet/jwt_security_cheatsheet.pdf

## Encryption

JWT are signed and can optionally be encrypted too.

Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. [source](https://jwt.io/introduction)

Unless encrypted, the contained information is public, anyone can read/decode it. Hence, do not store sensitive information into it.

If you can decode JWT, how are they secure? - https://stackoverflow.com/questions/27301557/if-you-can-decode-jwt-how-are-they-secure

## Stateless

https://stackoverflow.com/questions/55881611/why-jwt-is-a-stateless-authentication

https://www.jbspeakr.cc/purpose-jwt-stateless-authentication

## Format

`header.payload.signature`

Since anyone can produce a JWT token, the signature is used to verify the authenticity. This way only the server can issue new tokens using the secret.

signature = hash_algorithm(secret, base64urlEncoding(header) + '.' base64urlEncoding(payload))

## Store JWT

Where to store JWT in browser? How to protect against CSRF? - https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf

Should JWT be stored in localStorage or cookie? - https://stackoverflow.com/questions/34817617/should-jwt-be-stored-in-localstorage-or-cookie

## Do not use it for user sessions

JSON Web Tokens (JWT) are Dangerous for User Sessions—Here’s a Solution - https://redis.com/blog/json-web-tokens-jwt-are-dangerous-for-user-sessions/

> The biggest problem with JWT is the token revoke problem

> Could have stale data
>
> Imagine the user is an admin and got demoted to a regular user with fewer permissions. Again this won’t take effect immediately and the user will continue to be an admin until the token expires.

> The state needs to be maintained anyway (for rate-limiting, IP-whitelisting, etc.)
>
> In many real-world apps, servers have to maintain the user’s IP and track APIs for rate-limiting and IP-whitelisting. So you’ll need to use a blazing fast database anyway. To think somehow your app becomes stateless with JWT is just not realistic.

> Where can I use it?
>
> There are scenarios where you are doing server-to-server (or microservice-to-microservice) communication in the backend and one service could generate a JWT token to send it to a different service for authorization purposes And other narrow places, such as reset password, where you can send a JWT token as a one-time short-lived token to verify the user’s email.

JWT should not be your default for sessions - https://news.ycombinator.com/item?id=27136539 - https://evertpot.com/jwt-is-a-bad-default/

> it’s not needed to have a system for session data, like Redis or a database. All the information is contained in the JWT, it means your infrastructure is in theory simpler. You’re potentially making fewer calls to a data-store on a per-request basis.

> cannot 'kill' a session without building complex (and stateful!) infrastructure to explicitly detect and reject them, defeating the entire point of using stateless JWT tokens to begin with.

Why JWTs Suck as Session Tokens - https://developer.okta.com/blog/2017/08/17/why-jwts-suck-as-session-tokens

> The way I like to think of JWTs is that they’re just some JSON data that you can verify came from someone you know.

> When the server receives a JWT, it can validate that it is legitimate and trust that the user is whoever the token says they are.
> The server can validate this token locally without making any network requests, talking to a database, etc. This can potentially make session management faster because instead of needing to load the user from a database (or cache) on every request, you just need to run a small bit of local code. This is probably the single biggest reason people like using JWTs: _they are stateless_.

> There are several cases in which JWTs can be useful. If you’re building API services that need to support server-to-server or client-to-server (like a mobile app or single page app (SPA)) communication, using JWTs as your API tokens is a very smart idea.

Ask HN: What's the current sentiment on JWT for stateless auth tokens? - https://news.ycombinator.com/item?id=21783303
