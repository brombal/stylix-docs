# Global styles

Stylix generally works by scoping the styles you create within a unique, generated class name.

However, sometimes it is necessary to add styles to the global scope. The `useGlobalStyles()` hook function allows you to do this:

```tsx
import $, { useGlobalStyles } from '@stylix/core';

function GlobalStyles() {
  useGlobalStyles({
    ".myCustomClass": {
      fontSize: 24
    }
  });
  
  return (
    <div className="myCustomClass">Global styles</div>
  );
}

<GlobalStyles />
```

The styles will only be present on the page while the component that defines them is mounted.

If you need to "turn off" the styles but don't want to unmount the component, `useGlobalStyles` accepts a second parameter to disable them:
 
```tsx
const disabled = true;
useGlobalStyles({ ... }, disabled);
```

> This approach is necessary because you [can't call hooks conditionally](https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level).
