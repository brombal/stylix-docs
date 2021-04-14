## Installation

```sh
npm install --save @stylix/core
```

Add a `<StylixProvider>` wrapper at the root of your project. Then, use Stylix elements to create html markup that can be styled with props, the same way you would write regular CSS properties:

```tsx-render-app
import $, { StylixProvider } from '@stylix/core';

function App() {
  return (
    <StylixProvider>
      <$.div
        color="#00BCD4"
        font-size={40}
        text-align="center"
      >
        This is Stylix!
      </$.div>
    </StylixProvider>
  );
}
```

> **Hint:** Many of the code samples on this site are editable. Try it out!

The `StylixProvider` component can provide themes and media queries, or additional configuration for certain less-common situations.

Stylix provides all the standard HTML elements as properties of the `$` object (e.g. `<$.div>`, `<$.h1>`, `<$.p>`, etc.). They all accept props for any standard CSS property. It is also easy to style any other component that accepts a `className` prop.

You aren't just limited to standard CSS properties, either. Stylix lets you use complex selectors, pseudo-classes, nested CSS, media queries, themes, keyframe animations, and more.

## Want to contribute? Have bugs, issues, or questions?

Open an issue or submit a PR on our GitHub page:

https://github.com/brombal/stylix

We ascribe to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct).

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright 2020 Brombal, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

