# Basics

Stylix provides all the standard HTML elements as properties of the `$` object (e.g. `<$.div>`, `<$.h1>`, `<$.p>`, etc.). They all accept props for any standard CSS property, in both `camelCase` and `snake-case` formats.

```tsx-render
<$.div
  color="SkyBlue"
  text-align="center"
  font-size={40}
  font-weight="bold"
  font-style="italic"
>
  Hello, Stylix!
</$.div>
```

Although your app's JSX markup will be longer and seem more verbose with these additional style props, Stylix's simple use of props to create styles allows you to leverage basic JavaScript syntax and React features to keep your code concise and organized.

## Creating reusable styled components

By using **destructuring** and **spreading**, you can create custom reusable, style-able components:

```tsx-render
import $ from 'stylix';

const Emphasize = (props) => (
  <$.div font-weight="bold" {...props} />
);

<Emphasize>
  Stylix!
</Emphasize>
<Emphasize font-size="22pt">
  Large Stylix!
</Emphasize>
<Emphasize font-weight="normal" font-style="italic">
  Italic Stylix!
</Emphasize>
```

The `Emphasize` component simply renders a `<div>` with bold text. Because we spread `...props` onto the `$.div` element, it also receives all the style props and children passed from the component that renders it.

If you don't want to allow overriding particular styles, just place them *after* the prop spread:

```
import $ from 'stylix';

const Emphasize = (props) => (
  <$.div {...props} font-weight="bold" />
);

<Emphasize font-weight="normal" font-style="italic">
  Italic, but still bold.
</Emphasize>
```

If a component accepts other props that are not styles, you can use destructuring to separate them from the styles:

```tsx-render
import $ from 'stylix';

function DisplayName(props) {
  const { firstName, lastName, ...styles } = props;
  return (
    <$.div {...styles}>
      {lastName}, {firstName}
    </$.div>
  );
);

<DisplayName 
  firstName="Jim"
  lastName="Henson"
  font-weight="normal" 
  font-style="italic"
/>
```

Again, these are not directly features of Stylix, but just a result of the way it integrates with React.


## Dynamic styles

Of course, styles don't need to be fixed, static values: 

```tsx-render
import $ from 'stylix';

function App() {
  const [color, setColor] = React.useState('tomato');

  return (
    <div>
      <select>
        <option>Tomato</option>
        <option>DodgerBlue</option>
        <option>SeaGreen</option>
      </select>
      <$.div color={color}>{color}</div>
    </div>
  );
);
```

Once again, leveraging simple React features allows your styles to be completely dynamic, based on a component's state, props, or any other value.


## Styling other components

If you're writing your own components, the above approach is the recommended way to make them composable and reusable. But if you're working with 3rd party, legacy, or otherwise unworkable components, they can easily be styled with Stylix using the `$el` prop (short for "element"):

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

function App() {
  return (
    <div>
      <$ $el={Button} label="My Styled Button" font-weight="bold" />
    </div>
  );
}
```

The `$` component simply renders whatever component you pass to the `$el` prop, passing a class name that it generates from the given styles. As long as the component accepts a `className` prop, Stylix can style it.

Of course, if the above syntax is too verbose to repeat everywhere, you could create a reusable component out of it:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = (props) => <$ $el={Button} {...props} />;

function App() {
  return (
    <StyledButton label="My Styled Button" font-weight="bold" />
  );
}
```

### Prop conflicts

If a component accepts a prop that conflicts with a CSS property name, the CSS property will take precedence. If, for example, the `Button` components accepts a `color` prop to specify a predefined theme color such as "primary" or "secondary," Stylix will incorrectly apply the `color` value as the CSS text color, instead of the button theme color.

In this case, the `$elProps` prop can be used to pass props directly to the component specified by `$el`:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

function App() {
  return (
    <$ 
      $el={Button} 
      $elProps={{ color: 'primary' }}
      label="My Styled Button" 
      font-weight="bold" 
    />
  );
}
```

The `color` prop will be passed directly to `Button`. And since Stylix doesn't consider `label` to be a CSS property, it will be passed directly too. However, `font-weight` will be considered a style and applied as CSS.

If you would prefer to create a reusable component that always passes `color` directly to the `Button` component, you can do this with destructuring:

```tsx
import $ from 'stylix';
import { Button } from 'third-party-library';

const StyledButton = ({ color, ...styles }) => (
  <$ $el={Button} $elProps={{ color }} {...props} />
);

function App() {
  return (
    <StyledButton color="primary" label="My Styled Button" font-weight="bold" />
  );
}
```


