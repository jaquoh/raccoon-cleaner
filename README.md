# 🦝  raccoon-cleaner
The little raccoon that is happy to collect everything you have declared as "trash" from your inputs.
It's not, it's still eatible or reusable, it's precious.
In fact this whole readme is 100% written with recycled characters from input fields all over the internet.

This tiny, dependency-free “clear-input” widget replaces the usual **×** with a
trash-can button and a delightful raccoon that drags your text away.

[Live demo](demo/index.html)

## Features
* **Drop‑in** — add a single class or call one line of JS.  
* **No dependencies** — vanilla ES‑module + CSS.  
* **Mobile friendly** — works on any modern browser.  
* **Customisable** — swap the emoji, change the trot speed, etc.

---

## Install

### CDN (quick test)

```html
<link rel="stylesheet"
      href="https://unpkg.com/raccoon-cleaner/dist/raccoon-cleaner.css">
<script type="module"
        src="https://unpkg.com/raccoon-cleaner/dist/raccoon-cleaner.js"></script>
```

### npm / pnpm / yarn

```bash
npm i raccoon-cleaner
```

```html
<link rel="stylesheet"
      href="node_modules/raccoon-cleaner/dist/raccoon-cleaner.css">
<script type="module">
  import 'raccoon-cleaner/dist/raccoon-cleaner.js';
</script>
```

---

## Usage

Add the `raccoon-cleaner` class to any `<input>` (type text, search, etc.) or  
single‑line `<textarea>`:

```html
<input class="raccoon-cleaner" placeholder="Type to test…">
```

> The module auto‑upgrades every element with that class on **DOMContentLoaded**.  
> For manual control:

```js
import { RaccoonCleaner } from 'raccoon-cleaner/dist/raccoon-cleaner.js';

new RaccoonCleaner(document.querySelector('#myField'));
```

---

## Customisation

Open `src/raccoon-cleaner.js` and tweak the emoji:

```js
this.bin.textContent = '🗑️'; // trash‑can
coon.textContent     = '🦝'; // raccoon
```

Adjust step sizes / delays in `beginDrag()` for a faster or lazier raccoon.

---

## Development

```bash
npm install          # install dev dependencies
npm run dev          # open live demo on http://localhost:8080
npm run build        # bundle & minify into dist/
npm run watch        # rebuild on every change
```

---

## License

[MIT](LICENSE)