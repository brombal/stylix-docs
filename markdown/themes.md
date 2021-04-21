# Theming your app with Stylix

Stylix is completely unopinionated about theming your app's styles. Because Stylix doesn't ship with any predefined styles, there is nothing out of the box that requires theming. However, Stylix does come with some features that make it simple to share common styles or other information throughout your app.

### Don't complicate things

Because Stylix is all JavaScript, theming your app might be as simple as defining some theme-specific values in a plain object, and using those values throughout your app:

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

### Provide a **theme** object and use **functional prop values** to access it

If you need something a bit more dynamic than a simple shared object (for example, to allow light/dark theme options), you can provide a **theme object** to your `<StylixProvider>` element's `theme` props. This object can have **any structure at all**—Stylix has no opinion on how you define your theme. 

Then, in place of primitive style values like numbers and strings, style props can also accept functions that return a style value. These **theme functions** will receive the current theme object as the first parameter, and the [entire Stylix context](/api/useStylixContext) as the second parameter.

For example:

```tsx-render-app
import $, { StylixProvider } from '@stylix/core';

const ThemeDemo = () => (
  <$.div 
    color={(theme) => theme.textColor}
    background={(theme) => theme.background}
  >
    Pale turquoise on navy!
  </$.div>
);

function App() {
  const [theme, setTheme] = useState({
    textColor: 'PaleTurquoise',
    background: 'Navy',
  });

  return (
    <StylixProvider theme={myTheme}>
      <ThemeDemo /> 
    </StylixProvider>
  );
}
```

Theme functions are accepted on **any style prop**, as well as anywhere that you can pass a [style object](/api/style-objects), including the [$css prop](/selectors) and the [useStyles](/api/useStyles), [useGlobalStyles](/api/useGlobalStyles), [useKeyframes](/api/useKeyframes) hooks. And any value, at any nested depth of a style object can be a theme function.

Theme functions can return any value that a style prop accepts, including array values to use with [media queries](/media-queries), or entire style objects when used with style hooks or the $css prop.

### Change the current theme with `setTheme`

Of course, the above example is just as static as the previous one—we didn't make any use of the `setTheme` state setter function that we created.

The `<StylixProvider>` element's `setTheme` prop lets you provide any function that changes or replaces the theme object. It could be a React state setter function, or a function you define. Whatever you provide, it can be accessed by descendant components using the `useStylixTheme` hook function.

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
  const [theme, setTheme] = useStylixTheme();

  return (
    <$.div>
      <$.select 
        onChange={e => setTheme(e.target.value)}
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

  return (
    <StylixProvider 
      theme={themes[themeName]} 
      setTheme={setThemeName}
    >
      <ThemeDemo />
    </StylixProvider>
  );
}
```

In this example, the `App` component stores the current theme's "name" in a state variable, and it passes the theme object with the corresponding name to the StylixProvider's `theme` prop. Notice that we used string keys (`'light'` and `'dark'`) to restrict what values descendant components can pass to `setTheme`. This prevents components from setting the entire theme object to some arbitrary value.

### Prevent unnecessary renders—and trigger necessary ones

Like most components, the `<StylixProvider>` will rerender when its prop values change. It's up to you to make sure that the `theme` and `setTheme` prop values are not "new" every time the StylixProvider renders, or this might trigger unwanted renders of all its descendant elements. Objects and functions are a common cause of this, as object literals and locally-defined functions are never the same instance as the previous render. To prevent this, you may need to use React's `useMemo` or `useCallback` hooks to ensure that the same instances are persistant across multiple rerenders.

Conversely, the function you provide to the StylixProvider's `setTheme` prop must update the theme in a way that triggers a render. If your `setTheme` function only mutates an existing object but doesn't trigger a render of the parent component, the StylixProvider will not recognize the change or update all the descendant elements that use it.

### Access the theme with the `useStylixTheme()` hook

If you need to access the theme object outside of a style prop's theme function, you can use the `useStylixTheme()` hook function. As we saw in the previous example, it is also used to access the theme updater function. It works very similarly to React's `useState` hook:

```tsx-render
import $, { StylixProvider, useStylixTheme } from '@stylix/core';

const myTheme = {
  textColor: 'PaleTurquoise',
  background: 'Navy',
};

const ThemeDemo = () => {
  const [theme, setTheme] = useStylixTheme();
  return (
    <$.div 
      color={(theme) => theme.textColor}
      background={(theme) => theme.background}
    >
      {theme.textColor} on {theme.background}
    </$.div>
  );
}

<StylixProvider theme={myTheme}>
  <ThemeDemo /> 
</StylixProvider>
```

## Nesting themes

Theme objects can be specified at any level in your app, not just on the top-level `<StylixProvider>` element. If you want to provide a new theme object, perhaps to override certain values or to provide a theme object specific to a related set of components, you can use a `<StylixTheme>` wrapper element at any location in your app:

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
