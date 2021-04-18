
# Styling other components with Stylix

If you're writing your own components, the recommended way to make them composable and reusable is with prop destructuring and spreading (described in [Stylix basics](/basics)). But if you're working with 3rd party, legacy, or otherwise unworkable components, they can easily be styled using the `<$>` component and its `$el` prop (short for "element"):

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

<$ $el={Button} label="My Styled Button" font-weight="bold" />
```

The `$` component simply renders whatever component you pass to the `$el` prop, passing the class name that Stylix generates to the element's `className` prop. As long as the component accepts a `className` prop, Stylix can style it.

If you will be consistently styling a certain component this way, you might want to create a reusable component:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = (props) => <$ $el={Button} {...props} />;

<StyledButton label="My Styled Button" font-weight="bold" />
```

Notice that this syntax is not a Stylix-specific feature or API, but simply a result of how Stylix works with React.

## Styling deeper elements

If a component renders complex HTML that can be styled with class names or other selectors (as UI component libraries often do, for example), they can be easily styled with [the `$css` prop](/selectors).

Imagine a UI library that provides a custom select box, with a wrapper element, a popover, and options:

```tsx
import $ from '@stylix/core';
import { Select } from 'cool-ui-library';

<$
  $el={Select}
  $css={{
    ".Select-Wrapper": {
      fontSize: "22pt"
    },
    ".Select-Popover": {
      background: "white"
    },
    ".Select-Option:hover": {
      color: "blue"
    },
  }}
/>
```

Stylix will apply a unique, generated class name to this `Select` element, which will scope each selector used to style the matching descendant elements. 

## Ref forwarding and `$.styled()`

Stylix forwards a `$` element's ref to the `$el` component. The following example will work as expected:


```tsx
const buttonRef = useRef();
...
<$ $el={Button} ref={buttonRef} ... />
```

If you are creating a wrapper component, you must wrap it with `React.forwardRef` if you want a user of the component to be able to pass a ref:

```tsx
const StyledButton = React.forwardRef(
  (props, ref) => <$ $el={Button} ref={ref} {...props} />
);

<StyledButton ref={buttonRef} />
```

Because the above example is such a common scenario, Stylix provides the `$.styled()` convenience function. `$.styled()` simply returns a new component that forwards the ref and all styles to the given component. The following is functionally identical to the above example:

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

<$
  $el={<Button color="primary" />} 
  label="My Styled Button" 
  font-weight="bold" 
/>
```

Stylix won't interpret `color` here as CSS, but instead will render the entire `<Button color="primary" />` element as-is. And since Stylix doesn't consider `label` to be a CSS property, it will also be passed directly to `<Button>`. However, `font-weight` will be considered a style and applied as CSS.

To solve this issue with a reusable component, you could decide to expose a new prop name and pass it to the underlying component's original prop. With destructuring, the solution is simple:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = ({ theme, ...styles }) => (
  <$ $el={<Button color={theme} />} ref={ref} {...styles} />
);

<StyledButton theme="primary" label="My Styled Button" font-weight="bold" />
```

Depending on your circumstances, you may not want or need to rename the prop. In the example above, the `<Button>` uses the `color` prop to let you specify some color through its theming system, so being able to specify a CSS text color is not likely to be useful or necessary. However, be aware that if you were to keep `color` as the prop name in the above example, the only way to specify a CSS text color would be to use the `$css` prop.

The `$.styled()` function can also be useful here too. It accepts an object of mappings to rename props before passing them to the given component:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = $.styled(Button, { theme: 'color' });

<StyledButton theme="primary" label="My Styled Button" font-weight="bold" />
```

Just like the previous example, the `StyledButton`'s new `theme` prop will be renamed and passed into `Button` as `<Button color={theme} />`.

The mapping object's keys represent new props to add to the `StyledButton` component, and the values are the component's original prop names. Stylix will map the values of the new props to the old prop names and apply them directly to the underlying component. 

If you don't want to rename the prop, but still want it to be passed to the underlying element, the key and value can be the same (e.g. `$.styled(Button, { color: 'color' })`). You won't be able to use `color` as a CSS prop on this component anymore, but you could pass it in the `$css` prop if you need to use it.

<a href="/global-styles" class="next-link">Global styles</a>

