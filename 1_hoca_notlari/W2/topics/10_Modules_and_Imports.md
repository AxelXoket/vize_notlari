# ES6 Modules and Imports - Complete Guide

## Teaching Notes

- Modules embrace encapsulation—export what you need, hide the rest.
- `export default` allows a single primary export; named exports support multiple utilities.
- Always use relative paths (`./`, `../`) when importing local files in the browser.
- Modules run in strict mode automatically and execute once; subsequent imports use the cached module instance.

 Show students how bundlers (Vite, Webpack) and Node.js ESM support align with native browser modules.
 

## Overview

ES6 modules provide a standardized way to organize and share code between files. They enable better code organization, dependency management, and tree-shaking for smaller bundle sizes.

## Module Basics

Understanding how modules work and their key characteristics.

```js
// Module characteristics
// 1. Modules run in strict mode automatically
// 2. Modules have their own scope (not global)
// 3. Modules are executed only once
// 4. Modules can import and export values

// Example: math.js module
// This would be in a separate file
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Default export
export default function calculate(operation, a, b) {
  switch (operation) {
    case 'add': return add(a, b);
    case 'multiply': return multiply(a, b);
    default: return 0;
  }
}
```

### Module Scope and Isolation

```js
// Variables in modules are not global
let moduleVariable = "I'm in module scope";
var oldStyleVar = "I'm also in module scope";

// These won't pollute the global scope
console.log(moduleVariable); // Works within module
// window.moduleVariable would be undefined

// Functions are also scoped to the module
function moduleFunction() {
  return "I'm scoped to this module";
}

// Only exported items are accessible from outside
export { moduleVariable, moduleFunction };
```

## Import and Export Syntax

Different ways to import and export values in ES6 modules.

```js
// Named exports and imports
// math.js (exporting file)
export const PI = 3.14159;
export function square(x) { return x * x; }
export function cube(x) { return x * x * x; }

// main.js (importing file)
import { PI, square, cube } from './math.js';
console.log(PI); // 3.14159
console.log(square(5)); // 25
console.log(cube(3)); // 27

// Import with different names
import { square as sq, cube as cb } from './math.js';
console.log(sq(4)); // 16

// Import all named exports
import * as Math from './math.js';
console.log(Math.PI); // 3.14159
console.log(Math.square(6)); // 36
```

### Default Exports and Imports

```js
// Default export (only one per module)
// calculator.js
class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return b !== 0 ? a / b : 0; }
}

export default Calculator;

// main.js
import Calculator from './calculator.js';
// or with different name
import Calc from './calculator.js';

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8

// Mixed imports (default + named)
// utils.js
export const VERSION = "1.0.0";
export function formatDate(date) { return date.toISOString(); }
export default function logger(message) { console.log(message); }

// main.js
import logger, { VERSION, formatDate } from './utils.js';
logger(`App version: ${VERSION}`);
console.log(formatDate(new Date()));
```

### Re-exporting and Aggregating

```js
// Re-exporting from another module
// math-utils.js
export { add, subtract } from './basic-math.js';
export { multiply, divide } from './advanced-math.js';
export { PI, E } from './constants.js';

// Re-export with renaming
export { add as plus, subtract as minus } from './basic-math.js';

// Re-export everything
export * from './basic-math.js';
export * from './advanced-math.js';

// Re-export default as named
export { default as Calculator } from './calculator.js';

// Re-export named as default
export { Calculator as default } from './calculator.js';
```

## Common Module Patterns

Practical patterns for organizing and structuring modules.

```js
// Configuration module
// config.js
const config = {
  apiUrl: process.env.API_URL || 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  debug: process.env.NODE_ENV === 'development'
};

export default config;

// Utility module with multiple exports
// string-utils.js
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str, length) {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function slugify(str) {
  return str.toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w-]/g, '');
}

// Data module
// users.js
let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

export function getUsers() { return [...users]; }
export function addUser(user) { users.push({ ...user, id: Date.now() }); }
export function findUser(id) { return users.find(u => u.id === id); }
```

### Class-based Modules

```js
// api-client.js
class ApiClient {
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl;
    this.timeout = options.timeout || 5000;
    this.headers = options.headers || {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      headers: { ...this.headers, ...options.headers }
    };

    const response = await fetch(url, config);
    return response.json();
  }

  get(endpoint) { return this.request(endpoint); }
  post(endpoint, data) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }); }
}

export default ApiClient;

// main.js
import ApiClient from './api-client.js';

const api = new ApiClient('https://api.example.com', {
  timeout: 10000,
  headers: { 'Authorization': 'Bearer token123' }
});

// Usage
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'Alice', email: 'alice@example.com' });
```

## Advanced Module Concepts

Dynamic imports, module loading, and advanced patterns.

```js
// Dynamic imports (code splitting)
async function loadModule() {
  try {
    // Dynamic import returns a Promise
    const module = await import('./heavy-module.js');
    console.log('Module loaded:', module.default);

    // Use the module
    const result = module.default.calculate(5, 3);
    return result;
  } catch (error) {
    console.error('Failed to load module:', error);
  }
}

// Conditional loading
async function loadFeature(featureName) {
  switch (featureName) {
    case 'chart':
      const { Chart } = await import('./chart-module.js');
      return new Chart();
    case 'table':
      const { Table } = await import('./table-module.js');
      return new Table();
    default:
      throw new Error('Unknown feature');
  }
}
```

### Module Bundling and Tree Shaking

```js
// Tree shaking example
// math-library.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export function divide(a, b) { return b !== 0 ? a / b : 0; }
export function power(a, b) { return Math.pow(a, b); }
export function sqrt(x) { return Math.sqrt(x); }

// main.js - only imports what it uses
import { add, multiply } from './math-library.js';

// Bundler will only include add() and multiply()
// subtract, divide, power, sqrt will be "shaken out"
console.log(add(5, 3)); // 8
console.log(multiply(4, 6)); // 24

// Side effects in modules
// side-effects.js
console.log('This runs when module is imported');
export const value = 42;

// To prevent side effects from being removed
// side-effects.js
import './side-effects.js'; // Import for side effects only
```

### Module Best Practices

```js
// ✅ Good: Single responsibility
// user-service.js - handles user operations
export class UserService {
  constructor(apiClient) {
    this.api = apiClient;
  }

  async getUsers() { return this.api.get('/users'); }
  async createUser(userData) { return this.api.post('/users', userData); }
}

// ❌ Bad: Mixed responsibilities
// utils.js - too many different things
export function formatDate() { /* ... */ }
export function validateEmail() { /* ... */ }
export function calculateTax() { /* ... */ }
export function generateId() { /* ... */ }

// ✅ Better: Split into focused modules
// date-utils.js
export function formatDate() { /* ... */ }

// validation-utils.js
export function validateEmail() { /* ... */ }

// tax-calculator.js
export function calculateTax() { /* ... */ }

// id-generator.js
export function generateId() { /* ... */ }
```

 Principal
 

 Rate (annual %)
 

 Years
 

Calculate Growth

```js
<script src="10_module_main.js"></script>
```
