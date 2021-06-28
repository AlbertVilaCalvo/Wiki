---
title: Effective TypeScript
---


## 1 - Getting to know TypeScript

### 1 - Relationship between JS and TS

- Some errors only happen if you explicitly add type annotations.
- Code can pass the type-checker and throw at runtime.

### 2 - Compiler options

- The language changes depending on how it's configured in tsconfig.json, which is something most languages don't allow.
- Most important config options are `noImplicitAny` and `strictNullChecks`.
- For new projects start with `noImplicitAny` on, so that you write types as you write code.
- Enable `noImplicitAny` first, then `strictNullChecks`.
- Use `strict` to enable  `noImplicitAny`, `strictNullChecks`, `noImplicitThis`, `strictFunctionTypes`...
- `strict` is where you want to wind up.

### 3 - Code generation is independent of types

- tsc does 2 things: type-checks and transpiles JS to older versions. Both are independent.
- Code output is independent of types.
- Unlike Java or C, tsc will emit JS even when there are type errors. This allows you to work on the app without having to fix all the type errors before.
- Types cannot affect runtime behavior of code.
- You cannot check TypeScript types at runtime, ie you can't do `if (x instanceof SomeInterface) ...`.
- To ascertain a type you need some way to recognize the type at runtime, eg checking properties with the `in` operator, or adding a `kind` field on a tagged union.
- However, whereas a `interface` only introduces a type, a `class` introduces both a type (not available at runtime) and a value (available at runtime). Hence, we can use `instanceof` with a class. Thus, some times a class will be used as a type and others as a value.
- Type operations do not affect runtime values. Hence doing `x as string` does nothing - it's translated as `x` by the compiler.
- The actual type can be different than the declared type, nothing enforces this.
- You cannot have an overloaded function based on types. You can have multiple signatures but only one implementation.
- TypeScript types are 'zero cost', they don't affect runtime performance.

### 4 - Structural typing

- A value may have more properties than the declared on the interface. Hence we can't do `Object.keys()` and expect a determined result.
- ☢️ Classes also follow structural typing, ie you can assign an object to a class. You can have surprises if you have logic on the constructor. And you may not have an instance of the class!
- ℹ️⚡️ Avoid mocks in unit tests by defining narrower interfaces.

### 5 - Avoid `any`

- `any` eliminates many of the advantages of TypeScript.
- `any` disables autocomplete, inline documentation and language service features like rename refactor.
- `any` masks bugs when refactoring.
- `any` hides the type design. Better write it so that it is explicit.
- TypeScript with lots of `any` can be harder than regular JavaScript because you have to fix the type errors _and_ still keep track of types in your head.


## 2 - Type system

### 6 - Editor

- There are 2 executables: `tsc` and `tsserver`. The server provides language services (autocomplete, inspection, navigation, refactoring...).
- In JavaScript `typeof null` is "object".

### 7 - Types are best thought as sets of values

- `keyof (A&B) = (keyof A) | (keyof B)`
- `keyof (A|B) = (keyof A) & (keyof B)`
- ℹ️ Important: an object can still belong to a type even if it has additional properties that were not mentioned in the type declaration.

### 8 - Symbols in value space or type space

- 💡 One of the best ways to see if something is on the type or value space is with the playground: https://www.typescriptlang.org/play. Symbols that disappear on JS are on the types space.
- 'abc' can be a string literal or a string literal type.
- Something after a `:` or `as` is in the type space. Everything after an `=` is in the value space.
- ⚡️ `class` and `enum` introduce both a type and a value.
- The TypeScript type introduced by a class is based on its shape (properties and methods) while the value is the constructor (a function).
- `typeof` means different things in a type or value context:
```
interface User {
  name: string
  age: number
}
function canDrive(user: User): boolean {
  return user.age > 18
}
const user = {name: 'Ot', age: 22}

type T = typeof user //  Type is { name: string; age: number; }
const v = typeof user // Value is "object" (the JavaScript runtime type)

type T2 = typeof canDrive // Value is (user: User) => boolean
const v2 = typeof canDrive // Value is "function" (the JavaScript runtime type)
```
- `typeof` always operates on values, you can't apply it to types.
- Since `class` introduces both a type and a value, `typeof` a class depends on the context:
```
class Person {
  name: string;
}
type T3 = typeof Person; // Type is typeof Person
const v3 = typeof Person; // Value is "function", the constructor function
```
- Use `InstanceType` to 'construct a type consisting of the instance type of a constructor function' ([docs](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)).
- `obj['field']` and `obj.field` are equivalent in value space, but you must use `obj['field']` to get the type of a type's property.
