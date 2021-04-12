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

`useGlobalStyles` accepts a second parameter that disables the styles (useful because you cannot call React hook functions conditionally):
 
```tsx
const disabled = true;
useGlobalStyles({ ... }, disabled);
```
