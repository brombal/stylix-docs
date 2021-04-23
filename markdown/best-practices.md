# Stylix best practices

Stylix encourages the use of React best practices to make your code clean, concise, and maintanable. Because Stylix is *built with* React, the same principles that you use to organize your React components are now just as effective to keep your app's styles organized. You don't need to manage separate CSS files or use alternative JavaScript syntax features to define styles—everything is with props, just like React.

In fact, most of the features described on this page are not really *features* of Stylix, but just suggestions for how to utilize React and ES6 features to organize and simplify your styled components.

### Create reusable styled components just like regular components

Although your app's JSX markup will be longer and seem more verbose with these additional style props, the same features you use to extract reusable React components also apply to your styles.

```tsx-render
const StylixHeader = (props) => (
  <$.div 
    color="SteelBlue"
    font-size={24}
    font-weight="bold" 
  >
    {props.children}
  </$.div>
);

<StylixHeader>
  Stylix!
</StylixHeader>
```

`<StylixHeader>` is now a styled component that you might use throughout your app. As a React component, it naturally has all the features that React offers, such as props, state, context, and other hooks. 

### Allow style overrides with prop spreading

By using prop **spreading**, you can create reusable, styled components that allow you to override styles easily. 

```tsx-render
const StylixHeader = (props) => (
  <$.div 
    color="SteelBlue"
    font-size={24}
    font-weight="bold" 
    {...props}
  />
);

<StylixHeader font-weight="normal">
  Stylix!
</StylixHeader>
```

Notice how we spread `...props` onto the `$.div` element, allowing the `StylixHeader` component to receive all the style props and children passed from the component that rendered it. With even fewer lines of code than we wrote in the previous example, we can now override any style of this component.

With prop spreading, you have full control over how props are passed to the underlying element. For example, If you don't want to allow overriding particular styles, just place them *after* the prop spread:

```tsx-render
const StylixHeader = (props) => (
  <$.div 
    color="SteelBlue"
    font-size={24}
    {...props}
    font-weight="bold"
  />
);

<StylixHeader color="SeaGreen" font-weight="normal">
  Stylix!
</StylixHeader>
```

In this example, the `font-weight` property can't be overridden, but other style props are passed normally—the text will *always* be bold, but we were able to make it green instead of blue.

### Pass non-style props with **destructuring**

If a component accepts other props that should not be passed on as CSS properties, you can use destructuring to separate them from style props:

```tsx-render
function DisplayName(props) {
  const { firstName, lastName, ...styles } = props;
  return (
    <$.div {...styles}>
      {lastName}, {firstName}
    </$.div>
  );
}

<DisplayName 
  firstName="Kermit"
  lastName="The Frog"
  color="YellowGreen"
  font-weight="bold"
/>
```


## Styles are naturally dynamic

Of course, styles don't need to be fixed, constant values. Just like any other props, the values can come from a component's state, props, or any other variable. In the following example, a dropdown value is stored in a state variable, which is used to set the color of the text below it:

```tsx-render-app
function App() {
  const [color, setColor] = React.useState('tomato');

  return (
    <div>
      <select 
        onChange={e => setColor(e.target.value)}
      >
        <option>Tomato</option>
        <option>DodgerBlue</option>
        <option>SeaGreen</option>
      </select>
      <$.div color={color} font-weight="bold">
        You picked {color}! 
      </$.div>
    </div>
  );
}
```

Because styles are created with props, they become "first-class citizens" of your React app, and you can treat them as dynamically as you would any other prop values. Stylix is very efficient in how it generates CSS and can process thousands of updates per second, and it cleans up after itself when styles are no longer in use.

<a href="/selectors" class="next-link">Pseudo-classes and selectors</a>
