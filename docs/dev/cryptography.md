---
title: Cryptography
---

An illustrated guide to the Advanced Encryption Standard (AES) - https://www.thoughtworks.com/insights/blog/privacy/illustrated-guide-advanced-encryption-standard

## Hashing vs Encryption

- **Encryption**. Two-way function, reversible. We can go back and obtain the original text if we have the key. A secret key is required. Used to transfer data safely. Eg: RSA, AES
  - Symmetric: same key is used for encrypting and decrypting.
  - Asymmetric (aka public-key).
- **Hashing**. One-way function. We can't recover the original text. A key is not required. Used to verify data. Eg: MD5, SHA256, bcrypt, scrypt

https://eric.mann.blog/hashing-is-not-encryption - https://news.ycombinator.com/item?id=29855212
