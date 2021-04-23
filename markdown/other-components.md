
# Styling other components with Stylix

If you're writing your own components, the recommended way to make them composable and reusable is with prop destructuring and spreading (described in [Stylix basics](/basics)). 

But if you're working with 3rd party, legacy, or otherwise unworkable components, they too can be styled using the `$` component and its `$el` prop (short for "element"):

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

### Style deeper elements with the `$css` prop

If a component renders complex HTML that can be styled with class names or other selectors (as UI component libraries often do), they can be easily styled with [the `$css` prop](/selectors).

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

## Ref forwarding

Stylix will forward a `$` element's ref to the `$el` component. In the following example `buttonRef` will refer to the `Button` (or whatever it passes to `ref`):

```tsx
function App() {
  const buttonRef = useRef();

  return (
    <$ $el={Button} ref={buttonRef} />
  );
}
```

If you are creating a wrapper component, you would have to use `React.forwardRef()` to allow users of the component to pass a ref to the underlying element:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = React.forwardRef(
  (props, ref) => <$ $el={Button} ref={ref} {...props} />
);

<StyledButton ref={buttonRef} font-weight="bold" />
```

### Make ref forwarding easy with `$.styled()`

Because the above example is such a common scenario, Stylix provides the `$.styled()` wrapper function, which forwards the ref and all styles to the wrapped component. The following is equivalent to the above example:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = $.styled(Button);

<StyledButton ref={myButtonRef} font-weight="bold" />
```

## Prop conflicts

If the component you want to style accepts a prop that conflicts with a CSS property name, **the CSS property will take precedence**. This can present a problem in certain scenarios: for example, in some UI component libraries (such as Material UI), it is common for components to accept a `color` prop to specify a predefined theme color such as "primary" or "secondary." Because `color` is also a CSS property, Stylix will incorrectly interpret the value as the CSS text color instead of passing it to the component.

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

Stylix will preserve the Button's `color` prop as-is, and since it doesn't consider `label` to be a CSS property, the prop will also be passed directly to `<Button>`. However, Stylix *will* apply `font-weight` as a style.

### Make prop conflicts easy with `$.styled()`

`$.styled()` can help with prop conflicts, too. 

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = $.styled(Button, 'color');

<StyledButton color="primary" font-weight="bold" />
```

The 'rest' parameters of `$.styled()` accepts a list of prop names, and will **pass them directly** to the underlying component instead of treating them as styles.

## Just give me a class name

If you just need a class name to pass to a component, you can use the `useStyles()` hook. This function takes any [style object](/api/style-objects) and returns the generated class name.

```tsx
import { useStyles } from '@stylix/core';
import { Button } from 'third-party-library';

function StyledButton() {
  const buttonClass = useStyles({
    fontSize: 24
  });
  
  return (
    <Button className={buttonClass} ... />
  );
}
```

The styles given will only be present in the page's stylesheet **while the element is mounted.** 

If you want to disable the styles while the component is mounted, pass `{ disabled: true }` as the second parameter of `useStyles`. Remember, because of the **[rules of hooks](https://reactjs.org/docs/hooks-rules.html)**, you can't call this hook conditionally. 

```tsx
useStyles({ ... }, { disabled: true });
```


<a href="/global-styles" class="next-link">Global styles</a>

