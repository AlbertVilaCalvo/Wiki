---
title: Passwords
---

## Don't use MD5 and SHA-1 for passwords

Use other hash functions that require more compute power (ie which are slower).

https://en.wikipedia.org/wiki/Hash_function_security_summary

https://security.stackexchange.com/questions/19906/is-md5-considered-insecure

https://security.stackexchange.com/questions/4781/do-any-security-experts-recommend-bcrypt-for-password-storage

https://freerainbowtables.com

## Password salt

Even if 2 users use the same password, since the salt is different, the resulting hash will be different. This means that to get the password from the hash we need to generate a rainbow table for each salt.

Salts must be:

- long enough to make impractical to brute force or generate rainbow tables
- truly random

https://www.youtube.com/watch?v=UOBe3JXQbwo
