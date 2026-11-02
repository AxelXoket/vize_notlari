# JavaScript Data Types - Complete Guide

## Teaching Notes

- Primitives: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
- Reference types: objects, arrays, functions, dates, maps, sets, and user-defined structures.
- Primitives copy by value. Reference types copy the pointer, so mutations affect all references.
- Discuss coercion with `Number()`, `String()`, JSON serialization, and when to reach for `BigInt`.

 Encourage students to experiment with the inspector below. Try values like `Symbol("id")`, `123n`, `[1,2,3]`, and `({ name: "JS" })`.
 

## Overview

 JavaScript has seven primitive types (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) and complex/reference types such as `object`, `array`, `function`, and `date`.
 

## Primitive Data Types

Primitive types are immutable and passed by value. They are the most basic data types in JavaScript.

### 1. String

Represents textual data. Can be created with single quotes, double quotes, or backticks.

```js
let name = "John";
let message = 'Hello World';
let template = `Hello ${name}`;
```

### 2. Number

Represents both integers and floating-point numbers. JavaScript uses double-precision floating-point format.

```js
let age = 25;
let price = 19.99;
let scientific = 1.23e4; // 12300
let infinity = Infinity;
let notANumber = NaN;
```

### 3. Boolean

Represents logical values: `true` or `false`.

```js
let isActive = true;
let isComplete = false;
let hasPermission = (user.role === 'admin');
```

### 4. Null

Represents the intentional absence of any object value. It's a primitive value that represents "nothing".

```js
let data = null;
let user = null; // User not found
```

### 5. Undefined

Represents a variable that has been declared but not assigned a value.

```js
let value; // undefined
let obj = {};
console.log(obj.nonExistent); // undefined
```

### 6. Symbol

Represents a unique identifier. Symbols are immutable and unique.

```js
let id = Symbol('id');
let id2 = Symbol('id');
console.log(id === id2); // false
```

### 7. BigInt

Represents integers with arbitrary precision. Created by appending 'n' to the end of an integer.

```js
let bigNumber = 123456789012345678901234567890n;
let anotherBig = BigInt(9007199254740991);
```

## Reference Data Types

Reference types are mutable and passed by reference. They are objects that can contain multiple values.

### 1. Object

Collections of key-value pairs. Objects can contain any data type.

```js
let person = {
  name: "John",
  age: 30,
  isActive: true
};
```

### 2. Array

Ordered lists of values. Arrays are zero-indexed and can contain any data type.

```js
let fruits = ["apple", "banana", "orange"];
let mixed = [1, "hello", true, null];
let empty = [];
```

### 3. Function

Reusable blocks of code that can be called with parameters.

```js
function greet(name) {
  return `Hello, ${name}!`;
}
let arrowFunction = (x) => x * 2;
```

### 4. Date

Represents a specific moment in time.

```js
let now = new Date();
let specificDate = new Date('2023-12-25');
let timestamp = new Date(1703520000000);
```

## Type Coercion

JavaScript automatically converts values between different types in certain contexts.

### Implicit Coercion

```js
console.log("5" + 3); // "53" (string concatenation)
console.log("5" - 3); // 2 (number subtraction)
console.log(true + 1); // 2 (boolean to number)
console.log("" + 0); // "0" (number to string)
```

### Explicit Coercion

```js
Number("123"); // 123
String(456); // "456"
Boolean(1); // true
parseInt("123px"); // 123
parseFloat("3.14"); // 3.14
```

## Type Checking

Methods to determine the type of a value in JavaScript.

### typeof Operator

```js
typeof "hello"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof null; // "object" (quirk!)
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof 123n; // "bigint"
typeof {}; // "object"
typeof []; // "object"
typeof function() {}; // "function"
```

### Other Type Checking Methods

```js
Array.isArray([]); // true
instanceof Date; // true for Date objects
Object.prototype.toString.call([]); // "[object Array]"
```

Enter a value:

Interpretation Mode

Auto detect (eval with care)
Treat as literal string
Parse as JSON

Inspect Type

```js
<script src="04_data_types.js"></script>
```
