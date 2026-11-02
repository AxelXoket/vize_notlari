# Arrays and Iteration Methods - Complete Guide

## Teaching Notes

- Arrays are zero-indexed and mutable—watch for methods that mutate (`push`, `splice`) versus those that return copies (`slice`, `map`).
- Spread (`[...arr]`) and rest parameters (`function fn(...args)`) simplify cloning and gathering arguments.
- `map` transforms values, `filter` selects values, `reduce` aggregates values.
- Destructuring extracts values quickly: `const [first, ...rest] = arr;`

 Encourage students to rewrite imperative loops with array helpers to practice declarative thinking.
 

## Overview

Arrays are ordered collections of values that can contain any data type. JavaScript provides powerful methods for creating, manipulating, and iterating over arrays.

## Array Basics

Creating, accessing, and basic manipulation of arrays.

```js
// Creating arrays
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null, { name: "John" }];
let empty = [];

// Array constructor
let arr1 = new Array(3); // [empty × 3]
let arr2 = new Array(1, 2, 3); // [1, 2, 3]

// Array.of() - better for single numbers
let arr3 = Array.of(3); // [3]
let arr4 = Array.of(1, 2, 3); // [1, 2, 3]

// Array.from() - create from iterables
let arr5 = Array.from("hello"); // ["h", "e", "l", "l", "o"]
let arr6 = Array.from({ length: 5 }, (_, i) => i * 2); // [0, 2, 4, 6, 8]
```

### Accessing Array Elements

```js
let colors = ["red", "green", "blue", "yellow"];

// Access by index (zero-based)
console.log(colors[0]); // "red"
console.log(colors[1]); // "green"
console.log(colors[colors.length - 1]); // "yellow"

// Modify elements
colors[0] = "purple";
console.log(colors); // ["purple", "green", "blue", "yellow"]

// Array length
console.log(colors.length); // 4
colors.length = 2; // Truncate array
console.log(colors); // ["purple", "green"]

// Check if array includes element
console.log(colors.includes("green")); // true
console.log(colors.indexOf("blue")); // -1 (not found)
```

### Array Destructuring

```js
let numbers = [1, 2, 3, 4, 5];

// Basic destructuring
let [first, second, third] = numbers;
console.log(first, second, third); // 1 2 3

// Skip elements
let [a, , c] = numbers;
console.log(a, c); // 1 3

// Rest operator
let [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
let [x, y, z = 10] = [1, 2];
console.log(x, y, z); // 1 2 10

let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

## Array Methods

Methods for adding, removing, and modifying array elements.

```js
let fruits = ["apple", "banana"];

// Adding elements
fruits.push("orange"); // Add to end
console.log(fruits); // ["apple", "banana", "orange"]

fruits.unshift("grape"); // Add to beginning
console.log(fruits); // ["grape", "apple", "banana", "orange"]

// Removing elements
let last = fruits.pop(); // Remove from end
console.log(last); // "orange"
console.log(fruits); // ["grape", "apple", "banana"]

let first = fruits.shift(); // Remove from beginning
console.log(first); // "grape"
console.log(fruits); // ["apple", "banana"]

// splice() - remove/add elements at specific position
let removed = fruits.splice(1, 1, "cherry", "date");
console.log(removed); // ["banana"]
console.log(fruits); // ["apple", "cherry", "date"]

// slice() - create a copy of part of array
let copy = fruits.slice(1, 3); // From index 1 to 3 (exclusive)
console.log(copy); // ["cherry", "date"]
console.log(fruits); // ["apple", "cherry", "date"] (unchanged)
```

### Array Concatenation and Spreading

```js
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [7, 8, 9];

// concat() method
let combined1 = arr1.concat(arr2, arr3);
console.log(combined1); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Spread operator (modern approach)
let combined2 = [...arr1, ...arr2, ...arr3];
console.log(combined2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Insert elements in middle
let inserted = [...arr1, "middle", ...arr2];
console.log(inserted); // [1, 2, 3, "middle", 4, 5, 6]

// Clone array
let cloned = [...arr1];
console.log(cloned); // [1, 2, 3]
console.log(cloned === arr1); // false (different references)
```

## Iteration Methods

Powerful methods for transforming, filtering, and processing arrays.

```js
let numbers = [1, 2, 3, 4, 5];

// forEach() - execute function for each element
numbers.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// map() - transform each element
let doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - select elements that meet condition
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce() - accumulate values
let sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// find() - find first element that meets condition
let found = numbers.find(num => num > 3);
console.log(found); // 4

// some() - check if any element meets condition
let hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every() - check if all elements meet condition
let allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true
```

### Chaining Array Methods

```js
let students = [
  { name: "Alice", grade: 85, age: 20 },
  { name: "Bob", grade: 92, age: 19 },
  { name: "Charlie", grade: 78, age: 21 },
  { name: "Diana", grade: 96, age: 20 }
];

// Chain multiple operations
let topStudents = students
  .filter(student => student.grade >= 90)
  .map(student => student.name)
  .sort();

console.log(topStudents); // ["Bob", "Diana"]

// Calculate average grade for students over 19
let averageGrade = students
  .filter(student => student.age > 19)
  .map(student => student.grade)
  .reduce((sum, grade) => sum + grade, 0) / students.filter(s => s.age > 19).length;

console.log(averageGrade); // 87.5
```

## Advanced Array Operations

Sorting, searching, and other advanced array operations.

```js
let fruits = ["banana", "apple", "cherry", "date"];

// sort() - sorts in place
fruits.sort();
console.log(fruits); // ["apple", "banana", "cherry", "date"]

// Custom sort function
let numbers = [10, 5, 40, 25, 1000, 1];
numbers.sort((a, b) => a - b); // Ascending
console.log(numbers); // [1, 5, 10, 25, 40, 1000]

numbers.sort((a, b) => b - a); // Descending
console.log(numbers); // [1000, 40, 25, 10, 5, 1]

// reverse() - reverse array in place
let reversed = [...numbers].reverse();
console.log(reversed); // [1, 5, 10, 25, 40, 1000]

// flat() - flatten nested arrays
let nested = [1, [2, 3], [4, [5, 6]]];
let flattened = nested.flat(); // [1, 2, 3, 4, [5, 6]]
let fullyFlattened = nested.flat(2); // [1, 2, 3, 4, 5, 6]

// flatMap() - map then flatten
let sentences = ["Hello world", "How are you"];
let words = sentences.flatMap(sentence => sentence.split(" "));
console.log(words); // ["Hello", "world", "How", "are", "you"]
```

### Array Searching and Testing

```js
let data = [1, 2, 3, 4, 5, 2, 3];

// indexOf() - find first occurrence
console.log(data.indexOf(2)); // 1
console.log(data.indexOf(6)); // -1 (not found)

// lastIndexOf() - find last occurrence
console.log(data.lastIndexOf(2)); // 5

// findIndex() - find index of first element meeting condition
console.log(data.findIndex(num => num > 3)); // 3

// includes() - check if array contains value
console.log(data.includes(3)); // true
console.log(data.includes(6)); // false

// Array.isArray() - check if value is array
console.log(Array.isArray(data)); // true
console.log(Array.isArray("hello")); // false
```

Enter songs (one per line, include duration in minutes after a comma)
Dawn Chorus,4
Evening Breeze,5
Night Drive,6
Process Playlist

## Results

```js
<script src="09_arrays.js"></script>
```
