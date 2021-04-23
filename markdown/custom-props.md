# Custom style props

With Stylix, you can create custom style props that allow you to apply style "mixins" to any element.

The `customProps` function accepts an object containing new prop names as keys, and their associated style values. The resulting value is a **[plugin](/plugin)** you can add to your `<StylixProvider>` element's `plugins` array.

For example:

```tsx-render
import $, { customProps, StylixProvider } from '@stylix/core';

const myCustomProps = customProps({
  blueHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'RoyalBlue',
    textAlign: 'center'
  }
});

<StylixProvider plugins={[myCustomProps]}>
  <$.div blueHeader>
    Custom Stylix props!
  </$.div>
</StylixProvider>
```

The type of value you use affects the behavior of the custom prop:

- A **string value** will simply add an alias to the given property:

  ```tsx
  const myCustomProps = customProps({
    lst: 'list-style-type'
  });
  
  // ...
  
  <$.li lst="circle">...</$.li>
  ```

  In fact, Stylix provides a set of common prop shortcuts with the [tinyprops](/tinyprops) plugin.

- An **object value** will create a "mixin" of additional styles:

  ```tsx-render
  import $, { customProps, StylixProvider } from '@stylix/core';

  const dodgerBlueShortcut = customProps({
    dodgerBlue: {
      color: 'DodgerBlue',
    }
  });

  <StylixProvider plugins={[dodgerBlueShortcut]}>
    <$.div dodgerBlue>
      Dodger blue text.
    </$.div>
  </StylixProvider>
  ```
  
  The value is a [style object](/api/style-objects) and can be as complex as you want. They accept everything style objects allow, including nested selectors, media query arrays, and theme functions.

  The props created in this way will be boolean props, and the styles will be disabled if you pass a falsy value (e.g. `dodgerBlue={false}`).

- **Function values** are just like object values, with the added benefit that they accept a user-defined value as input. The function will be passed the **given prop value** as its only argument, and should return the **styles to apply**.

  For example, you could use this feature to define custom text color names:

  ```tsx-render
  import $, { customProps, StylixProvider } from '@stylix/core';

  const myColors = customProps({
    color: (value: string) => {
      const myColors = {
        cerulean: '#007BA7',
        emerald: '#50C878',
        scarlet: '#FF2400'
      };
      return { color: myColors[value] || value };
    }
  });

  <StylixProvider plugins={[myColors]}>
    <$.div color="cerulean">Cerulean</$.div>
    <$.div color="emerald">Emerald</$.div>
    <$.div color="scarlet">Scarlet</$.div>
  </StylixProvider>
  ```

While this feature has many valid uses, a more flexible and practical approach is to create custom components:

```tsx-render
const DodgerBlue = (props) => (
  <$.div color="DodgerBlue" {...props} />
);

<DodgerBlue>
  Dodger blue text (but with a custom component).
</DodgerBlue>
```


<a href="/typescript" class="next-link">TypeScript support</a>
