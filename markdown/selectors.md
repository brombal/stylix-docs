# Pseudo-classes and selectors

Stylix elements aren't limited to just CSS properties—you can also use pseudo-classes and complex selectors to apply styles. 

Because these strings (such as `:hover` or `div > span + a`) would never work as JSX props (their syntax is incompatible), we need another way to specify them.

## The `$css` prop

The `$css` prop accepts an object of additional styles to apply to an element. These styles can be not only simple CSS property/value pairs, but also pseudo-classes or complex selectors with nested style objects. Consider the following example:

```tsx-render
import $ from '@stylix/core';

<$.ul
  font-weight="bold"
  $css={{
    li: {
      listStyleType: 'circle',
      marginLeft: 30,
    }
  }}
>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</$.ul>
```

Stylix scopes the `li` selector under the element that defines it, so the styles are local to only the `li` elements under the `ul`.

## Referencing the parent selector with `&`

To reference the element's own class name, you can use `&`, as is the convention in the many CSS-like languages that support nested styles. This is necessary when using certain pseudo-classes, such as `:hover`:

```tsx-render
import $ from '@stylix/core';

<$.a
  color="YellowGreen"
  $css={{
    // Notice the use of quotes to support the more complex syntax.
    "&:hover": {
      color: "DarkOliveGreen"
    }
  }}
>
  Hover here
</$.a>
```

The use of `&` here applies the hover styles directly to this element, rather than its descendants. Without the `&`, the selector would only match hovered elements *within* the `<a>`, which is probably not what is intended. 

The `&` is useful in a variety of situations. Style objects can be nested infinitely deep, and by default, selectors will be appended to the parent selector. You can use `&` anywhere that you want the resulting selector to be anything other than the default.

## Styling complex components

Using the `$css` prop makes it possible to style components that render more complex HTML.

For example, UI component libraries often render elements with class names that you can use to customize their styles. Imagine a UI library that provides a custom select box, with a wrapper element, a popover, and options:

```tsx
import $ from '@stylix/core';
import { Select } from 'cool-ui-library';

<$
  $el={Select}
  $css={{
    ".Select-Wrapper": {
      fontSize: "22pt"
    },
    ".Select-Popover": {
      background: "white"
    },
    ".Select-Option:hover": {
      color: "blue"
    },
  }}
/>
```

Stylix would apply a unique class name to this `Select` element, which in turn would be used to scope each selector in order to style the matched descendent elements. 

