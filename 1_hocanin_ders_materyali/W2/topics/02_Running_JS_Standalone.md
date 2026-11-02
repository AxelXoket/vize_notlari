# Running JavaScript Standalone

## Quick Teaching Notes

- JavaScript isn't limited to browsers—Node.js, Deno, and Bun let you run JS on the command line.
- Browsers provide developer tools; open the console (⌥⌘I on macOS, F12 on Windows) to execute snippets interactively.
- Standalone scripts are perfect for automation, prototyping, unit tests, and build tooling.
- Chrome blocks pasted scripts by default; type `allow pasting` in the console once per session to lift the restriction.
- ES modules work in Node.js via `type="module"` packages or the `.mjs` extension. CommonJS uses `require`.

 JavaScript can run outside of HTML. You can execute scripts directly in a browser console or by using Node.js in a terminal.
 

## Run in Your Terminal

1. Install Node.js from [nodejs.org](https://nodejs.org).
2. Open a terminal.
3. Navigate to the `topics` folder and run `node 02_standalone.js`.  

 Tip: If you stay in the project root, run `node topics/02_standalone.js` instead.

You should see console output similar to:

```js
$ node 02_standalone.js
Hello from Node.js!
Current time: 2025-10-06T12:00:00.000Z
Sum (2 + 3): 5
  
```

## Browser Console Snippet

 Open any web page, launch the developer tools console, and paste the following snippet:
 

**Chrome users:** Güvenlik nedeniyle DevTools konsolu yapıştırmayı engeller. Konsola önce `allow pasting` yazıp Enter'a basın. Komutu girdikten sonra, aynı sekmede oturum boyunca kopyaladığınız kodları doğrudan yapıştırabilirsiniz.
 

```js
console.log("Hello from the browser console!");
alert("This runs without modifying the page");
  
```

```js
<script src="02_standalone.js"></script>
```

 The script tag at the bottom allows you to reuse the same file both in Node.js and in the browser. It writes friendly instructions to the page using feature detection so you can observe the difference.
