Stylix is a library for styling React apps in the most React-like way possible.

```tsx-render
<$.div
  color="#00BCD4"
  font-size={40}
  font-weight="bold"
  text-align="center"
>
  Welcome to Stylix!
</$.div>
```

Stylix uses props to create styles. There are no quirky syntaxes, template literals, additional APIs, or bundler configurations. Just css props on the built-in HTML components (`$.div`, `$.span`, `$.a`, etc) or on any component that accepts a `className` prop.

## Installation

```
npm install --save stylix
```

Add a `<StylixProvider>` wrapper at the root of your project:

```tsx
import { StylixProvider } from 'stylix';

function App() {
  return (
    <StylixProvider>
      ...
    </StylixProvider>
  );
}
```

You can use this component to provide themes or media queries, or provide additional configuration for certain less-common situations.

## Example

Here's a complete example demonstrating the most useful features of Stylix: theming, media queries, style overriding, and more.

```tsx-app-column
import $, { StylixProvider, useStylixTheme } from 'stylix';

/* Themes are just arbirary objects -
   you can use whatever you like */
const themes = {
  light: {
    name: "Light",
    textColor: '#333',
    background: 'white'
  },
  dark: {
    name: "Dark",
    textColor: 'white',
    background: '#333'
  }
};

function App() {
  const [theme, setTheme] = React.useState('light');
  
  return (
    <StylixProvider
      theme={themes[theme]}
      /* Media array entries correspond to
         array values in style props
         (see `width` property on ThemeSelect
         component below) */
      media={[
        "(max-width: 1200px)",
        "(min-width: 1201px)"
      ]}
    >
      <ThemeSelect 
        onThemeChange={setTheme} 
        margin-bottom={20} 
      />
      <StylixExample />
    </StylixProvider>
  );
}

function ThemeSelect(props) {
  const {
    onThemeChange,
    ...other
  } = props;
  
  return (
    <$.select 
      /* Array values will correspond to 
         media queries:
         < 1200px = 100%
         > 1201px = 200px */
      width={['100%', 200]}
      font="inherit"
      border="1px solid #CCC"
      padding={4}
      onChange={(e) => {
        onThemeChange(e.target.value);
      }}
      /* Spread other props to allow parent
         to add/override styles */
      {...other}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </$.select>
  );
}

function StylixExample(props) {
  /* useStylixTheme hook gets current theme 
     object */
  const stylixTheme = useStylixTheme();
  
  return (
    <$.div 
      /* Use function values to get 
         the current theme object */
      background={theme => theme.background} 
      color={theme => theme.textColor}
      padding={10}
    >
      <$.div>
        Stylix example 
        {/* `stylixTheme` contains current 
            `theme` and `media` objects */}
        ({stylixTheme.theme.name} theme)
      </$.div>
    </$.div>
  );
}
```
