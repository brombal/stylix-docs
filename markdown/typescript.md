# TypeScript support

Stylix is written in TypeScript and has built-in typings. There is no separate `@types` package for Stylix.

CSS props on Stylix elements are **strongly typed** and should provide autocompletion if your IDE supports it.

### Strongly type style props on your components with `StylixProps<T>`

The `StylixProps` interface represents all style props and the `$css` prop. You can **union** this type with your prop interface to include Stylix prop typings in your component's props' types.

```tsx-render
import $, { StylixProps } from '@stylix/core';

type ButtonProps = StylixProps<'button'> & {
  
};

const Button = (
  { color, ...styles }: ButtonProps
) => (
  <$.button 
    background={color}
    border-radius={4}
    color="white"
    {...styles}
  />
);

<Button color="Teal" font-size={24}>
  TypeScript support
</Button>
```

`StylixProps` is generic and accepts a type parameter that specifies the **type of the underlying Stylix element**. This can either be an HTML tag string (e.g. `StylixProps<'div'>`) or a component type (`StylixProps<typeof MyComponent>`). The default type is `'div'`. This type parameter allows your component to have type-safe props that can be spread to the underlying Stylix element.

## Declaring custom props

If you define custom style props with `customProps`, TypeScript will also require you to define their types so that you can safely use them on Stylix elements. This is easy to do with interface extensions: Stylix provides a `StylixPropsExtensions` interface specifically for this purpose.

```tsx
import { customProps } from '@stylix/core';
import { Property } from 'csstype';

declare module '@stylix/core' {
  interface StylixPropsExtensions {
    lst?: Property.ListStyleType;
    royalBlue?: boolean;
    padHorizontal?: number | string;
  }
}

customProps({
  royalBlue: {
    color: 'RoyalBlue'
  },
  lst: 'lst-style-type',
  padHorizontal: value => ({
    paddingLeft: value, 
    paddingRight: value 
  })
});
```

> **Note:** The `csstype` package allows you to use the same type definitions that React uses for style definitions. It is a dependency of `@types/react` and is used for typing information only, so it will not add to your bundle size.
