# Getting started with Stylix

## Installation

Stylix can be installed with **npm** or **yarn**:

```sh
$ npm install --save @stylix/core
# or
$ yard add @stylix/core
```

Stylix is compatible with React 16.8+.

## How to use Stylix

### Wrap your app with a `<StylixProvider>` element

Start by importing `StylixProvider` from `@stylix/core` and placing a `<StylixProvider>` element at the root of your app:

```tsx
import { StylixProvider } from '@stylix/core';

function App() {
  return (
    <StylixProvider>
      { /* your app */ }
    </StylixProvider>
  )
}
```

The `<StylixProvider>` element can provide [themes](/themes), [media queries](/media-queries), and [plugins](/plugins) to descendent elements. Each `<StylixProvider>` element outputs the CSS for its descendant elements to a `<style>` element that it places in your page's `<head>`. This behavior, and a few other configuration options, [can be customized](/api/stylixprovider).

### Use stylable HTML elements

Import the default `$` object from `@stylix/core` and use it to render stylable HTML elements in place of the regular old tags:

```tsx-render
import $ from '@stylix/core';

<$.div
  color="SkyBlue"
  text-align="center"
  font-size={40}
  font-weight="bold"
  font-style="italic"
>
  Hello, Stylix!
</$.div>
```

> Throughout this documentation, we always import this default object as `$`, but you can name it whatever you like.

Stylix provides all the standard HTML elements as properties of the `$` object (e.g. `<$.div>`, `<$.h1>`, `<$.p>`, etc.). These elements can be styled with props—they all accept any standard CSS property, in both `camelCase` and `kebab-case` formats. Of course, they also accept all the other standard attributes appropriate for their tag (`onClick`, `href` for `<$.a>`, `colSpan` for `<$.td>`, etc).

You aren't just limited to standard CSS properties and values, either. Stylix lets you use [complex selectors, pseudo-classes, nested CSS](/selectors), [media queries](/media-queries), [keyframe animations](/keyframe-animations), [themes](/themes), and create [custom style props](/custom-props). You can also [style other non-Stylix components](/styling-other-components), too—anything that accepts a `className` prop.

<a href="/best-practices" class="next-link">Stylix best practices</a>
