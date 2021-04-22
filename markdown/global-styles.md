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

The styles will only be present on the page while the component that defines them is mounted.

If you need to disable the global styles, but don't want to unmount the component, `useGlobalStyles` accepts a second parameter to disable them:
 
```tsx
useGlobalStyles({ ... }, { disabled: true });
```

> This approach is necessary because you [can't call hooks conditionally](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level).

Note that if you just need to create styles to apply to a 3rd party component that needs a class name, it might be more appropriate to use `useStyles()`. This function scopes the given styles to a generated class name and returns it, limiting the possibility to inadvertently affect other elements on the page. See [Styling other components](/other-components) for more information.

<a href="/keyframes" class="next-link">Keyframe animations</a>

