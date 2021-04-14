
## Why Stylix?

You might think, "Isn't Stylix going to make my React code really long and bloated?" or "Doesn't this violate the 'don't repeat yourself' tenet of programming?"

Yes, your individual elements are going to look longer with additional props. But the idea isn't to just slap on style props to every element and copy-paste them everywhere. Instead, you are encouraged to follow good React principles and separate elements into reusable components—which includes considering style props as a part of the components. Consider this example from a popular UI framework, Material UI:

```tsx
/* Material UI Button component */
<Button variant="outlined" color="primary">Click me!</Button>
```

This component may not have pure CSS in its props, but those `variant` and `color` props are nothing but style information—they are not structural or functional in any way. You could write something comparable to this with Stylix:

```tsx
<$.button color="blue" border="1px solid blue">Click me!</Button>
```

That essentially conveys the same idea (although, admittedly, Material UI's Button looks a lot nicer).

In reality, what you might do is this:

```tsx
const Button = ({ color, ...styles }) => (
  <$.button color={color} border={`1px solid ${color}`} {...styles} />
);

<Button color="blue" font-size="14pt">Click me!</Button>
```

Wow! We just created a reusable styled component. It accepts a prop that lets you specify the border and text colors together, and with prop spreading and destructuring, we easily added a "font-size" style. All of this was done with nothing but basic JavaScript and React techniques—you didn't need to learn any additional languages, syntax, APIs, or work with any external files.

## What about "separation of concerns"? Isn't mixing markup and styles A Bad Thing™?

Consider the fact that in React, you no longer write actual HTML anymore. Sure, JSX kind of looks like it, but it adds so much and works so differently that the only things it really shares with HTML are angle brackets. In React, JavaScript and HTML have practically merged into one language.

So why should styles be any different? In today's web apps, styles often need to be as dynamic as the page content. When your styles are relegated to separate files that have no access to the app's current state, it becomes a chore to make them dynamic. It also costs you mental stamina points to constantly switch between the syntaxes and strategies of writing JavaScript vs. CSS—organizing files, structuring CSS, and choosing class names—all of which are completely different between the two languages. It may be small, but seconds add up to hours lost.

With Stylix, none of this is a concern: your styles live within the components that own them; state information is readily available; and all the techniques and practices that make React so successful are now just as relevant to how you add styles to your components.

In fact, other libraries such as styled-components and Emotion offer similar solutions to the these problems. We think those are great libraries and they heavily inspired Stylix. We just felt that they didn't take things far enough: rather than integrating CSS directly with React, they introduced entirely new ways to write CSS. Template literals (`` styled.div`...` ``), prop functions, and custom Babel configurations are small but unnecessary learning curves.

Stylix took the approach of making CSS as closely paired with React as JSX did to bring HTML and JavaScript together. We just went a little further than these other libraries and said "no more quirky syntaxes, APIs, or configurations; let's just use what React already offers." Indeed, React already provides great ways to do everything we need for simple, reusable styles.

If you're convinced of how delightful styling your React apps will be with Stylix, let's see what else you can do.

