# Stylix

Do you hate writing CSS? Maybe you don't realize it, but you probably do.  

In the simplest setup, CSS can only integrate with React by way of a packager like Webpack. Stylesheets must live in separate files, away from the components they style. And you are faced with a completely different set of challenges: the best practices of writing good React code are completely separate from those of writing CSS. Mentally switching gears between these two paradigms requires brain power and overhead time that could be better spent elsewhere.

React has popularized the ability to write your entire application's front-end in JavaScript (or TypeScript). JavaScript and HTML no longer live in separate files, communicating only through clunky imperative DOM function calls. Instead, they now integrate seamlessly through JSX, making it a pleasure to write HTML markup that effortlessly reacts to your data. We've already taken the step of merging HTML and JavaScript into a single workflow, so why not include CSS?

This is not a new idea. There are several other great styling libraries out there, like Emotion and styled-components, that allow you to define styles directly on the components that use them. But both of them require learning and using different APIs and syntaxes (not quite React, but not quite CSS) to implement them. Template literals (`` styled.div`...` ``), prop functions, and custom Babel configurations are small but unnecessary learning curves. They are a step in the right direction—just not a big enough step.

What if we went a little further than these libraries and said "no more quirky syntaxes, APIs, or configurations; let's just use what React already offers." Indeed, React already provides great ways to do everything we need for simple, reusable styles:

```tsx
import $ from 'stylix';

const Emphasize = (props) => (
  <$.div font-weight="bold" font-style="italic" {...props} />
);

<Emphasize>Stylix!</Emphasize>
```

Wow! We just created a reusable bold-italic text component. And if you know React, you didn't see anything new here—these are just basic React concepts.

If you're especially astute, you can see in the above example how easy it would be to add or override styles on your component:

```tsx
import $ from 'stylix';

const Emphasize = (props) => (
  <$.div font-weight={500} font-style="italic" {...props} />
);

<Bold>Stylix!</Bold>
<Bold font-size="22pt">Large Stylix!</Bold>
<Bold font-weight={700}>Italic Stylix!</Bold>
```

We didn't even change the `Emphasize` component from the previous example. Spreading `...props` to the `$.div` element (again, nothing new—just a basic JavaScript feature) means that we can add or override styles anywhere—all your components are style-able, with zero extra effort.

## But somebody somewhere once told me...

If at first you cringe at the idea of "polluting" your markup with styles, I'll remind you that you already do this for event handlers (e.g. `onClick`), which for a long time was considered bad practice. And many popular UI libraries (such as Material UI) often require you to use component props that may not be pure CSS, but have no purpose other than styling (`color="primary"`). 

The concern should not be some blindly-followed textbook definition of what is "good" vs. "bad" programming. The underlying concern here is simply code re-usability. Back in the days of HTML and CSS files, writing your styles directly on an HTML element was terrible because there was no easy way to re-use HTML markup. CSS files solved this by making it possible for your styles to exist independently, allowing you to repeat the smallest possible amount of HTML markup and re-use existing styles.

But React is based on the idea of reusability. Its component-based architecture has changed the laws of "separation of concerns" regarding JavaScript and HTML, and it can be the same for CSS.

If you're convinced of how delightful styling your React apps will be now, let's see what else you can do with Stylix.

[next page]
