# Stylix Basics

Stylix provides all the standard HTML elements as properties of the `$` object (e.g. `<$.div>`, `<$.h1>`, `<$.p>`, etc.). They all accept props for any standard CSS property, in both `camelCase` and `kebab-case` formats.

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

Stylix simply applies a unique class name to the element, and defines the given CSS styles within this class name. The output for the above example might look something like this:

```html
<style type="text/css">
.stylix-abc123 {
  color: SkyBlue;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
}
</style>

...

<div class="stylix-abc123">Hello, Stylix!</div>
```

Stylix creates the `<style>` element automatically and places it in the document's `<head>` (this behavior can be customized by the `<StylixProvider>`). The class name generated is not completely random: it is a hash of the specified styles, and any components sharing identical styles will receive the same class name.

## Creating reusable styled components

Although your app's JSX markup will be longer and seem more verbose with these additional style props, Stylix's simple use of props to create styles allows you to leverage basic JavaScript syntax and React features to keep your code concise and organized.

By using **destructuring** and **spreading**, you can create reusable styled components that easily allow overriding styles when needed:

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

This `Emphasize` component simply renders a `<div>` with bold text. Because we spread `...props` onto the `$.div` element, it also receives all the style props and children passed from the component that renders it.

A good understanding of how spreading and destructuring works allows you to many interesting things with Stylix. For example, If you don't want to allow overriding particular styles, just place them *after* the prop spread:

```tsx
const Emphasize = (props) => (
  <$.div {...props} font-weight="bold" />
);
```

In the above example, the `font-weight` property can't be overridden, but other style properties would be passed normally.

If a component accepts other props that should not be passed on as CSS properties, you can use destructuring to separate them from the styles:

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

Notice how these features don't come from Stylix, but are rather just a result of the way it integrates with React.

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

Just like any other props in React, values can be state variables, props, or any other value.

