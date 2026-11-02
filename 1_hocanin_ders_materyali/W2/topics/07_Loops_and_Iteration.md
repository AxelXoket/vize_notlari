# Loops and Iteration - Complete Guide

## Teaching Notes

- `for` loops are perfect when you know the number of iterations.
- `while`/`do...while` loop until a condition changes—watch out for infinite loops.
- `for...of` iterates values; `for...in` iterates keys. Use `Object.keys`/`entries` for objects.
- Array helpers (`map`, `filter`, `reduce`, `forEach`) emphasize declarative patterns.

 Encourage students to refactor loops into helper methods once they understand the imperative form.
 

## Overview

Loops allow you to execute code repeatedly. JavaScript provides several types of loops for different scenarios, from traditional for loops to modern array methods.

## for Loops

The most common loop type, ideal when you know the number of iterations.

```js
// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log("Iteration:", i);
}
// Output: 0, 1, 2, 3, 4

// Loop through an array
let fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Reverse loop
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(fruits[i]);
}

// Loop with step
for (let i = 0; i < 10; i += 2) {
  console.log("Even number:", i);
}
```

### Nested Loops

```js
// Nested loops for 2D arrays
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(`[${i}][${j}] = ${matrix[i][j]}`);
  }
}

// Multiplication table
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= 5; j++) {
    console.log(`${i} × ${j} = ${i * j}`);
  }
}
```

## while and do...while Loops

Use when you don't know the exact number of iterations in advance.

```js
// while loop
let count = 0;
while (count < 5) {
  console.log("Count:", count);
  count++;
}

// do...while loop (executes at least once)
let userInput;
do {
  userInput = prompt("Enter a number (0 to quit):");
  console.log("You entered:", userInput);
} while (userInput !== "0");

// Practical example: processing until condition met
let attempts = 0;
let success = false;
while (!success && attempts < 3) {
  attempts++;
  console.log(`Attempt ${attempts}`);
  // Simulate some operation
  success = Math.random() > 0.5; // Random success
}
```

### Avoiding Infinite Loops

```js
// ❌ Dangerous: infinite loop
// let i = 0;
// while (i < 10) {
//   console.log(i); // Forgot to increment i!
// }

// ✅ Safe: always increment
let i = 0;
while (i < 10) {
  console.log(i);
  i++; // Always increment!
}

// ✅ Safe: use break to exit
let counter = 0;
while (true) {
  counter++;
  if (counter > 5) break; // Exit condition
  console.log("Counter:", counter);
}
```

## for...of Loop

Iterates over iterable objects (arrays, strings, etc.) and provides direct access to values.

```js
// Iterating over arrays
let colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log(color);
}

// Iterating over strings
let text = "Hello";
for (let char of text) {
  console.log(char);
}

// Getting both index and value
let fruits = ["apple", "banana", "orange"];
for (let [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}

// Iterating over Set
let uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
for (let num of uniqueNumbers) {
  console.log(num); // 1, 2, 3, 4
}

// Iterating over Map
let scores = new Map([
  ["Alice", 95],
  ["Bob", 87],
  ["Charlie", 92]
]);
for (let [name, score] of scores) {
  console.log(`${name}: ${score}`);
}
```

## for...in Loop

Iterates over object properties. Use with caution and prefer Object methods for arrays.

```js
// Iterating over object properties
let person = {
  name: "John",
  age: 30,
  city: "New York"
};

for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// ❌ Don't use for...in with arrays
let arr = ["a", "b", "c"];
for (let index in arr) {
  console.log(index, arr[index]); // "0 a", "1 b", "2 c"
}

// ✅ Use for...of for arrays
for (let value of arr) {
  console.log(value); // "a", "b", "c"
}

// ✅ Use Object methods for objects
for (let key of Object.keys(person)) {
  console.log(key);
}

for (let value of Object.values(person)) {
  console.log(value);
}

for (let [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
```

## Array Iteration Methods

Modern, functional approach to iteration with built-in methods.

```js
let numbers = [1, 2, 3, 4, 5];

// forEach - execute function for each element
numbers.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// map - transform each element
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - select elements that meet condition
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce - accumulate values
let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// find - find first element that meets condition
let found = numbers.find(num => num > 3);
console.log(found); // 4

// some - check if any element meets condition
let hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every - check if all elements meet condition
let allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true
```

### Chaining Array Methods

```js
let students = [
  { name: "Alice", grade: 85 },
  { name: "Bob", grade: 92 },
  { name: "Charlie", grade: 78 },
  { name: "Diana", grade: 96 }
];

// Chain multiple operations
let topStudents = students
  .filter(student => student.grade >= 90)
  .map(student => student.name)
  .sort();

console.log(topStudents); // ["Bob", "Diana"]

// Calculate average grade
let averageGrade = students
  .map(student => student.grade)
  .reduce((sum, grade) => sum + grade, 0) / students.length;

console.log(averageGrade); // 87.75
```

## Loop Control Statements

Control the flow of loops with break, continue, and labels.

```js
// break - exit the loop completely
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}

// continue - skip current iteration
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;
  console.log(i); // 1, 3, 5, 7, 9
}

// Labels for nested loops
outerLoop: for (let i = 0; i < 3; i++) {
  innerLoop: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outerLoop;
    console.log(`i: ${i}, j: ${j}`);
  }
}
```

Generate Study Plan

```js
<script src="07_loops.js"></script>
```
