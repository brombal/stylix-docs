# Theming your app with Stylix

Stylix is completely unopinionated about theming your app's styles. Because Stylix doesn't ship with any predefined styles, there is nothing out of the box that needs theming.

However, Stylix does come with some features that make it simple to share styles or other data throughout your app the same way you might share any other information—via React context.

## Don't complicate things

Because Stylix is all JavaScript, theming your app might be as simple as defining your theme-specific values in a plain object, and using those values throughout your app:

```tsx-render
const myTheme = {
  text: {
    light: 'WhiteSmoke',
    dark: 'MidnightBlue',
  },
  background: {
    light: 'AliceBlue',
    dark: 'DarkSlateGray'
  }
};

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

## The Stylix theme context

If you need something a bit more dynamic than a plain, shared object (for example, to allow light/dark theme options), Stylix provides a way to pass a theme object to descendant elements and cause them to rerender when the theme is changed.

To do this, pass any object to the StylixProvider's `theme` prop. This object can have any structure at all—Stylix has no opinion on how you define your theme. In descendant elements, you can access the current theme object with the `useStylixTheme()` hook function.

Because Stylix doesn't prescribe how your theme is created or where it comes from, it also doesn't provide any built-in functionality to replace or modify the theme. Instead, Stylix leaves it up to you to manage this value the same way you might handle any other React state or context value. A simple way to do this might be to keep your theme object in a state variable, and provide a function to modify it via the theme object itself.

For example:

```tsx-render-app
import $, { StylixProvider, useStylixTheme } from '@stylix/core';

const themes = {
  light: {
    name: "Light Theme",
    textColor: 'Navy',
    background: 'LightCyan',
  },
  dark: {
    name: "Dark Theme",
    textColor: 'AliceBlue',
    background: 'MidnightBlue'
  }
};

function ThemeDemo() {
  const theme = useStylixTheme();

  return (
    <$.div>
      <$.select 
        onChange={e => theme.setThemeName(e.target.value)}
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
        {theme.name}
      </$.div>
    </$.div>
  );
}

function App() {
  const [themeName, setThemeName] = React.useState('light');

  // Notice the use of useMemo to prevent 
  // unnecessary component rerenders!
  const theme = React.useMemo(() => ({
    ...themes[themeName],
    setThemeName,
  }), [themeName]);
  
  return (
    <StylixProvider theme={theme}>
      <ThemeDemo />
    </StylixProvider>
  );
}
```

In this example, the `App` component stores the current theme name in a state variable, and provides a theme object that includes the `setThemeName` state setter function. Using `getStylixTheme()`, we can access the `setThemeName` function in any descendent component. (You could also store the current theme object directly in a state variable, but using `setThemeName` to modify the theme prevents descendent elements from setting the entire theme to some arbitrary value.)


## Theme functions

The above examples require using `useStylixTheme()` to access the current theme. While this is already a simple and concise way to access the theme, it gets even simpler than this with **theme functions**. In place of primitive style values like numbers and strings, style props can also accept functions that return a style value. These functions will receive the current theme object as the first parameter, and the entire Stylix context as the second parameter.

For example:

```tsx-render
import $, { StylixProvider } from '@stylix/core';

const myTheme = {
  textColor: 'PaleTurquoise',
  backgroundColor: 'Navy',
};

const ThemeDemo = () => (
  <$.div 
    color={(theme) => theme.textColor}
    background={(theme) => theme.background}
  >
    Pale turquoise on navy!
  </$.div>
);

<StylixProvider theme={myTheme}>
  <ThemeDemo /> 
</StylixProvider>
```

This approach is more compact and removes the need for the extra call to `useStylixTheme()`, allowing you to define components using the short arrow function syntax without curly braces.

Theme functions can return array values to use with [media queries](/media-queries), or entire style objects when used with [pseudo-classes and selectors](/selectors):

```tsx-render
import $, { StylixProvider, useStylixTheme } from '@stylix/core';

const ThemeDemo = () => (
  <$.div 
    // theme.fontSize returns a media query array
    font-size={theme => theme.fontSize}
    // The 'span' selector will receive the entire
    // style object defined below
    $css={{
      span: theme => theme.hoverUnderline
    }}
  >
    Responsive font sizes.
    <br />
    <span>Hover me for a background color.</span>
  </$.div>
);

const myTheme = {
  fontSize: [24, 18],
  hoverUnderline: {
    "&:hover": {
      backgroundColor: 'LightCyan',
    }
  }
};

<StylixProvider 
  theme={myTheme} 
  media={['', '(max-width: 1024px)']}
>
  <ThemeDemo /> 
</StylixProvider>
```

## Nesting themes

Theme objects can be specified at any level in your app, not just on the `<StylixProvider>` element. If you want to provide a new theme object, perhaps to override certain values or to provide a theme object specific to a related set of components, you can use a `<StylixTheme>` wrapper element at any location in your app:

```tsx-render
import $, { StylixProvider, StylixTheme } from '@stylix/core';

const innerTheme = {
  textColor: 'DodgerBlue'
};

function NestedTheme() {
  return (
    <$.div
      color={theme => theme.textColor}
    >
      Teal text
      
      <StylixTheme theme={innerTheme}>
        <$.div 
          color={theme => theme.textColor}
          background={theme => theme.background}
        >
          DodgerBlue text, Azure background
        </$.div>
      </StylixTheme>
    </$.div>
  );
}

const outerTheme = {
  textColor: 'Teal',
  background: 'Azure'
};

<StylixProvider theme={outerTheme}>
  <NestedTheme />
</StylixProvider>
```

Notice that the theme object inside the `<StylixTheme>` has access to both the `innerTheme`'s `textColor` and the `outerTheme`'s `background` properties. Stylix merges nested theme objects into the parent theme objects, so you can access properties all the way up the context.

<a href="/custom-props" class="next-link">Custom props</a>
