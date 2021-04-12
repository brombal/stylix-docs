# Global styles

Sometimes it is necessary or desired to add styles to the global scope. The `useGlobalStyles()` hook function allows you to do this:

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

<StylixProvider>
  <GlobalStyles />
</StylixProvider>    
```

The styles will only be present while the component that defines them is mounted.

If you need to "turn off" the styles but don't want to unmount the component, `useGlobalStyles` accepts a second parameter to disable them:
 
```tsx
const disabled = true;
useGlobalStyles({ ... }, disabled);
```
