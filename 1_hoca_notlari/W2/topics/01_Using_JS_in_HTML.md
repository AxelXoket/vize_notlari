# Using JavaScript in HTML

```js
    // Inline script executed as soon as it is parsed
    console.log("Hello from inline JavaScript!");
  
```

# Using JavaScript Inside HTML

## Quick Teaching Notes

- **Inline scripts** live between `<script>` tags. They execute immediately as the browser parses the markup.
- **External scripts** reference a separate `.js` file via the `src` attribute. Use `defer` to wait for the DOM.
- Scripts can also appear in attributes such as `onclick="..."`, but prefer `addEventListener` for separation of concerns.
- `<script type="module">` enables ES modules with `import`/`export`; great for structured applications.

### Script Placement Guidelines

 Place blocking scripts at the end of `<body>`, or add `defer` in the document head to keep initial rendering fast. The only time you need an inline script in the head is for critical configuration or to set up feature detection before the page loads.
 

Toggle Highlight
Watch my background color change!

## Inline vs External Demonstration

 The small console log in the `<head>` proves inline scripts execute as soon as the browser encounters them. The button behaviour below is powered by an external script (`01_using_js_in_html.js`) that waits for the DOM via `defer` and interacts with the page using `addEventListener`.
 

 Try adding the attribute `onclick="alert('Hi')"` directly on the button to see how inline event handlers work. Then remove it and rely on the external script—this helps students appreciate separation of structure and behaviour.
 

```js
<script src="01_using_js_in_html.js"></script>
```
