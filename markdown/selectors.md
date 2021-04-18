# Pseudo-classes and selectors

Stylix elements aren't limited to just CSS properties—you can also use pseudo-classes and complex selectors to apply styles. 

Because these strings (such as `:hover` or `div > span + a`) can't be used as JSX props (their syntax is incompatible), we need another way to specify them.

## The `$css` prop

The `$css` prop is accepted by all Stylix html elements (`<$.div>`, `<$.span>`, etc), and takes an object of additional styles to apply to an element. These styles can be not only simple CSS property/value pairs, but also pseudo-classes or complex selectors with nested style objects.

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

Stylix scopes all selectors in the `$css` object under the element that defines them. In the above example, the styles for `li` are local to only the elements under the `ul`.

## Referencing the parent selector with `&`

To reference the element's own class name, you can use `&` (as is the convention in the many CSS-like languages that support nested styles). 

Note that this is necessary when using certain pseudo-classes, such as `:hover`:

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

The `&` is useful in a variety of situations. Style objects can be nested infinitely deep, and selectors without the `&` symbol will be appended to the parent selector. You can use `&` anywhere that you want the selector to result in anything other than this default behavior.

## `$css` all the way down

The `$css` prop value is a *Stylix CSS object* and is very flexible in its behavior. These object can themselves contain a property named `$css`, which, you guessed it, is also a Stylix CSS object. Nested `$css` objects will merge into their parent, overriding properties in the parent

## Styling deeper elements

Using the `$css` prop makes it possible to style components that render deeper, complex HTML.

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

> `$el={Select}` above may be unfamiliar, but we will address this in the next section. In this example, it simply renders `<Select />` and attaches the generated class name.

Stylix will apply a unique, generated class name to this `Select` element, which will scope each selector used to style the matching descendant elements. 

<a href="/other-components" class="next-link">Styling other components</a>
