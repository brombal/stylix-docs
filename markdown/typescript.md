# TypeScript support

Stylix is written in TypeScript and has built-in typings. There is no separate `@types` package for Stylix.

CSS props on Stylix elements are **strongly typed** and should provide autocompletion if your IDE supports it.

### Strongly type style props on your components with `StylixProps<T>`

The `StylixProps` interface represents all style props and the `$css` prop. You can **union** this type with your prop interface to include Stylix prop typings in your component's props' types.

```tsx-render
import $, { StylixProps } from '@stylix/core';

type BadgeButtonProps = StylixProps<'span'> & {
  badge: string;
};

const BadgeButton = (
  { badge, ...other }: BadgeButtonProps
) => (
  <$.button position="relative" {...other}>
    {other.children}
    <$.span
      position="absolute"
      top={-5}
      right={-5}
      background="red"
      width={20}
      height={20}
      line-height="20px"
      border-radius={10}
      font-size={14}
      text-align="center"
    >
      {badge}
    </$.span>
  </$.button>
);

<BadgeButton 
  badge="5" 
  color="white"
  padding="0 0.8em"
  background="teal"
>
  TypeScript support
</BadgeButton>
```

`StylixProps` is generic and accepts a type parameter that specifies the **type of the underlying Stylix element**. The type will include all the props of the underlying element. This can either be an HTML tag string (e.g. `StylixProps<'div'>`) or a component type (`StylixProps<typeof MyComponent>`). The default type is `'div'`. This type parameter allows your component to have type-safe props that can be spread to the underlying Stylix element.

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

<a href="/tinyprops" class="next-link">TinyProps</a>
