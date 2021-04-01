# Stylix
Do you hate writing CSS? Maybe you don't realize it, but you probably do.  

React has popularized the ability to write your entire application's front-end in JavaScript (or TypeScript). JavaScript and HTML no longer live in separate files, forced to communicate through clunky imperative DOM function calls. Instead, they now integrate seamlessly through JSX, making it a pleasure to create HTML markup that effortlessly reacts to your data. 

But what about CSS? In the simplest setup, CSS only integrates with React by way of a packager like Webpack, where stylesheets are still relegated to separate files, as if we were still stuck in the 90s. You still have to come up with class names, often using hard--to__follow naming conventions (do your coworkers ever *really* do it right?). Not to mention that the best practices of writing good React code are completely different from what makes good CSS—and mentally switching gears between these two paradigms requires brain power and overhead time that could be better spent elsewhere.

We've already taken the step of merging HTML and JavaScript into a single workflow, so why not add that equally-important third wheel, CSS?

## Comparison with other libraries

There are several other great styling libraries out there, like emotion and styled-components. We found these both to be a step in the right direction—just not a big enough step. Their ability to define styles directly on the components that use them is a great way to combine React and CSS and a solution to the separate-css-file problem. 

But both of them require learning & using different APIs and syntaxes (not quite React, yet not quite CSS) to implement them. Template literals (`` styled.div`...` ``) and prop functions are small but unnecessary learning curves. What if we went one step further than these libraries and said "no more quirky syntaxes or outside-the-box thinking; let's just use what React already offers." Indeed, React already provides great ways to do everything we need for simple, reusable styles:

```
<$.div font-weight="bold">Stylix!</$.div>
```

It really can't be more "React-y" than this. 

## But somebody somewhere once told me...

If at first you cringe at the idea of "polluting" your markup with styles, we'll remind you that you already do this for event handlers (e.g. `onClick`), which for a long time was considered Bad Practice.™ And UI libraries (such as Material UI) often require you to use component props that may not be pure CSS, but have no purpose other than styling (`color="primary"`). 

The concern should not be some universally-accepted textbook definition of what is "good" vs. "bad" programming: the real concern is simply code re-usability. Back in the days of HTML and CSS files, writing your styles directly on an HTML element was terrible because there was no easy way to re-use HTML markup (besides copy & paste 😱). CSS solved this by making it possible for your styles to exist independently, allowing you to repeat the smallest possible amount of HTML markup and re-use your existing styles.

But React already offers, nay, is *based on* this feature:

```tsx
import $ from 'stylix';

const Bold = (props) => (
  <$.div font-weight={500} {...props} />
);

<Bold>Stylix!</Bold>
<Bold>Stylix again!</Bold>
<Bold>More Stylix!</Bold>
```

Wow! You just created a reusable bold text component. And if you know React, you didn't learn anything new. These are just basic React concepts.

If you're an extra-smart cookie, you can see in the above example how easy it would be to add or override styles on your component:

```tsx
import $ from 'stylix';

const Bold = (props) => (
  <$.div font-weight={500} {...props} />
);

<Bold>Stylix!</Bold>
<Bold font-size="22pt">Large Stylix!</Bold>
<Bold font-weight={700}>Really bold Stylix!</Bold>
```

That's right. We didn't even change the `Bold` component from the previous example. The fact that we spread `props` to the `$.div` element (again, nothing new—just a basic JavaScript feature) means that we can add or override styles anywhere. Suddenly all your components are style-able, with zero extra effort.

Congratulations! You didn't even learn anything, and you already know 90% of what Stylix can do. If you're convinced of how delightful styling your React apps will be from now on, let's see what else you can do with Stylix.

[next page]
