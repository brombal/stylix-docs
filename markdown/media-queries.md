# Media queries

The most basic way to add media queries to your styles is to use the `$css` prop, and add styles inside a nested "@media" query:

```tsx-render
<$.div
  fontSize={32}
  $css={{
    "@media (max-width: 1024px)": {
      fontSize: 24
    }
  }}
>
  Screen size font sizes.
</$.div>
```

You can nest media queries anywhere within a style object, just like selectors. However, this technique is verbose and might become cumbersome for a responsive app that needs to consistently handle different screen sizes. 

Stylix provides a feature that makes it a breeze to add styles according to a set of media queries, such as desktop/tablet/mobile breakpoints.

## Media query arrays

The `<StylixProvider>` element accepts a `media` prop that allows you to specify an array of media queries. Any style prop on a Stylix element (or on a custom components that accepts Stylix style props) will then accept an array of values in addition to singular values. The style prop's array entries will match the corresponding media query in the `media` prop's array. For example:

```tsx-render
<StylixProvider 
  media={[
    '(min-width: 1025px)',                        // Desktop
    '(max-width: 1024px) and (min-width: 769px)', // Tablet
    '(max-width: 768px)'                          // Mobile
  ]}
>
  <$.div 
    font-size={[
      32, // Desktop
      24, // Tablet
      18  // Mobile
    ]}
  >
    Screen size font sizes.
  </$.div>
</StylixProvider>
```

The StylixProvider's `media` prop array can contain any number of entries, and each value can be any string that follows "@media ..." in regular CSS. You can also include an empty string—corresponding styles will be output without any media query (i.e. applied to any screen size). 

A style prop's array entries will be applied only within their corresponding media query. Omitting values, or using `null`, `undefined`, `false`, or empty strings will simply not output any style for that property within the corresponding media query.

# Media query ordering

Stylix is unopinionated about how you define and order your media queries. The above example used strict, non-overlapping media queries, meaning each style prop array entry (such as `font-size={[32, 24, 18]}`) will only correspond to exactly one screen size. This also means that using falsy values in an array or omitting them entirely (e.g. `font-size={[32, 24]}`) would not output *any* styles for that media query.

A more flexible approach might be to use overlapping media queries, allowing style values to "carry over" to the next media query. For example:

```tsx-render
<StylixProvider 
  media={[
    '',                    // All screen sizes
    '(max-width: 1024px)', // Tablet & Mobile
    '(max-width: 768px)'   // Mobile
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

Because the media queries "overlap" with each other (small mobile screens would match both the `(max-width: 1024px)` and `(max-width: 768px)` media queries), we can allow values to carry over to other matching media queries that have nothing specified. In the above example, `font-size` has values specified for each media query, but `font-weight` omitted the 3rd value. This means `bold` will only be applied to the `(max-width: 1024px)` media query; but a small screen (under 768px) would still match that query. And since no styles were given for the `(max-width: 768px)` media query, the smaller screens will still have bold text.

Stylix will always order the output of styles according to the order that you specify them in the `media` prop array. It is up to you to manage the specificity of overlapping media queries. With this flexibility, you have the option to work with "desktop-first" or "mobile-first" breakpoints. The above example is "desktop-first": as more array entries are given, they define styles for screens as they get smaller:

- `font-size={[32]}` defines a 32px font size for all screen sizes.
- `font-size={[32, 24]}` defines 32px for desktop only, and 24px for tablet & mobile.
- `font-size={[32, 24, 18]}` defines font sizes separately for each screen size.

A "mobile-first" approach might use the following `media` prop value: 

```tsx
<StylixProvider 
  media={[
    '',                   // All screen sizes
    '(min-width: 768px)', // Tablet & Desktop
    '(min-width: 1024px)' // Desktop
  ]}
>
```

In this case, additional array entries define styles for screens as they get larger:

- `font-size={[18]}` defines the font size for all screen sizes.
- `font-size={[18, 24]}` defines 18px for mobile only, and 24px for desktop & tablet.
- `font-size={[18, 24, 32]}` defines font sizes separately for each screen size.


