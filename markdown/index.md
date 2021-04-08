Stylix is a new library and methodology for styling your React apps.

```tsx-render
import $ from 'stylix';

<$.div
  color="#00BCD4"
  font-size={40}
  font-weight="bold"
  text-align="center"
>
  Welcome to Stylix!
</$.div>
```

With Stylix, you apply styles to your components the same way you add any other information: with props. No separate CSS files, languages, or syntaxes for styling—everything is in React, minimizing the learning curve and allowing you to utilize the same patterns and organizational techniques that make React so great.


## Installation

```
npm install --save stylix
```

Add a `<StylixProvider>` wrapper at the root of your project:

```tsx
import $, { StylixProvider } from 'stylix';

function App() {
  return (
    <StylixProvider>
      <$.div font-weight="bold">
        Hello, Stylix!
      </$.div>
    </StylixProvider>
  );
}
```

The `StylixProvider` component can provide themes and media queries, or additional configuration for certain less-common situations.

Stylix provides all the standard HTML elements as properties of the `$` object (e.g. `<$.div>`, `<$.h1>`, `<$.p>`, etc.). They all accept props for any standard CSS property. It is also possible (and easy) to style any other component that accepts a `className` prop.

You aren't just limited to standard CSS properties, either. Stylix lets you use complex selectors, pseudo-classes, nested CSS, media queries, themes, keyframe animations, and more.

## Why Stylix?

You might think, "Isn't this going to make my React code really long and bloated?" or "Doesn't this violate the 'don't repeat yourself' or 'separation of concerns' tenets of programming?"

Yes, your individual elements are going to look longer with additional props. But the idea isn't to just slap on style props to every element and copy-paste them everywhere. Instead, you are encouraged to follow good React principles and separate elements into reusable components - which includes considering style props as a part of the components. Consider this example from a popular UI framework, Material UI:

```tsx
/* Material UI Button component */
<Button variant="outlined" color="primary">Click me!</Button>
```

This component may not have pure CSS in its props, but those `variant` and `color` props are nothing but style information—they serve no functional purpose. You could write something comparable to this with Stylix:

```tsx
<$.button color="blue" border="1px solid blue">Click me!</Button>
```

That essentially conveys the same idea (although Material UI's Button looks a lot nicer).

In reality, what you might do is this:

```tsx
const Button = ({ color, ...styles }) => (
  <$.button color={color} border={`1px solid ${color}`} {...styles} />
);

<Button color="blue" font-size="14pt">Click me!</Button>
```

Wow! We just created a styled component. It accepts a prop that lets you specify both the border and text colors, and we even passed an additional "font-size" style. All of this was done with nothing but basic JavaScript and React features (like spreading props). You didn't need to learn any additional languages, syntax, APIs, or import any external CSS files.

Regarding "separation of concerns" — think about the fact that in React, you no longer write actual HTML anymore. Sure, JSX kind of looks like it, but it adds so much and works so differently that the only things it really shares with HTML are angle brackets. In React, JavaScript and HTML have practically merged into one language.

So why should styles be any different? In today's web apps, styles often need to be as dynamic as the page content. When your styles are relegated to separate files that have no access to the app's current state, it becomes a chore to make them dynamic. It also costs you mental stamina points to constantly switch between the syntaxes and strategies of writing JavaScript vs. CSS—organizing files, structuring CSS, and choosing class names—all of which are completely different between the two languages. It may be small, but seconds add up to hours lost.

With Stylix, none of this is a concern: your styles live within the components that own them; state information is readily available; and all the techniques and practices that make React so successful are now just as relevant to how you add styles to your components.

In fact, other libraries such as styled-components and Emotion offer similar solutions to the these problems. We think those are great utilities and they heavily inspired Stylix. We just felt that they didn't take things far enough: rather than integrating CSS directly with React, they introduced entirely new ways to write CSS (such as template literals or additional transpiler requirements). Stylix took the approach of making CSS as closely paired with React as JSX did to bring HTML and JavaScript together.
