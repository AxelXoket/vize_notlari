# Fundamentals of JavaScript

 JavaScript (JS) is a high-level, interpreted programming language created by Brendan Eich in 1995 while working at Netscape. Originally designed to add interactivity to web pages, it has evolved into a full ecosystem used for web, mobile, desktop, and server-side applications.
 

 The language is standardized by the ECMA International committee TC39 and published as the ECMAScript specification. Modern JavaScript engines (V8, SpiderMonkey, JavaScriptCore, Chakra) power browsers, Node.js, Deno, Bun, and many other runtimes.
 

## Where JavaScript Runs

Web Browsers (client-side)
Node.js (server-side)
Mobile (React Native, Ionic, NativeScript)
Desktop (Electron, Tauri)
Embedded / IoT
Automation & Scripting (Deno, Bun)

## Key Milestones

- **1995:** LiveScript released in Netscape, renamed JavaScript.
- **1997:** ECMAScript 1 published; standardization begins.
- **2009:** ECMAScript 5 introduces JSON, strict mode, array helpers.
- **2015:** ECMAScript 2015 (ES6) delivers classes, modules, arrow functions, promises.
- **2017→today:** Annual releases add async/await, optional chaining, top-level await, and more.

## Core Language Traits

Case Sensitive

 Identifiers like `totalScore` and `totalscore` are different. Stick to camelCase for variables and functions, PascalCase for classes, and ALL_CAPS for constants.
 

Dynamic Typing

 Variable types are determined at runtime. Use `typeof` and strict equality to avoid coercion surprises.
 

Prototype-based

 Objects inherit directly from other objects. Classes are syntactic sugar over prototypes.

Single-threaded Event Loop

 JavaScript runs on a single thread, delegating asynchronous work to the runtime (browser or Node.js) event loop.
 

First-class Functions

 Functions can be stored in variables, passed as arguments, or returned from other functions.

Interpreted/JIT-compiled

 JS engines compile code just-in-time to optimized machine code for performance.
 

## Essential Syntax Rules

- Always declare variables with `const` or `let`; avoid `var` in modern code.
- End statements with semicolons in team projects to avoid ASI (automatic semicolon insertion) pitfalls.
- Use strict equality (`===`) over abstract equality (`==`).
- Comment with `// single line` or `/* multi-line */`; keep comments focused on why, not what.
- Group related code into modules or functions for readability and reuse.

## Example: Case Sensitivity & Runtime Environments

```js
// Run this snippet in Node.js or a browser console
const total = 42;
const Total = 7;

console.log(total); // 42
console.log(Total); // 7 (different identifier because JS is case sensitive)

const whereAmI = typeof window !== "undefined" ? "browser" : "Node.js";
console.log(`This code is running in the ${whereAmI} environment.`);

```

 Try saving the code in `00_fundamentals.js` and loading it from this page to see the output in the developer console.
 

```js
<script src="00_fundamentals.js"></script>
```
