# Getting started with Stylix

## Installation

With npm:

```sh
npm install --save @stylix/core
```

With yarn:

```sh
yarn add @stylix/core
```

## The `<StylixProvider>` wrapper

Start importing `StylixProvider` from `@stylix/core` and placing a `<StylixProvider>` context wrapper element at the root of your app:

```tsx
import { StylixProvider } from '@stylix/core';

function App() {
  return (
    <StylixProvider>
      { /* ... */ }
    </StylixProvider>
  )
}
```

The `<StylixProvider>` component provides [themes](/themes), [media queries](/media-queries), and [plugins](/plugins) to descendent elements, and allows additional configuration for certain less-common situations. 

## New and improved `<$.html>` elements

```tsx
import $ from '@stylix/core';
```

The default export from `@stylix/core` is both a React component (used to style non-Stylix components; described in [Styling other components](/other-components)), as well as "namespace" object that contains stylable HTML elements. Throughout this documentation, we always import this default object as `$` (in homage to the convention of ancient ubiquitous "web 1.0" tools like jQuery), but you can name it whatever you like.

Stylix provides all the standard HTML elements as properties of the `$` object (e.g. `<$.div>`, `<$.h1>`, `<$.p>`, etc.). Use these elements to create HTML markup that can be styled with props—they all accept props for any standard CSS property, in both `camelCase` and `kebab-case` formats.

```tsx-render
import $ from '@stylix/core';

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

> **Note:** Numeric values (like `font-size={40}` above) are interpreted as pixel values for CSS properties that make sense.

You aren't just limited to standard CSS properties, either. Stylix lets you use [complex selectors, pseudo-classes, nested CSS](/selectors), [media queries](/media-queries), [keyframe animations](/keyframe-animations), [themes](/themes), and more.

Stylix generates a unique, deterministc class name for these styles and applies it to the element. The actual rendered output for the above example might look something like this:

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

Stylix creates the `<style>` element automatically and places it in the document's `<head>` (this behavior can be customized by the `<StylixProvider>`). The generated class name is a hash of the specified styles, and any components sharing identical styles will receive the same class name.

## Creating reusable styled components

Although your app's JSX markup will be longer and seem more verbose with these additional style props, Stylix's simple use of props to create styles allows you to leverage basic JavaScript syntax and React features to keep your code concise and organized.

By using **destructuring** and **spreading**, you can create reusable styled components that easily allow overriding styles when needed:

```tsx-render
const Emphasize = (props) => (
  <$.div font-weight="bold" {...props} />
);

<>
  <Emphasize>
    Stylix!
  </Emphasize>
  <Emphasize font-size="22pt">
    Large Stylix!
  </Emphasize>
  <Emphasize font-weight="normal" font-style="italic">
    Italic Stylix!
  </Emphasize>
</>
```

This `Emphasize` component simply renders a `<div>` with bold text. Because we spread `...props` onto the `$.div` element, it also receives all the style props and children passed from the component that renders it.

Spreading and destructuring allow you to do many other useful things with Stylix. For example, If you don't want to allow overriding particular styles, just place them *after* the prop spread. In the following example, the `font-weight` property can't be overridden, but other style properties would be passed normally.

```tsx-render
const Emphasize = (props) => (
  <$.div {...props} font-weight="bold" />
);

<Emphasize color="crimson" font-weight="normal">
  Still bold
</Emphasize>
```

If a component accepts other props that should not be passed on as CSS properties, you can use destructuring to separate them from style props:

```tsx-render
function DisplayName(props) {
  const { firstName, lastName, ...styles } = props;
  return (
    <$.div {...styles}>
      {lastName}, {firstName}
    </$.div>
  );
}

<DisplayName 
  firstName="Jim"
  lastName="Henson"
  font-weight="bold" 
  font-style="italic"
/>
```

Notice how these features don't come from Stylix, but instead are simply a result of the way it integrates with React.

## Dynamic styles

Of course, styles don't need to be fixed, constant values. Just like any other props, the values can come from a component's state, prop values, or any other variable. In the following example, a dropdown value is stored in a state variable, which is used to set the color of the text below it:

```tsx-render-app
function App() {
  const [color, setColor] = React.useState('tomato');

  return (
    <div>
      <select 
        onChange={e => setColor(e.target.value)}
      >
        <option>Tomato</option>
        <option>DodgerBlue</option>
        <option>SeaGreen</option>
      </select>
      <$.div color={color}>{color}</$.div>
    </div>
  );
}
```

Because styles are created with props, they become "first-class citizens" of your React app, and you can treat them as dynamically as you would any other prop values. Stylix is very efficient in how it generates CSS and can process thousands of updates per second, and it cleans up after itself when styles are no longer in use.

<a href="/selectors" class="next-link">Pseudo-classes and selectors</a>
