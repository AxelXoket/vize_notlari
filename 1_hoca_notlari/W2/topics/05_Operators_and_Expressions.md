# Operators and Expressions - Complete Guide

## Teaching Notes

- Arithmetic: `+`, `-`, `*`, `/`, `%`, `**`.
- Comparison: `===`, `!==`, `>`, `<`, etc. Always prefer strict comparisons.
- Logical: `&&`, `||`, `!` short-circuit; `??` handles nullish values.
- The ternary operator (`condition ? a : b`) is great for inline decisions.

 Demonstrate operator precedence using parentheses. Remind students that string concatenation with `+` coerces values.
 

## Overview

This comprehensive guide covers all JavaScript operators including arithmetic, comparison, logical, assignment, and special operators.

## Arithmetic Operators

Used for mathematical calculations and string concatenation.

```js
// Basic arithmetic
let a = 10, b = 3;
console.log(a + b); // 13 (addition)
console.log(a - b); // 7 (subtraction)
console.log(a * b); // 30 (multiplication)
console.log(a / b); // 3.333... (division)
console.log(a % b); // 1 (modulus/remainder)
console.log(a ** b); // 1000 (exponentiation)

// String concatenation
let firstName = "John";
let lastName = "Doe";
console.log(firstName + " " + lastName); // "John Doe"

// Type coercion with +
console.log("5" + 3); // "53" (string concatenation)
console.log(5 + "3"); // "53" (string concatenation)
console.log("5" - 3); // 2 (numeric subtraction)
```

## Comparison Operators

Used to compare values and return boolean results. Always prefer strict equality.

```js
// Strict equality (recommended)
console.log(5 === 5); // true
console.log(5 === "5"); // false (different types)
console.log(5 !== 3); // true

// Loose equality (avoid)
console.log(5 == 5); // true
console.log(5 == "5"); // true (type coercion!)
console.log(5 != 3); // true

// Relational operators
console.log(5 > 3); // true
console.log(5 < 3); // false
console.log(5 >= 5); // true
console.log(5 <= 3); // false

// Special cases
console.log(NaN === NaN); // false
console.log(isNaN(NaN)); // true
console.log(null === undefined); // false
console.log(null == undefined); // true
```

## Logical Operators

Used for boolean logic and short-circuit evaluation.

```js
// Logical AND (&&) - short-circuits on first falsy value
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false (short-circuits)

// Logical OR (||) - short-circuits on first truthy value
console.log(false || true); // true
console.log(false || false); // false
console.log(true || false); // true (short-circuits)

// Logical NOT (!)
console.log(!true); // false
console.log(!false); // true

// Practical examples
let user = { name: "John", age: 25 };
let displayName = user.name || "Anonymous"; // "John"
let isAdult = user.age && user.age >= 18; // true

// Nullish Coalescing (??) - handles null/undefined
let config = { timeout: null };
let timeout = config.timeout ?? 5000; // 5000
let timeout2 = config.timeout || 5000; // 5000 (but different behavior)
```

## Assignment Operators

Used to assign values to variables with various shortcuts.

```js
// Basic assignment
let x = 10;

// Compound assignment
x += 5; // x = x + 5 (15)
x -= 3; // x = x - 3 (12)
x *= 2; // x = x * 2 (24)
x /= 4; // x = x / 4 (6)
x %= 5; // x = x % 5 (1)
x **= 3; // x = x ** 3 (1)

// Increment and decrement
let counter = 0;
counter++; // Post-increment: returns 0, then increments to 1
++counter; // Pre-increment: increments to 2, then returns 2
counter--; // Post-decrement: returns 2, then decrements to 1
--counter; // Pre-decrement: decrements to 0, then returns 0
```

## Special Operators

Unique operators for specific JavaScript features.

```js
// Ternary operator (conditional operator)
let age = 20;
let status = age >= 18 ? "adult" : "minor"; // "adult"
let message = age >= 18 ? "Welcome!" : "Access denied";

// Chained ternary (avoid for readability)
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";

// typeof operator
console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof null); // "object" (quirk!)
console.log(typeof undefined); // "undefined"

// instanceof operator
let date = new Date();
console.log(date instanceof Date); // true
console.log(date instanceof Object); // true

// in operator (for object properties)
let person = { name: "John", age: 25 };
console.log("name" in person); // true
console.log("city" in person); // false
```

## Operator Precedence

Understanding operator precedence helps avoid unexpected results.

```js
// Precedence examples
console.log(2 + 3 * 4); // 14 (not 20!)
console.log((2 + 3) * 4); // 20

// Logical operator precedence
console.log(true || false && false); // true
console.log((true || false) && false); // false

// Assignment precedence
let a, b;
a = b = 5; // Both a and b become 5
console.log(a, b); // 5 5

// Common precedence order (highest to lowest):
// 1. () [] .
// 2. ! typeof ++ --
// 3. * / %
// 4. + -
// 5. < <= > >=
// 6. === !==
// 7. &&
// 8. ||
// 9. ? :
// 10. = += -= *= /= %=
```

## Try It

 Left operand
 

 Right operand
 

Evaluate

```js
<script src="05_operators.js"></script>
```
