---
title: Passwords
---

https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

Password Strength Testing Tool - https://bitwarden.com/password-strength

Password Generators

- https://bitwarden.com/password-generator
- https://1password.com/password-generator

## Length

Min 8, max 64. See https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#implement-proper-password-strength-controls

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

See 'Salts Will Not Help You': https://codahale.com/how-to-safely-store-a-password/

How to securely hash passwords? - https://security.stackexchange.com/questions/211/how-to-securely-hash-passwords

## bcrypt

Does bcrypt have a maximum password length? - https://security.stackexchange.com/questions/39849/does-bcrypt-have-a-maximum-password-length

Password max length with bcrypt, blowfish - https://stackoverflow.com/questions/24751279/password-max-length-with-bcrypt-blowfish

## TOTP

Time-Based One-Time Password Algorithm

RFC 6238 - https://datatracker.ietf.org/doc/html/rfc6238

FIDO2 security key providers - https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless#fido2-security-key-providers

## Passwordless

_Password-based security is an oxymoron_ - https://venturebeat.com/security/google-passkeys-chrome-android/

https://developer.apple.com/passkeys

About the security of passkeys - https://support.apple.com/en-us/HT213305

Passkeys were introduced in Safari 16.0 (Sept 2022) - https://webkit.org/blog/13152/webkit-features-in-safari-16-0/

https://www.apple.com/newsroom/2022/10/macos-ventura-is-now-available

> Whenever users create a passkey, a unique digital key is created that stays on device and is never stored on a web server, so hackers can’t leak them or trick users into sharing them. With passkeys, it’s easy for users to sign in securely using Touch ID or Face ID for biometric verification, and passkeys are securely synced with end-to-end encryption using iCloud Keychain so they are available across Apple devices including Mac, iPhone, and iPad. Passkeys also work across apps and the web, and users can even sign in to websites or apps on non-Apple devices using their iPhone.

https://learn.microsoft.com/en-us/azure/active-directory/authentication/concept-authentication-passwordless
