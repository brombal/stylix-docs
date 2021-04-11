# Media queries

Stylix provides a feature that makes it a breeze to add styles according to a pre-defined set of media queries, such as desktop/tablet/mobile breakpoints.

While you could use the `$css` prop and nest media-specific styles under a media query selector, this will quickly become cumbersome:

```tsx-render
<$.div
  fontSize={32}
  $css={{
    "@media (max-width: 1024px)": {
      fontSize: 24
    },
    "@media (max-width: 768px)": {
      fontSize: 18
    },
  }}
>
  Screen size font sizes.
</$.div>
```

Instead, the `<StylixProvider>` element accepts a `media` prop that allows you to specify an array of media queries. Then any style prop on a Stylix element (or on a custom components that accepts Stylix style props) will accept an array of values in addition to singular values:

```tsx-render
<StylixProvider 
  media={[
    '',                    // All screen sizes
    '(max-width: 1024px)', // Tablet
    '(max-width: 768px)'   // Mobile
  ]}
>
  <$.div 
    font-size={[
      32, // All screen sizes
      24, // Tablet
      18  // Mobile
    ]}>
    Screen size font sizes.
  </$.div>
</StylixProvider>
```

This example will output the each `font-size` value according to the corresponding media query.

The `media` prop array can contain any number of entries and can be any values that can follow "@media" in the CSS media query specification, or an empty string. The order and contents of these values is up to you.

A style prop's array entries correspond to the `media` prop array entries—each array value will be effective only within the corresponding media query. Entries that correspond to an empty string will be effective globally (outside of a media query).

Including falsy values (except `0`) in a value array will simply not output any style for that property within the corresponding media query. 

The media query CSS output will be in the same order that you specify the queries in the `media` prop array, and it is up to you to manage the specificity of overlapping media queries appropriately. Notice that in the above example, the ordering is somewhat important because the two media queries `(max-width: 1024px)` and `(max-width: 768px)` actually overlap with each other. Two sets of styles are in effect at the same time, and with an incorrect order, the results might be unexpected. Stylix will be consistent with the CSS output, but is not opinionated about how you order the media queries—it is up to you to ensure that the resulting styles are what you expect.

With this feature, defining site-wide breakpoints and creating styles that are easy to adjust accordingly is simple and stress-free, and should account for the most common use case for media queries. As we mentioned at the beginning of this section, you also have the option to nest more specific media queries in the element's styles using the `$css` prop.
