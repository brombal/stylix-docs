
# Styling other components with Stylix

If you're writing your own components, prop destructuring and spreading (described in [Stylix basics](/basics)) is the recommended way to make them composable and reusable. But if you're working with 3rd party, legacy, or otherwise unworkable components, they can easily be styled using the bare `<$>` component and its `$el` prop (short for "element"):

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

<$ $el={Button} label="My Styled Button" font-weight="bold" />
```

The `$` component simply renders whatever component you pass to the `$el` prop, passing the class name that Stylix generates to the element's `className` prop. As long as the component accepts a `className` prop, Stylix can style it.

Of course, if the above syntax is too verbose to repeat everywhere, you can easily create a reusable component:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = (props) => <$ $el={Button} {...props} />;

<StyledButton label="My Styled Button" font-weight="bold" />
```

Note how this concise syntax is not a Stylix-specific feature or API, but simply a result of how Stylix works with React.

## Ref forwarding and `$.styled()`

Stylix automatically forwards refs to the element specified by `$el`. 

If you are creating a wrapper component, you may have to wrap it with `React.forwardRef`:

```tsx
const StyledButton = React.forwardRef(
  (props, ref) => <$ $el={Button} ref={ref} {...props} />
);

<StyledButton ref={myButtonRef} />
```

> Forwarding the `ref` is not mandatory, but is best for compatibility and is necessary if you want a consumer of the wrapper component to access the underlying DOM element. 

Because the above example is such a common use case, Stylix provides the `$.styled()` convenience wrapper function. The following is functionally identical to the above example:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = $.styled(Button);

<StyledButton ref={myButtonRef} />
```

## Prop conflicts

If the component you want to style accepts a prop that conflicts with a CSS property name, the CSS property will take precedence. This can present a problem in certain scenarios: for example, in some UI component libraries (such as Material UI), it is common for components to accept a `color` prop to specify a predefined theme color such as "primary" or "secondary." Because `color` is also a CSS property, Stylix will incorrectly interpret the value as the CSS text color instead of passing it to the component.

In this case, the `$el` prop can accept a complete React element instead of just a component name:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

<$ $el={<Button color="primary" />} label="My Styled Button" font-weight="bold" />
```

Stylix won't interpret `color` here as CSS, but instead will render the entire `<Button color="primary" />` element as-is. And since Stylix doesn't consider `label` to be a CSS property, it will also be passed directly to `<Button>`. However, `font-weight` will be considered a style and applied as CSS.

To solve this issue with a reusable component, you could decide to expose a new prop and pass it to the underlying component with the original prop name. With prop destructuring, the solution is simple:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = ({ theme, ...styles }) => (
  <$ $el={<Button color={theme} />} ref={ref} {...styles} />
);

<StyledButton theme="primary" label="My Styled Button" font-weight="bold" />
```

Depending on your circumstances, you may not want or need to rename the prop. In the example above, the UI component library allows you to specify some color through its theming system, so being able to also specify a CSS text color is not likely to be particularly useful. However, be aware that if you were to leave `color` as the prop name in the above example, you would need to use the `$css` prop to specify a CSS text color.

The `$.styled()` function can also be useful here too. It accepts an object of mappings to rename props before passing them to the given component:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = $.styled(Button, { theme: 'color' });

<StyledButton theme="primary" label="My Styled Button" font-weight="bold" />
```

Just like the previous example, the `StyledButton`'s new `theme` prop will be renamed and passed as `<Button color={theme} />`.

The mapping object's keys represent new props to add to the `StyledButton` component, and the values are the component's original prop names. Stylix will map the values of the new props to the old prop names and apply them directly to the underlying component. 

> **Note 1:** You only need to specify props whose names conflict with CSS properties. 

> **Note 2:** If you don't want to rename the prop, but still want it to be passed to the underlying element, the key and value can be the same (e.g. `$.styled(Button, { color: 'color' })`).
