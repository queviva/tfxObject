# tfxObject
_true|false|null html input object_

takes an html input element with type="range" and converts it in to a three-position toggle slider

...for the many times when 'un-answered' is an equally valid response

tfxStyles.css custom formats the thumb, and other aspects of the range input, to resemble a common
toggle slider, but with a centered "null" or "unselected" option

```html
<style src="tfxStyles.css>
<input
  type="range"
  class="tfx tfx-slider"
/>
<script src="tfxScript.js">
```

view the [demoPage.html](https://queviva.github.io/tfxObject/demoPage.html) to see an implimentation of a Yes/No/NoAnswer input type
