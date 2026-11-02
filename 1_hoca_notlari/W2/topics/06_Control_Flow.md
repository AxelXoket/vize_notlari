# Control Flow: Conditionals - Complete Guide

## Teaching Notes

- Use `if`/`else` for complex conditions or when you need boolean expressions.
- `switch` shines when comparing the same value against many options.
- Truthy/falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN` are falsy; everything else is truthy.
- Guard clauses (early returns) can simplify deeply nested conditionals.

 Discuss practical examples: feature flags, user roles, and validation logic. Encourage flowcharts before coding complex branching.
 

## Overview

Control flow determines the order in which statements are executed. Conditional statements allow your program to make decisions and execute different code paths based on conditions.

## if/else Statements

The most fundamental conditional structure for decision-making in JavaScript.

```js
// Basic if statement
let age = 20;
if (age >= 18) {
  console.log("You are an adult");
}

// if/else statement
if (age >= 18) {
  console.log("You can vote");
} else {
  console.log("You cannot vote yet");
}

// if/else if/else chain
let score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
```

### Nested Conditions

```js
// Nested if statements
let user = { age: 25, hasLicense: true };
if (user.age >= 18) {
  if (user.hasLicense) {
    console.log("You can drive");
  } else {
    console.log("You need a license to drive");
  }
} else {
  console.log("You are too young to drive");
}

// Better: Guard clauses
if (user.age < 18) {
  console.log("You are too young to drive");
  return;
}

if (!user.hasLicense) {
  console.log("You need a license to drive");
  return;
}

console.log("You can drive");
```

## switch Statements

Useful when comparing the same value against multiple possible values.

```js
// Basic switch statement
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Mid week");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Invalid day");
}

// Switch with expressions
let grade = "B";
switch (grade) {
  case "A":
  case "B":
    console.log("Passing grade");
    break;
  case "C":
    console.log("Barely passing");
    break;
  case "D":
  case "F":
    console.log("Failing grade");
    break;
  default:
    console.log("Invalid grade");
}
```

### Switch vs if/else

```js
// When to use switch
let userRole = "admin";
switch (userRole) {
  case "admin":
    console.log("Full access");
    break;
  case "moderator":
    console.log("Limited access");
    break;
  case "user":
    console.log("Basic access");
    break;
  default:
    console.log("No access");
}

// When to use if/else
let temperature = 25;
if (temperature > 30) {
  console.log("Hot weather");
} else if (temperature > 20) {
  console.log("Warm weather");
} else if (temperature > 10) {
  console.log("Cool weather");
} else {
  console.log("Cold weather");
}
```

## Ternary Operator

A concise way to write simple conditional expressions.

```js
// Basic ternary operator
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Ternary for simple assignments
let score = 85;
let message = score >= 70 ? "Pass" : "Fail";

// Ternary with function calls
let isLoggedIn = true;
let greeting = isLoggedIn ? "Welcome back!" : "Please log in";

// Nested ternary (use sparingly)
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";

// Ternary vs if/else
// Ternary (good for simple cases)
let discount = isMember ? 0.1 : 0;

// if/else (better for complex logic)
let discount;
if (isMember && purchaseAmount > 100) {
  discount = 0.15;
} else if (isMember) {
  discount = 0.1;
} else {
  discount = 0;
}
```

## Truthy and Falsy Values

Understanding truthy/falsy values is crucial for writing effective conditionals.

```js
// Falsy values (all evaluate to false)
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(0n)); // false (BigInt)
console.log(Boolean("")); // false (empty string)
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// Everything else is truthy
console.log(Boolean(true)); // true
console.log(Boolean(1)); // true
console.log(Boolean(-1)); // true
console.log(Boolean("hello")); // true
console.log(Boolean("0")); // true (string)
console.log(Boolean("false")); // true (string)
console.log(Boolean([])); // true (empty array)
console.log(Boolean({})); // true (empty object)

// Practical examples
let name = "";
if (name) {
  console.log("Hello, " + name);
} else {
  console.log("Please enter your name");
}

let user = null;
if (user) {
  console.log("Welcome, " + user.name);
} else {
  console.log("Please log in");
}
```

### Common Pitfalls

```js
// Be careful with these!
let count = 0;
if (count) {
  console.log("Count is truthy"); // Won't execute
} else {
  console.log("Count is falsy"); // This will execute
}

// Better approach for numbers
if (count > 0) {
  console.log("Count is positive");
} else {
  console.log("Count is zero or negative");
}

// Check for existence vs truthiness
let value = 0;
if (value !== undefined && value !== null) {
  console.log("Value exists:", value);
}

// Or use nullish coalescing
let displayValue = value ?? "No value";
```

 Weather condition
 
Sunny
Rainy
Windy
Snowy

Suggest Outfit

```js
<script src="06_control_flow.js"></script>
```
