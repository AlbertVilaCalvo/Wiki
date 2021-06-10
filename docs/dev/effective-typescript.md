---
title: Effective TypeScript
---

### 1 - Relationship between JS and TS

- Some errors only happen if you explicitly add type annotations.
- Code can pass the type-checker and throw at runtime.

### 2 - Options

- The language changes depending on how it's configured in tsconfig.json, which is something most languages don't allow.
- Most important config options are `noImplicitAny` and `strictNullChecks`.
- For new projects start with `noImplicitAny` on, so that you write types as you write code.
- Enable `noImplicitAny` first, then `strictNullChecks`.
- Use `strict` to enable  `noImplicitAny`, `strictNullChecks`, `noImplicitThis`, `strictFunctionTypes`...
- `strict` is where you want to wind up.
