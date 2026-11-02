# Functions and Arrow Functions - Complete Guide

## Teaching Notes

- Function declarations hoist; function expressions and arrow functions do not.
- Arrow functions inherit `this` and lack their own `arguments`; great for callbacks.
- Use default parameters and destructuring for clean signatures.
- Pure functions return the same output for the same inputs and avoid side effects.

 Show how to break large functions into smaller helpers. Discuss when to choose arrow functions versus traditional declarations.
 

## Overview

Functions are reusable blocks of code that can be called with parameters. JavaScript offers multiple ways to define functions, each with its own characteristics and use cases.

## Function Declarations

Traditional function syntax that is hoisted and can be called before its definition.

```js
// Basic function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("John")); // "Hello, John!"

// Function with multiple parameters
function calculateArea(length, width) {
  return length * width;
}

console.log(calculateArea(5, 3)); // 15

// Function with default parameters
function greetWithDefault(name = "World") {
  return `Hello, ${name}!`;
}

console.log(greetWithDefault()); // "Hello, World!"
console.log(greetWithDefault("Alice")); // "Hello, Alice!"

// Hoisting example
console.log(hoistedFunction()); // "I'm hoisted!"

function hoistedFunction() {
  return "I'm hoisted!";
}
```

### Function Parameters and Arguments

```js
// Rest parameters (...args)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
console.log(sum(10, 20)); // 30

// Destructuring parameters
function displayUser({ name, age, city }) {
  return `${name} is ${age} years old and lives in ${city}`;
}

let user = { name: "John", age: 30, city: "New York" };
console.log(displayUser(user));

// Mixed parameter types
function createProfile(name, { age = 18, city = "Unknown" } = {}) {
  return { name, age, city };
}

console.log(createProfile("Alice")); // { name: "Alice", age: 18, city: "Unknown" }
```

## Function Expressions

Functions assigned to variables. Not hoisted and useful for callbacks and conditional function creation.

```js
// Basic function expression
const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(3, 4)); // 12

// Named function expression
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};

console.log(factorial(5)); // 120

// Function expressions in objects
const calculator = {
  add: function(a, b) { return a + b; },
  subtract: function(a, b) { return a - b; },
  multiply: function(a, b) { return a * b; }
};

console.log(calculator.add(5, 3)); // 8

// Conditional function creation
let operation;
if (Math.random() > 0.5) {
  operation = function(x) { return x * 2; };
} else {
  operation = function(x) { return x + 10; };
}

console.log(operation(5)); // Either 10 or 15
```

### Immediately Invoked Function Expressions (IIFE)

```js
// Basic IIFE
(function() {
  console.log("I run immediately!");
})();

// IIFE with parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})("World");

// IIFE for module pattern
const myModule = (function() {
  let privateVariable = 0;

  return {
    increment: function() { privateVariable++; },
    getValue: function() { return privateVariable; }
  };
})();

myModule.increment();
console.log(myModule.getValue()); // 1
```

## Arrow Functions

Concise syntax for function expressions. They don't have their own `this` and are great for callbacks.

```js
// Basic arrow function
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// Single parameter (parentheses optional)
const square = x => x * x;
console.log(square(4)); // 16

// No parameters
const sayHello = () => "Hello!";
console.log(sayHello()); // "Hello!"

// Multiple parameters
const greet = (firstName, lastName) => `Hello, ${firstName} ${lastName}!`;
console.log(greet("John", "Doe")); // "Hello, John Doe!"

// Arrow function with block body
const processArray = (arr) => {
  let result = [];
  for (let item of arr) {
    result.push(item * 2);
  }
  return result;
};

console.log(processArray([1, 2, 3])); // [2, 4, 6]
```

### Arrow Functions vs Regular Functions

```js
// this binding difference
const obj = {
  name: "MyObject",
  regularFunction: function() {
    console.log("Regular function this:", this.name);
  },
  arrowFunction: () => {
    console.log("Arrow function this:", this.name); // undefined
  }
};

obj.regularFunction(); // "Regular function this: MyObject"
obj.arrowFunction(); // "Arrow function this: undefined"

// arguments object
function regularFunc() {
  console.log("Regular function arguments:", arguments);
}

const arrowFunc = () => {
  // console.log("Arrow function arguments:", arguments); // ReferenceError
};

regularFunc(1, 2, 3); // Works
arrowFunc(1, 2, 3); // Error
```

### When to Use Arrow Functions

```js
// ✅ Great for array methods
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2);
let evens = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((acc, n) => acc + n, 0);

// ✅ Great for event handlers
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// ✅ Great for setTimeout/setInterval
setTimeout(() => console.log('Delayed message'), 1000);

// ❌ Don't use for object methods (this binding issues)
const person = {
  name: "John",
  // ❌ Bad: arrow function
  greet: () => `Hello, I'm ${this.name}`,
  // ✅ Good: regular function
  greetProperly: function() { return `Hello, I'm ${this.name}`; }
};
```

## Advanced Function Concepts

Higher-order functions, closures, and functional programming concepts.

```js
// Higher-order functions
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Closures
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Pure functions
// ✅ Pure function (no side effects)
function add(a, b) {
  return a + b;
}

// ❌ Impure function (has side effects)
let total = 0;
function addToTotal(value) {
  total += value; // Side effect: modifies external variable
  return total;
}
```

### Function Composition

```js
// Simple composition
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

// Compose functions
const composed = (x) => square(multiplyByTwo(addOne(x)));
console.log(composed(3)); // ((3 + 1) * 2)² = 64

// Generic compose function
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const composedGeneric = compose(square, multiplyByTwo, addOne);
console.log(composedGeneric(3)); // 64
```

 Income (₺)
 

 Tax Rate (%)
 

Calculate Tax

```js
<script src="08_functions.js"></script>
```
