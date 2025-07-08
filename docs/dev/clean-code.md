---
title: Clean Code
---

> Adding manpower to a late software project makes it later. [Brooks's law](https://en.wikipedia.org/wiki/Brooks%27s_law)

Rebuilding from scratch is not a solution. You need to incrementally re-design the current software.

You'll not go fast if you make a mess. If you make a mess in the morning, it will slow you down in the afternoon.

> The only way to make the deadline — the only way to go fast — is to keep the code as clean as possible at all times.

> Clean code always looks like it was written by someones who cares. Michael Feathers

Code is read much more than it is written.

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Martin Fowler

Good programmers communicate with people, not just the machine.

**First make it work, and then make it right.**

Boy scout rule: leave the campground cleaner than you found it. Every time you check in code, take some time to make it better. Maybe add some tests.

## Meaningful names

https://github.com/kettanaito/naming-cheatsheet

The name of a function should correspond inversely to the size of its scope.

- Public functions and functions with big scope (higher abstraction level) usually have shorter names.
- On the contrary, functions that are not called often usually have longer names. These are the functions at a lower level of abstraction (lower scope), private functions, and also functions in tests.

A name that requires a comment does not reveal its intent.

A variable name should tell the significance of what the variable contains, eg:

- ❌ `int elapsedTime;`
- ✅ `int elapsedTimeInDays;`

# Functions

Rules:

1. Functions should be _small_.
2. They should be _smaller than that_.

Extract, extract, extract... When you cannot extract anything from a function, then it does one thing.

When you extract code to helper functions, you have to name them. And **when you name, you communicate**.

Sometimes you need to pass many arguments to the helper functions, to the point that it's not worth having them. Judge if it's worth to extract functions.

Large functions are really classes.

Boolean arguments sign that the function does more than one thing.

## Comments

Write Javadoc in public API functions (eg libraries), but not for internal code consumed by yourself.

Never leave commented code, delete it.
