# Why Stylix?

You might think, "Isn't Stylix going to make my React code really long and bloated?" or "Doesn't this violate the *don't repeat yourself* tenet of programming?"

Before we answer that, imagine creating a button that has a few styles to make it look a little better than the browser default:

```tsx-render
<$.button 
  background="teal" 
  color="white"
  border-radius={4}
  padding="8px 20px"
  font-family="inherit"
  font-size={16}
>
  Button
</$.button>
```

**First**, consider how easy this was. We didn't have to think of a new class name. We didn't have to open another file. We didn't write any *more* code than we would have using CSS; while JSX might require a few extra syntax characters, we easily made up for this by losing the need for a class name, an external file, and the mental overhead of switching languages altogether.

**Second**, while the individual element looks longer with additional props, the idea isn't to just slap on style props to every element and copy/paste them everywhere. Instead, you are encouraged to **follow React best practices** and separate elements into reusable components—which includes considering style props as a part of the component. 

Instead, what you might do is this:

```tsx-render
const Button = ({ color, ...other }) => (
  <$.button 
    background={color} 
    color="white"
    border-radius={4}
    padding="8px 20px"
    font-family="inherit"
    font-size={16}
    {...other} 
  />
);

<Button color="DarkOrchid" font-size={24}>
  Button Component
</Button>
```

Wow! We just created a compact, reusable, easily-understandable styled component. It accepts a prop that lets you specify the background color using a more sensible prop name, and with prop **spreading** and **destructuring**, we could easily override the button's font-size or any other style. All of this was done with nothing but basic ES6 and React techniques—you didn't need to learn any additional languages, syntaxes, or APIs.

### What about "separation of concerns"? Isn't mixing markup and styles A Bad Thing™?

Consider the idea that in React, you no longer write actual HTML anymore. Sure, JSX kind of looks like it, but it adds so much and works so differently that the only things it really shares with HTML are angle brackets. With React, JavaScript and HTML have practically merged into one language—and it used to be considered bad practice to mix HTML markup with JavaScript. Today, with React's component-based architecture, "separation of concerns" refers to separating unrelated functionality—not separating the languages that build that functionality. 

So why should styles be any different? In today's web apps, styles often need to be as dynamic as the page content. When your styles are relegated to separate files that have no access to the app's current state, it becomes a chore to make them dynamic. It also costs you brain power to constantly switch between the syntaxes and strategies of writing JavaScript vs. CSS: organizing files, structuring CSS, and choosing class names are all completely different concepts from writing React. It may be small, but seconds add up to hours lost.

With Stylix, these are no longer concerns. Your styles live within the components that own them; state information is readily available; and all the techniques and practices that make React so successful are now just as relevant to how you add styles to your components.

### How does Stylix compare to other React styling solutions?

Other libraries such as *styled-components* and *Emotion* offer similar solutions to these problems. We think those are great libraries and they heavily inspired Stylix. We just felt that they didn't take things far enough: rather than integrating CSS directly with React, they introduced entirely new ways to write CSS. Template literals (`` styled.div`...` ``), prop functions, and custom Babel configurations are all small but unnecessary learning curves.

Instead, Stylix took the approach of pairing CSS as closely with React as JSX did with HTML and JavaScript. We went a little further than these other libraries, and said "no more quirky syntaxes, APIs, or configurations; let's just use what React already offers." Indeed, React already provides great ways to do everything we need to create clean, reusable, and maintainable styles.

If you're convinced now of how delightful styling your React apps will be with Stylix, continue on to hte **Getting started** guide to begin.

<a href="/getting-started" class="next-link">Getting started</a>
