# Variables and Constants - Complete Guide

## Teaching Notes

- `let` creates block-scoped variables that you can reassign.
- `const` locks the binding; the reference cannot change, but objects/arrays can still mutate.
- `var` is function-scoped and hoisted; avoid it in modern projects to reduce bugs.
- Always declare before use. Strict mode (default in modules) prevents accidental globals.

 Discuss naming conventions (camelCase), expressing intent with meaningful names, and how temporal dead zone protects `let`/`const` declarations until they are initialized.
 

## Overview

Modern JavaScript uses `let` and `const` for block-scoped variables. `var` is function-scoped and mostly kept for legacy compatibility.

## Variable Declaration Keywords

### 1. let - Block-Scoped Variables

`let` creates variables that are block-scoped and can be reassigned. They are not hoisted and exist in a temporal dead zone until initialization.

```js
let userName = "John";
userName = "Jane"; // ✅ Reassignment allowed
let age = 25;
age = 26; // ✅ Reassignment allowed

// Block scope example
if (true) {
  let blockVar = "I'm in a block";
}
// console.log(blockVar); // ❌ ReferenceError
```

### 2. const - Block-Scoped Constants

`const` creates constants that cannot be reassigned. However, the contents of objects and arrays can still be modified.

```js
const PI = 3.14159;
// PI = 3.14; // ❌ TypeError: Assignment to constant variable

const person = { name: "John", age: 25 };
person.age = 26; // ✅ Modifying object content is allowed
person.city = "New York"; // ✅ Adding properties is allowed

const numbers = [1, 2, 3];
numbers.push(4); // ✅ Modifying array content is allowed
numbers[0] = 10; // ✅ Changing array elements is allowed
```

### 3. var - Function-Scoped Variables (Legacy)

`var` creates function-scoped variables that are hoisted. Avoid using `var` in modern JavaScript.

```js
var globalVar = "I'm global";
function example() {
  var functionVar = "I'm function-scoped";
  if (true) {
    var blockVar = "I'm still function-scoped";
  }
  // console.log(blockVar); // ✅ Works (unlike let)
}

// Hoisting example
console.log(hoistedVar); // undefined (not ReferenceError)
var hoistedVar = "I'm hoisted";
```

## Scope and Hoisting

### Block Scope vs Function Scope

```js
// Block scope (let/const)
if (true) {
  let blockScoped = "I'm block-scoped";
  const alsoBlockScoped = "Me too";
}
// console.log(blockScoped); // ❌ ReferenceError

// Function scope (var)
function myFunction() {
  if (true) {
    var functionScoped = "I'm function-scoped";
  }
  // console.log(functionScoped); // ✅ Works
}
```

### Temporal Dead Zone

```js
// Temporal Dead Zone example
console.log(typeof myVar); // "undefined" (var is hoisted)
console.log(typeof myLet); // ReferenceError (let is not accessible)

var myVar = "I'm hoisted";
let myLet = "I'm in TDZ until this line";
```

### Global Scope

```js
// Global variables
let globalLet = "I'm global";
const globalConst = "I'm also global";
var globalVar = "I'm global too";

// All are accessible from anywhere in the script
function anyFunction() {
  console.log(globalLet, globalConst, globalVar);
}
```

## Best Practices

### Naming Conventions

```js
// Use camelCase for variables
let userName = "john_doe";
let userAge = 25;
let isUserActive = true;

// Use UPPER_CASE for constants
const MAX_USERS = 100;
const API_BASE_URL = "https://api.example.com";

// Use descriptive names
let userCount = 0; // ✅ Good
let x = 0; // ❌ Too vague
```

### Declaration Guidelines

```js
// ✅ Prefer const by default
const userName = "John";
const userPreferences = { theme: "dark" };

// ✅ Use let only when reassignment is needed
let counter = 0;
counter++; // Reassignment needed

// ❌ Avoid var in modern code
// var oldStyle = "Don't use this";

// ✅ Declare variables close to where they're used
function processUser(user) {
  const processedData = transformUser(user);
  return processedData;
}
```

| Keyword | Scope | Reassignable? | Redeclarable? |
| --- | --- | --- | --- |
| `let` | Block | Yes | No |
| `const` | Block | No | No |
| `var` | Function | Yes | Yes |

Run Scope Demo

```js
<script src="03_variables_constants.js"></script>
```
