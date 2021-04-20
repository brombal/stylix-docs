# TypeScript support

Stylix is written in TypeScript and has built-in typings. There is no separate `@types` package for Stylix.

CSS props on Stylix elements are strongly typed and should provide autocompletion if your IDE supports it.

## Supporting style props on your components with `StylixProps<T>`

The `StylixProps` interface represents all style props and the `$css` prop:

```tsx-render
import $, { StylixProps } from '@stylix/core';

const BlueBox = (props: StylixProps) => (
  <$.div 
    color="DarkBlue" 
    border="1px solid RoyalBlue" 
    padding={10}
    {...props}
  />
);

<BlueBox font-size={24}>
  TypeScript support
</BlueBox>
```

`StylixProps` is generic and accepts a type parameter that specifies the **type of the underlying Stylix element**. This can either be an HTML tag string (e.g. `StylixProps<'div'>`) or a component type (`StylixProps<typeof MyComponent>`). The default type is `'div'`.

This type parameter allows your component to have type-safe props that can be spread to the underlying Stylix element:

```tsx-render
import $, { StylixProps } from '@stylix/core';

const BlueLink = (props: StylixProps<'a'>) => (
  <$.a
    color="DarkBlue" 
    border="1px solid RoyalBlue" 
    padding={10}
    {...props}
  />
);

<BlueLink href="/" font-size={24}>
  This element accepts all {`<a>`} properties
  and style props!
</BlueLink>
```

If your component has other props, you can define your prop type as a union:

```tsx-render
import $, { StylixProps } from '@stylix/core';

type BlueLinkProps = StylixProps<'a'> & {
  to: string;
};

const BlueLink = ({ to, ...other }: BlueLinkProps) => (
  <$.a
    href={to}
    color="DarkBlue" 
    border="1px solid RoyalBlue" 
    padding={10}
    {...other}
  />
);

<BlueLink to="/" font-size={24}>
  This element accepts all {`<a>`} properties
  and style props!
</BlueLink>
```

## Declaring custom props

If you define custom style props with `customProps`, TypeScript will also require you to define their types so that you can safely use them on Stylix elements. This is easy to do with interface extensions: Stylix provides a `StylixPropsExtensions` interface specifically for this purpose.

```tsx
import { Property } from 'csstype';

declare module '@stylix/core' {
  interface StylixPropsExtensions {
    p?: Property.Padding;
    bg?: Property.Background;
    royalBlue?: boolean;
  }
}

customProps({
  royalBlue: {
    color: 'RoyalBlue'
  },
  p: 'padding',
  bg: 'background'
});
```

> **Note:** The `csstype` package allows you to use the same type definitions that React uses for style definitions. It is a dependency of `@types/react` and is used for typing information only, so it will not add to your bundle size.
