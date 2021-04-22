# Pseudo-classes and selectors

Stylix elements aren't limited to just CSS properties—you can also use **pseudo-classes** and **complex selectors** to apply styles. 

Because these strings (such as `:hover` or `div > span + a`) can't be used as JSX props (their syntax is incompatible), we need another way to specify them.

## The `$css` prop

The `$css` prop is an additional prop accepted by all Stylix html elements (`<$.div>`, `<$.span>`, etc) that takes an object of additional styles to apply to an element. These styles can be not only simple CSS property/value pairs, but also pseudo-classes or complex selectors with nested style objects.

> These objects are referred to as **style objects** and have a variety of features you can read about in the [API documentation](/api/style-objects).

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

Stylix scopes all selectors in the `$css` object under the element that defines them. In the above example, the styles for `li` are local to only the elements inside this `<$.ul>` element.

### Reference the parent selector with `&`

To reference the element's own class name, you can use `&` (as is the convention in the many CSS-like languages that support nested styles). 

Note that this is necessary when using certain pseudo-classes, such as `:hover`:

```tsx-render
import $ from '@stylix/core';

<$.a
  color="DarkOliveGreen"
  $css={{
    "&:hover": {
      color: "Olive"
    }
  }}
>
  Hover here
</$.a>
```

The use of `&` here applies the hover styles directly to this element, rather than its descendants. Without the `&`, the selector would only match hovered elements *within* the `<a>`, which is probably not what is intended. 

Style objects can be nested infinitely deep, and the `&` symbol will always be replaced with the entire selector immediately above the object where it is defined.   Selectors without the `&` symbol will be appended to the parent selector. You can use `&` anywhere that you want the selector to result in anything other than this default behavior.

## `$css` all the way down

[Style objects](/api/style-objects) are very flexible in their behavior. These objects can themselves contain a `$css` property that accepts further CSS objects or an array of CSS objects. A nested `$css` object will be recursively merged into its parent, overriding identical properties while preserving the order of keys. Arrays of Stylix CSS objects will be merged into a single object before being merged into its parent.

For example, consider the following Stylix CSS object:

```tsx
{
  fontWeight: 'bold',
  $css: [
    {
      fontSize: 12,
      fontWeight: 'normal',
      color: 'SandyBrown'
    },
    {
      fontSize: 24
    },
  ],
  color: 'SteelBlue'
}
```

Stylix will merge this object into the following:

```tsx
{
  fontWeight: 'normal',
  fontSize: 24,
  color: 'SteelBlue'
}
```

First, the array is merged together, causing `fontSize: 24` to override the previous definition. Then the resulting object is merged into the parent, overriding the previous `fontWeight: 'bold'` property, but not the subsequent `color: 'SteelBlue'` property.

This may seem like an excessive amount of flexibility, since you are you aren't likely to ever define complicated structures like this yourself. However, this flexibility is useful for allowing stylable components to pass on their own `$css` prop to an element that uses `$css`:

```tsx-render
const Link = ({ to, $css, ...styles }) => (
  <$.a 
    href={to} 
    color="ForestGreen" 
    $css={{
      '&:hover': { color: 'LightGreen' },
      $css
    }}
    {...styles} 
  />
);

<Link 
  $css={{ '&:hover': { textDecoration: 'underline' } }}
>
  Link with $css prop
</Link>
```

In the above example, the `Link` component separates the `$css` prop by destructuring it, and merges it with the `<$.a>` element's own `$css` value. Without this, the `<$.a>` element's `$css` value would be completely replaced by the prop passed to the `<Link>` element. You may run into situations where you need to merge several style objects together, and the flexibility of using nested `$css` values or arrays of style objects will come in handy.

<a href="/other-components" class="next-link">Styling other components</a>
