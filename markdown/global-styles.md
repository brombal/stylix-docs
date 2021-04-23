# Global styles

Stylix generally works by scoping the styles you create within a unique, generated class name.

However, sometimes it is necessary to add styles to the global scope. The `useGlobalStyles()` hook function allows you to do this:

```tsx
import $, { useGlobalStyles } from '@stylix/core';

function GlobalStyles() {
  useGlobalStyles({
    "body": {
      fontSize: 16,
    },
    "a": {
      textDecoration: 'none',
    },
    ".myCustomClass": {
      fontSize: 24
    }
  });
  
  return (
    <div className="myCustomClass">
      ...
    </div>
  );
}
```

The styles given will only be present in the page's stylesheet **while the element is mounted.** 

If you want to disable the styles while the component is mounted, pass `{ disabled: true }` as the second parameter of `useGlobalStyles`. Remember, because of the **[rules of hooks](https://reactjs.org/docs/hooks-rules.html)**, you can't call this hook conditionally. 
 
```tsx
useGlobalStyles({ ... }, { disabled: true });
```

Note that if you just need to create styles to apply to a 3rd party component that needs a class name, it might be more appropriate to use `useStyles()`, which scopes the given styles to a generated class name, limiting the possibility to inadvertently affect other elements on the page. See [Styling other components](/other-components) for more information.

<a href="/keyframes" class="next-link">Keyframe animations</a>

