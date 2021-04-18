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

## The Stylix context

If you need something a bit more dynamic than a plain, shared object (for example, to allow light/dark theme options), Stylix offers a way to provide a theme object to your components that allows them to react to changes.

The StylixProvider's `theme` prop allows you to specify an object to make available to any descendant elements. This object can have any structure at all—Stylix has no opinion on how you define your theme. In descendant elements, you can get the current theme object using the `useStylixTheme()` hook function.

For example:

```tsx-render
import $, { StylixProvider, useStylixTheme } from '@stylix/core';

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

Of course, this example is just as static as the previous one. Stylix doesn't provide any built-in functionality to replace or modify the theme object, but instead leaves it up to you to manage this value the same way you might handle any other React state or context value.

A simple way to do this might be to keep your theme object in a state variable, and provide descendant elements with a function to modify it via the theme object itself:

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
  const [themeName, setThemeName] = useState('light');

  const theme = useMemo(() => ({
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

In this example, the `App` component stores the current theme name in a state variable, and provides a theme object that includes the setter function using the `theme` prop of the `StylixProvider`. Using `getStylixTheme()`, we can access the `setThemeName` function in any descendent component. 

Notice that the `theme` object is memoized with `useMemo` in order to prevent unnecessary component rerenders.

## Theme functions

The above examples require using `useStylixTheme()` to access the current theme. While this is already a simple and concise way to access the theme, it gets even simpler than this with **theme functions**. In place of primitive style values like numbers and strings, style props can also accept functions that return a style value. This function will receive the current theme object as its first parameter, and the entire Stylix context as the second parameter.

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

This approach is more compact approach and removes the need for the extra call to `useStylixTheme()`, allowing you to define components using the short arrow function syntax without curly braces.

Theme functions can return array values to use with [media queries](/media-queries), or entire style objects when used with [pseudo-classes and selectors](/selectors):

```tsx-render
import $, { StylixProvider, useStylixTheme } from '@stylix/core';

const ThemeDemo = () => (
  <$.div 
    font-size={theme => theme.fontSize}
    background={theme => .backgroundColor}
    $css={{
      span: theme => theme.hoverUnderline
    }}
  >
    Responsive font sizes.
    <span>Hover me for a background color.</span>
  </$.div>
);

const myThene = {
  fontSize: [24, 18],
  hoverUnderline: {
    "&:hover": {
      backgroundColor: 'LightCyan',
    }
  }
};

<StylixProvider theme={myTheme} media={['', '(max-width: 1024)']}>
  <ThemeDemo /> 
</StylixProvider>
```

<a href="/custom-props" class="next-link">Custom props</a>
