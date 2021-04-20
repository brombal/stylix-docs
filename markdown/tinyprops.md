# TinyProps

TinyProps is a Stylix plugin that provides a set of prop shortcuts for some of the most commonly used CSS properties.

## Installation

```sh
npm install --save @stylix/tinyprops
```

Add `tinyProps` to the `<StylixProvider>` element's `plugins` prop array: 

```tsx-render
import $, { StylixProvider } from '@stylix/core';
import tinyProps from '@stylix/tinyprops';

<StylixProvider plugins={[tinyProps]}>
  <$.div p={10} bg="AliceBlue">
    TinyProps
  </$.div>
</StylixProvider>
```

TinyProps provides the following prop shortcuts:

### Positioning / Layout

| Shortcut prop name      | Expanded props |
| ----------- | ----------- |
| `absolute` | `position="absolute"` |
| `abs-center` | `position="absolute" transform="translate(-50%, -50%)"` |
| `abs-fill` | `position="absolute" left={0} top={0} width="100%" height="100%"` |
| `relative` | `position="relative"` |
| `block` | `display="block"` |
| `inline` | `display="inline"` |
| `inline-block` | `display="inline-block"` |
| `inline-flex` | `display="inline-flex"` |
| `flex-center` | `display="flex" align-items="center" justify-content="center"` |
| `flex-children={value}` | `$css={{ "& > *": { flex: value }}}` |
| `flex-column` | `display="flex" flex-direction="column"` |
| `flexbox` | `display="flex"` |

### Margin / Padding

| Shortcut prop name      | Expanded props |
| ----------- | ----------- |
| `m={value}` | `margin={value}` |
| `mr={value}` | `margin-right={value}` |
| `mb={value}` | `margin-bottom={value}` |
| `ml={value}` | `margin-left={value}` |
| `mt={value}` | `margin-top={value}` |
| `mh={value}` | `margin-left={value} margin-right={value}` |
| `mv={value}` | `margin-top={value} margin-bottom={value}` |
| `p={value}` | `padding={value}` |
| `pt={value}` | `padding-top={value}` |
| `pr={value}` | `padding-right={value}` |
| `pb={value}` | `padding-bottom={value}` |
| `pl={value}` | `padding-left={value}` |
| `ph={value}` | `padding-left={value} padding-right={value}` |
| `pv={value}` | `padding-top={value} padding-bottom={value}` |

### Font / Text

| Shortcut prop name      | Expanded props |
| ----------- | ----------- |
| `bold` | `font-weight="bold"` |
| `italic` | `font-stylix="italic"` |
| `nowrap` | `flex-wrap="nowrap" white-space="nowrap"` |
| `ellipsis` | `text-overflow="ellipsis" overflow="hidden" white-space="nowrap"` |
| `text-center` | `text-align="center"` |
| `text-right` | `text-align="right"` |
| `text-left` | `text-align="left"` |
  
### Color
| Shortcut prop name      | Expanded props |
| ----------- | ----------- |
| `bg={value}` | `background={value}` |
| `bg-color={value}` | `background-color={value}` |
