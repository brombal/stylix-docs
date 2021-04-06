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

```tsx-app
import $, { StylixProvider } from 'stylix';

const themes = {
  light: {
    textColor: '#333',
    background: 'white'
  },
  dark: {
    textColor: 'white',
    background: '#333'
  }
};

function App() {
  const [theme, setTheme] = useState(themes.light);
  
  return (
    <StylixProvider
      theme={theme}
      media={["(min-width: 1201px)", "(max-width: 1200px)"]}
    >
      <StylixExample onThemeChange={setTheme} />
    </StylixProvider>
  );
}

function StylixExample(props) {
  return (
    <$.div background={theme => theme.background} color={theme => theme.color}>
      <select onChange={() => props.onThemeChange(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <$.div>
        Stylix example
      <$.div>
    </$.div>
  );
}
```
