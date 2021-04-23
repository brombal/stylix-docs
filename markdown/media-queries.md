# Media queries

The most basic way to add media queries to your styles is with the `$css` prop, using a media query string as a key. This will define styles specific to that element when the media query is applicable.

```tsx-render
import $ from '@stylix/core';

<$.div
  fontSize={32}
  $css={{
    "@media (max-width: 1024px)": {
      fontSize: 24
    }
  }}
>
  Responsive font sizes!
</$.div>
```

You can **nest media queries** anywhere within a style object, just like other selectors. Styles will be applied to the current selector, but only for the given media query.

This technique is straightforward, but it is also fairly verbose and might become cumbersome for a responsive app that needs to consistently handle different screen sizes.  Instead, Stylix provides a unique feature that makes it a breeze to add styles according to a set of media queries, such as desktop/tablet/mobile breakpoints.

## Media query arrays

Stylix allows you to **predefine** a set of media queries that your app can easily reference. By providing an array of media queries to the `<StylixProvider>` element's `media` prop, you can then use an **array of values** in any style prop to define the styles to use for each corresponding media query. Each value in the array will only be applied to the matching media query in the `media` prop array.

```tsx-render
import $, { StylixProvider } from '@stylix/core';

<StylixProvider 
  media={[
    '',
    '(max-width: 1024px)',
    '(max-width: 768px)'
  ]}
>
  <$.div 
    font-size={[
      32, // Matches '' (no media query)
      24, // Matches '(max-width: 1024px)'
      18  // Mathces '(max-width: 768px)'
    ]}
  >
    Responsive font sizes with Stylix media query arrays!
  </$.div>
</StylixProvider>
```

The StylixProvider's `media` prop array can contain any number of entries, and each value can be any string that follows the `@media` keyword in CSS (`@media _____ { ... }`). You can also include an empty string to apply corresponding styles without any media query restriction.

**Omitting values** (or using `null`, `undefined`, `false`, or `""`) in a style prop array will output nothing for that property within the corresponding media query.

### Media query array ordering

Stylix is unopinionated about how you define and order your media queries. The above example used "overlapping" media queries; that is, more than one might be in effect at a time (e.g. a screen width of 480px would apply to all 3 media queries).

Stylix will output the media-specific CSS in the same order that it is defined in the `media` prop array. You can use this to your advantage so that you only have to define styles for increasingly-specific media queries. For exmaple:

```tsx-render
import $, { StylixProvider } from '@stylix/core';

<StylixProvider 
  media={[
    '',
    '(max-width: 1024px)',
    '(max-width: 768px)'
  ]}
>
  <$.div 
    font-size={[
      32, // Desktop
      24, // Tablet
      18  // Mobile
    ]}
    font-weight={[
      '',     // All screens sizes
      'bold', // Tablet & Mobile
    ]}
  >
    Screen size font sizes/weights.
  </$.div>
</StylixProvider>
```

Because the media queries overlap with each other, we can allow values to "carry over" to other matching media queries that have nothing specified. In the above example, `font-size` has values specified for each media query; but `font-weight` has an empty string for the blank media query, and omits the "mobile" entry altogether. This means `font-weight: bold` will only be defined within the `(max-width: 1024px)` media query; but since a smaller screen (under 768px) will still match this query, bold text still appears on the smaller screens.

It is up to you to decide the order and specificity of overlapping media queries. With this flexibility, you have the option to work with "desktop-first" or "mobile-first" breakpoints. The above example is "desktop-first": as more array entries are given, they define styles for screens as they get smaller:

- `font-size={[32]}` defines a 32px font size for all screen sizes.
- `font-size={[32, 24]}` defines 32px for desktop only, and 24px for tablet & mobile.
- `font-size={[32, 24, 18]}` defines specific font sizes for each screen size.

A "mobile-first" approach might reverse this and use the following `media` prop value: 

```tsx
<StylixProvider 
  media={[
    '',                   // All screen sizes
    '(min-width: 768px)', // Tablet & Desktop
    '(min-width: 1024px)' // Desktop
  ]}
/>
```

In this case, additional array entries define styles for screens as they get larger:

- `font-size={[18]}` defines an 18px font size for all screen sizes.
- `font-size={[18, 24]}` defines 18px for mobile only, and 24px for desktop & tablet.
- `font-size={[18, 24, 32]}` defines specific font sizes for each screen size.

You are not required to use array values for style props just because you have a `media` array defined. If you don't use an array value, the styles are applied normally—without any media query restriction.

<a href="/themes" class="next-link">Theming</a>
