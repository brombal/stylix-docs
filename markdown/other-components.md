
# Styling other components with Stylix

If you're writing your own components, the above approach is the recommended way to make them composable and reusable. But if you're working with 3rd party, legacy, or otherwise unworkable components, they can easily be styled using the bare `$` component and its `$el` prop (short for "element"):

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

<$ $el={Button} label="My Styled Button" font-weight="bold" />
```

The `$` component simply renders whatever component you pass to the `$el` prop, passing the class name that it generates to its `className` prop. As long as the component accepts a `className` prop, Stylix can style it.

Of course, if the above syntax is too verbose to repeat everywhere, you can easily create a reusable component:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = React.forwardRef((props, ref) => (
  <$ $el={Button} ref={ref} {...props} />
));

<StyledButton label="My Styled Button" font-weight="bold" />
```

Forwarding the `ref` is not mandatory, but is best for compatibility and may be necessary in some cases. Because the above example is such a common use case, Stylix provides the `$.styled` convenience wrapper function. The following is functionally identical to the above example:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = $.styled(Button);

<StyledButton label="My Styled Button" font-weight="bold" />
```

## Prop conflicts

If a component accepts a prop that conflicts with a CSS property name, the CSS property will take precedence. This can present a problem in certain rare edge-case scenarios. For example, in some UI component libraries (such as Material UI), it is common for components to accept a `color` prop to specify a predefined theme color such as "primary" or "secondary." Because `color` is also a CSS property, Stylix will incorrectly interpret the value as the CSS text color instead of passing it to the component.

In this case, the `$el` prop can accept a complete React element instead of a component:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

<$ 
  $el={<Button color="primary" />}
  label="My Styled Button" 
  font-weight="bold" 
/>
```

Stylix won't interpret `color` here as CSS, but instead will render the entire `<Button color="primary" />` element as-is. And since Stylix doesn't consider `label` to be a CSS property, it will also be passed directly to `<Button>`. However, `font-weight` will be considered a style and applied as CSS.

To solve this issue with a reusable component, you could choose a new name for the prop and pass it to the underlying component as we did in the above example. With prop destructuring, the solution is a simple and elegant:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = ({ theme, ...styles }) => (
  <$ $el={<Button color={theme} />} ref={ref} {...styles} />
);

<StyledButton theme="primary" label="My Styled Button" font-weight="bold" />
```

Depending on your circumstances, you may not need or wish to rename the prop at all. In the example above, the UI component library is allowing you to specify some color through its theming system, so specifying a CSS text color is not likely to be particularly useful. However, be aware that if you chose to replace `theme` with `color` in the above example, you would not be able to specify a CSS text color through a simple prop anymore (though you could still use the `$css` prop).

The `$.styled()` can also be useful here. It accepts an object of mappings to rename props and pass them directly to the given component:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = $.styled(Button, { theme: 'color' });

<StyledButton theme="primary" label="My Styled Button" font-weight="bold" />
```

Exactly like the previous example, the `StyledButton`'s new `theme` prop will be passed as `<Button color={theme} />`. You only need to specify props whose names conflict with CSS properties. And if you don't see the need to rename the prop, the key and value can be the same (e.g. `$.styled(Button, { color: 'color' })`).
