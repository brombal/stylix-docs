# Creating Stylix plugins

You can customize Stylix's behavior in certain ways using **plugins**. There are specific points in Stylix's lifecycle when plugins are given the opportunity to modify its behavior and pre- or post-process style objects before they are output as CSS.

A *plugin* is an object that conforms to the following interface:

```ts
interface StylixPlugin {
  name: string;
  type: 'initialize' | 'preprocessStyles' | 'processStyles';
  plugin(ctx: StylixPluginFunctionContext, styles: any): any;
  before?: StylixPlugin;
  after?: StylixPlugin;
  atIndex?: number;
}
```

- **name**
  
  A user-friendly name for the plugin, used for debugging purposes only.
  
- **type**
  
  Defines the type of the plugin, which specifies the phase at which the plugin function is invoked; one of the following values:
  
  - **`"initialize"`**
    
    Plugins for this phase are invoked when the `<StylixProvider>` element mounts; used to modify Stylix's configuration in some way before applying any styles.

  - **`"preprocessStyles"`**
    
    Plugins for this phase are invoked before a style object is serialized into a generated class name. This phase must be used to replace or remove any values from a style object that cannot be serialized with `JSON.stringify`, such as functions (in fact, Stylix uses this phase to resolve [theme functions](/themes)).
    
    The result of this phase is used to determine whether the element's styles have changed and need to be updated in the document's stylesheet. Because of this, it is invoked on **every component render**, so its performance is important to keep in mind. It is recommended that a plugin should perform its functionality in the **processStyles** phase whenever possible.
    
  - **`"processStyles"`**
  
    Plugins for this phase are invoked when Stylix is ready to output a style object as CSS. The final result of all the `processStyles` plugins will be output as CSS.
    
    Plugin functions will receive 2 parameters: the current Stylix context object, and a freshly-cloned style object. The function must return a style object—either the same object from the second parameter, or a new style object. 
    
    Depending on the **plugin order** (see below), the style object parameter may still contain the user's original values, including nested styles, media query arrays, or theme functions. The plugin function's returned style object can retain these values if subsequent plugins will process them. If your plugin is ordered after the built-in plugins that process these types of complex values, you must not add additional complex values to the style object.
    
- **plugin**

  This is the function that will be invoked at the given phase. Depending on the plugin's **type**, the function's parameters and return values vary: 
  
  - Plugin functions for the **initialize** phase will receive the current [Stylix context object](/api/useStylixContext), which it can modify as necessary, and should not return anything.

  - Plugin functions for the **preprocessStyles** and **processStyles** will receive 2 parameters: the current Stylix context object, and a freshly-cloned style object. The function must return a style object—either the same object as the second parameter, or a new style object. 


- **before**, **after**, **atIndex**

  These properties specify another plugin object that this plugin should be inserted **before** or **after**, or the array index at which the plugin should be inserted. If none is specified, the default behavior **appends the plugin to the current list of plugins** for the given phase type. See **Plugin ordering** below for more details.
  
## Plugin ordering

Stylix plugin functions are always executed in a specific order. The order that the user provides plugins to the StylixProvider `plugins` array is generally not important—what matters is how the plugin defines its own order using the `before`, `after`, or `atIndex` properties. Stylix maintains separate orderings for each plugin type (`"initialize"`, `"preprocessStyles"`, and `"processStyles"`).

Much of Stylix's functionality is provided by built-in plugins, giving you the opportunity to create plugins that modify style objects *before* or *after* Stylix's own plugins alter them. To take advantage of this, you need to know what order Stylix's built-in plugins execute, and what each of them does:

- (There are no built-in **initialize** phase plugins)

- **preprocessStyles** phase:

  | Order | Name | Description |
  |-------|------|-------------|
  | 0     | `defaultPlugins.themeFunctions` | Resolves theme functions to serializable values. |


- **processStyles** phase:

  | Order | Name | Description |
  |-------|------|-------------|
  | 0     | `defaultPlugins.merge$css` | Merges `$css` properties in the parent object. |
  | 1     | `defaultPlugins.mediaArrays` | Resolves media array values to their corresponding media queries. |
  | 2     | `defaultPlugins.propCasing` | Normalizes prop casing and hyphenation to proper CSS property names. |
  | 3     | `defaultPlugins.flattenNestedStyles` | Flattens nested styles by concatenating selectors and handling `&` substitution. |
  | 4     | `defaultPlugins.replace$$class` | Replaces the `"$$class"` magic keyword in all properties and values with the current class name (this is used internally by `useKeyframes()`; until it is determined that it is a more widely-useful feature, it is currently an undocumented internal implementation detail 🤫). |
  | 5     | `defaultPlugins.defaultPixelUnits` | Adds a "px" suffix to numeric values for appropriate CSS properties |
  | 6     | `defaultPlugins.cleanStyles` | Removes null, undefined, empty strings, and empty object values from styles. |
  
With the above information, you can create a plugin that performs its functionality at any specific step in the list of built-in plugins. 

For example, to create a plugin that operates after the `propCasing` plugin (so you know all CSS property names will have been normalized), you would use the `before` plugin property to specify the `propCasing` plugin:

```tsx
import { defaultPlugins } from '@stylix/core';

const myPlugin = {
  type: 'processStyles',
  after: defaultPlugins.propCasing,
  plugin(ctx, styles) {
    // modify styles ...
    return styles;
  }
}
```

To place your plugin at the beginning of the list, use `atIndex: 0`. By default, Stylix will add the plugin to the end of the list. 

**Be aware** that the user may have multiple plugins enabled that "compete" for the same location. Because of this, the exact position of your plugin will be unknown. However, using `before`, `after`, or `atIndex`, you can be sure that a certain amount of processing will (or will not) have been completed (so you don't need to account for nested styles, media arrays, etc).

> Stylix developers will consider changing the order of built-in plugins to be a **breaking change**, so your plugins can specify `@stylix/core` as a peerDependency at a specific major version.

## Example plugin

The following is a full example of a simple plugin that adds a small set of additional color names that could be passed to any CSS property that accepts colors:

```tsx-render
import $, { 
  StylixProvider,
  mapObjectRecursive
} from '@stylix/core';

const colorMap = {
  amaranth: '#EC295B',
  gamboge: '#E49B0F',
  celadon: '#ABE0AE',
  skobeloff: '#007474',
};

const newColors: StylixPlugin = {
  name: 'newColors',
  type: 'processStyles',
  plugin(ctx, styles) {
    return mapObjectRecursive(styles, (key, value) => {
      if (typeof value === 'string') {
        value = Object.entries(colorMap)
          .reduce((memo, [colorName, colorHex]) => {
            return memo.replace(
              new RegExp(`\\b${colorName}\\b`, 'g'), 
              colorHex
            );
          }, value);
        return { [key]: value };
      }
    });
  },
};

export newColors;

// import { newColors } from 'my-plugins';

<StylixProvider plugins={[newColors]}>
  <$.div
    color="amaranth"
    background="celadon"
    box-shadow="0 5px 10px gamboge"
    border="2px solid skobeloff"
    padding={10}
  >
    Ugly but colorful
  </$.div>
</StylixProvider>
```
