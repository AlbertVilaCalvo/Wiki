---
title: JWT
---

_JSON Web Token_

https://en.wikipedia.org/wiki/JSON_Web_Token

https://jwt.io

JWT are self-contained.

The contained information is public, anyone can read/decode it. Do not store sensitive information into it.

Anatomy of a JWT: https://news.ycombinator.com/item?id=30499618 - https://fusionauth.io/learn/expert-advice/tokens/anatomy-of-jwt

Security cheatsheet: https://assets.pentesterlab.com/jwt_security_cheatsheet/jwt_security_cheatsheet.pdf

## Stateless

https://stackoverflow.com/questions/55881611/why-jwt-is-a-stateless-authentication

https://www.jbspeakr.cc/purpose-jwt-stateless-authentication

## Format

`header.payload.signature`

Since anyone can produce a JWT token, the signature is used to verify the authenticity. This way only the server can issue new tokens using the secret.

signature = hash_algorithm(secret, base64urlEncoding(header) + '.' base64urlEncoding(payload))
