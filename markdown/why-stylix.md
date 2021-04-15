
## Why Stylix?

You might think, "Isn't Stylix going to make my React code really long and bloated?" or "Doesn't this violate the *don't repeat yourself* tenet of programming?"

Yes, your individual elements are going to look longer with additional props. But the idea isn't to just slap on style props to every element and copy/paste them everywhere. Instead, you are encouraged to follow React best practices and separate elements into reusable components—which includes considering style props as a part of the component. Consider this example from a popular UI framework, Material UI:

```tsx
import { Button } from '@material-ui/core';

<Button variant="outlined" color="primary">
  I'm a Material UI Button!
</Button>
```

This component may not have pure CSS in its props, but those `variant` and `color` props are nothing but style information—they are not structural or functional in any way. You could write something comparable to this with Stylix:

```tsx
<$.button color="blue" border="1px solid blue">
  I'm a Stylix button!
</Button>
```

That essentially conveys the same idea (although, admittedly, Material UI's Button will look a lot nicer).

In reality, you would have to add quite a few styles to make a decent-looking button yourself. Instead, what you might do is this:

```tsx-render
const Button = ({ color, ...styles }) => (
  <$.button 
    color={color} 
    border={`1px solid ${color}`}
    padding="8px 20px" 
    {...styles} 
  />
);

<>
  <Button color="SkyBlue">
    Stylix button
  </Button>
  <Button color="DarkOrchid" font-size="18pt">
    Large Stylix button
  </Button>
</>
```

Wow! We just created a reusable styled component. It accepts a prop that lets you specify the border and text colors together, and with prop spreading and destructuring, we easily added a "font-size" style. All of this was done with nothing but basic JavaScript and React techniques—you didn't need to learn any additional languages, syntax, APIs, or work with any external files.

## What about "separation of concerns"? Isn't mixing markup and styles A Bad Thing™?

Consider the idea that in React, you no longer write actual HTML anymore. Sure, JSX kind of looks like it, but it adds so much and works so differently that the only things it really shares with HTML are angle brackets. With React, JavaScript and HTML have practically merged into one language.

So why should styles be any different? In today's web apps, styles often need to be as dynamic as the page content. When your styles are relegated to separate files that have no access to the app's current state, it becomes a chore to make them dynamic. It also costs you brain power to constantly switch between the syntaxes and strategies of writing JavaScript vs. CSS—organizing files, structuring CSS, and choosing class names—all of which are completely different between the two languages. It may be small, but seconds add up to hours lost.

With Stylix, none of this is a concern anymore. Your styles live within the components that own them; state information is readily available; and all the techniques and practices that make React so successful are now just as relevant to how you add styles to your components.

## How does Stylix compare to other React styling solutions?

Other libraries such as *styled-components* and *Emotion* offer similar solutions to these problems. We think those are great libraries and they heavily inspired Stylix. We just felt that they didn't take things far enough: rather than integrating CSS directly with React, they introduced entirely new ways to write CSS. Template literals (`` styled.div`...` ``), prop functions, and custom Babel configurations are small but unnecessary learning curves.

Instead, Stylix took the approach of pairing CSS as closely with React as JSX did with HTML and JavaScript. We went a little further than these other libraries, and said "no more quirky syntaxes, APIs, or configurations; let's just use what React already offers." Indeed, React already provides great ways to do everything we need for styles that are clean, reusable, and maintainable.

If you're convinced now of how delightful styling your React apps will be with Stylix, let's see what else it can do for you.

<a href="/basics" class="next-link">Stylix basics</a>
