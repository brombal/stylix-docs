# Basics

Stylix provides all the standard HTML elements as properties of the `$` object (e.g. `<$.div>`, `<$.h1>`, `<$.p>`, etc.). They all accept props for any standard CSS property, in both `camelCase` and `snake-case` formats.

Stylix encourages following React best practices and principles. Although your app's JSX markup will be longer with additional style props, Stylix works seamlessly with React's component-based architecture to easily make styled components reusable and allow styles to be overridable when necessary.

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

The `Emphasize` component renders a `<div>` with bold text. Because we spread `...props` onto the `$.div` element, it also receives all the style props and children passed from the component that renders it.

If you don't want to allow overriding a particular style, just place it *after* the prop spread:

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
