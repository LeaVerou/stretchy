<header>

# Stretchy

Form element autosizing, the way it should be!

</header>

<section id="features">

# Features

- **Handles multiple types of form controls** Textareas? Inputs? Select menus? You name it!
- **Tiny footprint** [Less than 1.5KB](https://bundlephobia.com/package/stretchy@1.0.0) minified and gzipped!
- **Automatically accounts for newly added controls** via mutation observers, where supported
- **Restrict form controls by a selector** …or don’t and autosize all your form controls!
- **Completely standalone** no jQuery or other dependencies
- **Plays well with existing HTML/CSS** Follows placeholders, styling, `min/max-width/height` constraints, transitions
- **No JS knowledge required** Everything configurable via HTML!
- **[Works in all modern browsers](#browser-support)**

</section>

<section id="usage">

# Usage

<section id="iife">

## Good ol’ `<script>` element

This method is optimal if you don't need much control, and would rather avoid writing any JS.

Just include the script anywhere in the page:

```html
<script src="https://stretchy.verou.me/dist/stretchy.iife.min.js" async></script>
```

If you include Stretchy this way it will run automatically and you don’t need to do anything else (unless you want to [customize which elements it applies to](#filter)).

</section>

<section id="esm">

## ESM (v2.0.0+)

This method is ideal if you are including Stretchy as a dependency on a larger project and want to prevent any side effects.

```js
import * as Stretchy from "https://stretchy.verou.me/dist/stretchy.min.js";
Stretchy.init();
```

</section>

<section id="cjs">

## CommonJS (v2.0.0+)

A CommonJS build is also available. `require("stretchy")` should work on Node.

</section>

</section>

<section id="filter">

# Which elements does Stretchy resize?

By default, Stretchy resizes all `<textarea>`s, `<select>` menus with no `size` attribute and `<input>` elements that are text fields (e.g. with no `type` attribute, or with one equal to `text`, `tel`, `email`, `url`).

To limit that set further you can set an additional filter, via a CSS selector. There are two ways to specify a filter: via HTML attributes (if you'd prefer to avoid writing JS)
	or via JS.

## Via HTML attributes:

Use the `data-stretchy-filter` attribute, on any element. Note that this means you can use the attribute on the `<script>` element that calls Stretchy itself, in which case you can also shorten its name to `data-filter`.

For example, to restrict it to elements that either have the `foo` class or are inside another element that does, you could use `data-stretchy-filter=".foo, .foo *"` on an element or call Stretchy like this:

```html
<script src="stretchy.min.js" data-filter=".foo, .foo *" async></script>
```

If you specify the `data-stretchy-filter` attribute on multiple elements, the last value (in source order) wins. `data-filter` directly on Stretchy’s `<script>` element takes priority over any `data-stretchy-filter` declaration.

## Via JS

If you want to avoid modifying the markup, you can use JavaScript instead:

```javascript
Stretchy.selectors.filter = ".foo, .foo *";
```

Note that if you are [including Stretchy via a `<script>` element](#iife), it will run as soon as the document is ready, which may be before you’ve set a filter.
	You need to ensure that line runs <em>after Stretchy has loaded</em> (so that the `Stretchy` object is available) and <em>before the DOM is ready</em>.
	To avoid this hassle, I'd recommend using attributes to set the filter if you include Stretchy that way, or [including Stretchy as a module](#esm) if you want
		to customize its settings via JS.

</section>

<section id="api">

# JavaScript API

Stretchy has a spartan API, since in most cases you don’t need to call it at all. Stretchy works via event delegation and detects new elements via mutation observers, so <strong>you do not need to call any API methods for adding new elements</strong> via scripting (e.g. AJAX).

If needed, these are Stretchy’s API methods:

| Property or Method | Description |
|--------------------|-------------|
| `init([root])` | Resize controls inside a given element, and monitor for changes. |
| `resize(element)` | Autosize one element based on its content. Note that this does not set up any event listeners, it just calculates and sets the right dimension (width or height, depending on the type of control) once.
| `resizeAll([elements \| selector, [root]])` | Apply `Stretchy.resize()` to a collection of elements, or all Stretchy is set to apply to, if no argument is provided. |
| `resizes(element)` | Can Stretchy be used on this particular element? (checks if element is in the DOM, if it's of the right type and if it matches the selector filter provided by `data-stretchy-selector`, if the attribute is set. |
| `selectors.base` | CSS selector that elements need to match to be resized. |
| `selectors.filter` | CSS selector that elements need to match to be resized. |
| `active` | Boolean. Set to `false` to temporarily disable Stretchy globally.` |

</section>

<section id="browser-support">

# Browser support

<md-block src=".browserslistrc" hmin="2">

All modern browsers.
For details, see [.browserslistrc](.browserslistrc)

</md-block>

## v1 Browser Support Notes

Stretchy v1 worked in Chrome, FF 3.6, IE9, Opera, Safari, Android & more.

- On [browsers that do not support mutation observers](http://caniuse.com/#feat=mutationobserver), you have to manually call `Stretchy.resize()` on new elements.
- IE has an issue with `<input>` elements, due to it misreporting `scrollWidth`. If this matters to you, you can use [this polyfill](https://github.com/gregwhitworth/scrollWidthPolyfill) by Greg Whitworth (under development).

</section>