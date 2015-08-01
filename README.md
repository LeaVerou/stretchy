# Stretchy [![CodeHunt.io](https://img.shields.io/badge/vote-codehunt.io-02AFD1.svg)](http://codehunt.io/sub/stretchy/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
Form element autosizing, the way it should be.

## Features

:heavy_check_mark: **Handles multiple types of form controls** _Textareas? Inputs? Select menus? You name it!_   
:heavy_check_mark: **Tiny footprint** _Less than 1.5KB minified and gzipped!_   
:heavy_check_mark: **Automatically accounts for newly added controls** _via mutation observers, where supported_   
:heavy_check_mark: **Restrict form controls by a selector** _…or don’t and autosize all your form controls!_   
:heavy_check_mark: **Completely standalone** _no jQuery or other dependencies_   
:heavy_check_mark: **Plays well with existing HTML/CSS** _Follows placeholders, styling, min/max-width/height constraints, transitions_   
:heavy_check_mark: **No JS knowledge required** _Everything configurable via HTML!_   
:heavy_check_mark: **Works in all modern browsers** _Chrome, FF 3.6, IE9, Opera, Safari, Android & more._

## Examples

http://leaverou.github.io/stretchy/#examples


## Usage

Just include the script anywhere in the page:   

```
<script src="stretchy.min.js" async></script>
```

By default, it applies to all `<textarea>`s, `<select>` menus with no size attribute and `<input>` elements that are text fields (e.g. with no type attribute, or with one equal to text, tel, email, url).   

To limit that set further you can use the data-stretchy-filter attribute, on any element. Note that this means you can use the attribute on the `<script>` element that calls Stretchy itself, in which case you can also shorten its name to data-filter.   

For example, to restrict it to elements that either have the foo class or are inside another element that does, you could use `data-stretchy-filter=".foo, .foo *"` on an element or call Stretchy like this:   

```
<script src="stretchy.min.js" data-filter=".foo, .foo *" async></script>
```

If you specify the data-stretchy-filter attribute on multiple elements, the last value (in source order) wins. data-filter directly on Stretchy’s `<script>` element takes priority over any data-stretchy-filter declaration.

If you want to avoid modifying the markup, you can use JavaScript instead, as long as this is set before `DOMContentLoaded` fires:

```
Stretchy.selectors.filter = ".foo, .foo *";
```

## JavaScript API

Stretchy has a spartan API, since in most cases you don’t need to call it at all. Stretchy works via event delegation and detects new elements via mutation observers, so you do not need to call any API methods for adding new elements via scripting (e.g. AJAX).   

If needed, these are Stretchy’s API methods:   

**Stretchy.resize(element)**
> Autosize one element based on its content. Note that this does not set up any event listeners, it just calculates and sets the right dimension (width or height, depending on the type of control) once.

**Stretchy.resizeAll(elements)**
> Apply Stretchy.resize() to a collection of elements, or all Stretchy is set to apply to, if no argument is provided.

**Stretchy.resizes()**
> Can Stretchy be used on this particular element? (checks if element is in the DOM, if it's of the right type and if it matches the selector filter provided by data-stretchy-selector, if the attribute is set.

**Stretchy.active**
> Boolean. Set to false to temporarily disable Stretchy.


## Browser Support Notes

On [browsers that do not support mutation observers](http://caniuse.com/#feat=mutationobserver), you have to manually call `Stretchy.resize()` on new elements.   

IE has an issue with `<input>` elements, due to it misreporting `scrollWidth`. If this matters to you, you can use [this polyfill](https://github.com/gregwhitworth/scrollWidthPolyfill) by Greg Whitworth (under development).
