# Media queries

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

Instead, Stylix provides a unique feature that makes media queries a breeze. 

Your `<StylixProvider>` element can accept a `media` prop that allows you to specify an array of media queries. The array can contain any number of entries and can be any values that can follow `@media` in the CSS media query specification. It can also accept an empty string. The order and contents of these values is up to you.

```tsx-render
<StylixProvider media={['', '(max-width: 1024px)', '(max-width: 768px)']}>
  ...
</StylixProvider>
```

Once you define your desired media queries, any style prop on a Stylix element (or on custom components that accepts Stylix style props) will accept an array of values in addition to singular values. The array entries correspond to the `media` prop array entries, and each entry value will be applied only within the corresponding media query (entries that correspond to an empty string media query will be applied outside of any media query).

Just like the above example, the following example will output text with `font-size: 32px` on screens larger than 1024px (corresponding to an empty string media query); with `font-size: 24px` on screens between 768px and 1024px; and finally with `font-size: 18px` on screens smaller than 768px.

```tsx-render
<StylixProvider 
  media={['', '(max-width: 1024px)', '(max-width: 768px)']}
>
  <$.div font-size={[32, 24, 18]}>
    Screen size font sizes.
  </$.div>
</StylixProvider>
```

Passing falsy values will simply not output any style for that property within the corresponding media query. The media query CSS output will be in the same order that you specify the queries in the `media` prop array, and it is up to you to manage the specificity of potentially overlapping media queries appropriately. Notice that in the above example, the ordering is somewhat important because the two media queries `(max-width: 1024px)` and `(max-width: 768px)` actually overlap with each other. Two sets of styles are in effect at the same time, and with an incorrect order, the results might be unexpected. Stylix will be consistent with the CSS output, but is not opinionated about how you order the media queries—it is up to you to ensure that the resulting styles are what you expect.

With this feature, defining site-wide breakpoints and creating styles that are easy to adjust accordingly is simple and stress-free. As we mentioned at the beginning of this section, you always have the option to embed more specific media queries in the element's styles using the `$css` prop, but this should provide coverage for most use-cases.
