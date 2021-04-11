# Theming your app with Stylix

Because Stylix is all JavaScript and React code, theming your app might be as simple as defining your theme-specific values in an object, and using those values throughout your app:

```
const myTheme = {
  text: {
    light: 'WhiteSmoke',
    dark: 'MidnightBlue',
  },
  background: {
    light: 'AliceBlue',
    dark: 'DarkSlateGray'
  }
}

<$.div>
  <$.div 
    color={myTheme.text.light} 
    background={myTheme.background.dark}
  >
    Light text on a dark background.
  </$.div>
  <$.div 
    color={myTheme.text.dark} 
    background={myTheme.background.light}
  >
    Dark text on a light background.
  </$.div>
</$.div>
```

This is a simple, un-complicated way to style your app using values that you can store in a central location.

However, if you need something a bit more dynamic (for example, to allow a light/dark theme option), Stylix offers a way to provide a theme object to your components that allows them to react to changes in the theme.


## The Stylix context

The StylixProvider's `theme` prop allows you to specify an object to make available to any descendant elements. This object can have any structure at all—Stylix has no opinion on how you define your theme. In descendant elements, you can get the current theme object using the `useStylixTheme()` hook function.

For example:

```tsx-render
import $, { StylixProvider, useStylixContext } from '@stylix/core';

function ThemeDemo() {
  const theme = useStylixTheme();

  return (
    <$.div 
      color={theme.textColor}
      background={theme.backgroundColor}
    >
      Pale turquoise on navy!
    </$.div>
  );
}

const myThene = {
  textColor: 'PaleTurquoise',
  backgroundColor: 'Navy',
};

<StylixProvider theme={myTheme}>
  <ThemeDemo /> 
</StylixProvider>
```

Of course, this example is just as static as the previous one. Stylix doesn't currently provide any built-in functionality to replace or modify the theme object. Stylix considers the theme object to be controlled by you—if you need to modify the theme object programmatically, it is up to you to define this behavior the same way you might control any other React context or state value.

A simple way to do this might be to keep your theme object in a state variable, and provide descendant elements with a function to modify it via a custom `<StylixProvider>` property:

```tsx-app
import $, { StylixProvider } from '@stylix/core';

const themes = {
  light: {
    textColor: 'Navy',
    background: 'LightCyan',
  },
  dark: {
    textColor: 'AliceBlue',
    background: 'MidnightBlue'
  }
};

function ThemeDemo() {
  const stylixCtx = useStylixContext();
  const theme = useStylixTheme();

  return (
    <$.div>
      <$.select 
        onChange={e => stylixCtx.setThemeName(e.target.value)}
        width={100}
        margin-bottom={20}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </$.select>

      <$.div 
        color={theme.textColor}
        background={theme.backgroundColor}
        padding={10}
      >
        {context.theme.name}
      </$.div>
    </$.div>
  );
}

function App() {
  const [themeName, setThemeName] = useState('light');

  return (
    <StylixProvider 
      theme={themes[themeName]} 
      setThemeName={setThemeName}
    >
      <ThemeDemo />
    </StylixProvider>
  );
}
```

In this example, the `App` component stores the current theme name in a state variable, and provides the `setThemeName` setter function to the `StylixProvider` as a custom prop. 

By using `getStylixContext()`, we can access the `setThemeName` function in a descendent element. Any custom props you add to a `StylixProvider` are available on the Stylix context object.


## Theme functions

The above examples require using `useStylixTheme()` to access the current theme. This is already a simple, concise way to access it, but it gets even simpler than this.

In place of simple style values like numbers and strings, style props can accept a function that returns a style value. This function will receive the current theme object as its first parameter, and the entire Stylix context as the second parameter.

For example:

```tsx-render
import $, { StylixProvider } from '@stylix/core';

const myThene = {
  textColor: 'PaleTurquoise',
  backgroundColor: 'Navy',
};

const ThemeDemo = () => (
  <$.div 
    color={(theme) => theme.textColor}
    background={(theme) => theme.backgroundColor}
  >
    Pale turquoise on navy!
  </$.div>
);

<StylixProvider theme={myTheme}>
  <ThemeDemo /> 
</StylixProvider>
```

This slightly more concise approach allows you to still define components using the short arrow function syntax without curly braces, since you don't need the extra function call to `useStylixTheme()`.

It also allows you to define helper functions to access theme values or even modify them on the fly. The possibilities are endless!

```tsx-render
import $, { StylixProvider } from '@stylix/core';

const myThene = {
  textColor: 'Navy',
  baseFontSize: 12,
};

/**
 * Simple theme accessor function - 
 * might be useful for complex theme objects
 */
const getTextColor = (theme) => theme.textColor;

/**
 * Curried function that lets you specify some parameter
 * to modify a theme object value.
 * A contrived example, but demonstrates the possibilities
 * of dynamically generated theme values.
 */ 
const getFontSize = (multiplier) => 
  (theme) => theme.baseFontSize + 2 * multiplier;

const ThemeDemo = () => (
  <$.div 
    color={getTextColor}
    fontSize={getFontSize(3)}
  >
    Navy text, 18px font size
  </$.div>
);

<StylixProvider theme={myTheme}>
  <ThemeDemo /> 
</StylixProvider>
```
