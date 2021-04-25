import * as React from 'react';
import $, { StylixProps } from '@stylix/core';

export const logoSrc = ` 
import $ from '@stylix/core';

// Create reusable, extendable, styled  
// components with full React power!
const AngleBracket = ({ angle, ...styles }) => (
  <$.span opacity={0.4} font-weight={900} {...styles}>
    {angle}
  </$.span>
);

// Or just add styles as-needed to html elements,
// and never think of another class name again!
<$.div font-size={90}>
  <AngleBracket angle="<" margin-right="0.05em" />

  Stylix
  
  <$.img 
    src="paintbrush.svg" 
    width="0.8em" 
    margin-left="0.2em"
    vertical-align="-5%" 
  />
  <AngleBracket angle=">" margin-left="0.05em" />
</$.div>
`.trim();

// this is duplicated from the code sample  to render immediately for performance
const AngleBracket = ({ angle, ...styles }) => (
  <$.span opacity={0.4} font-weight={900} {...styles}>
    {angle}
  </$.span>
);

interface LogoProps {}

export default React.forwardRef<HTMLDivElement, LogoProps & StylixProps>(function Logo(props, ref) {
  return (
    <$.div ref={ref} font-family="Nunito, sans-serif" line-height="normal" {...props}>
      <$.span display="block" font-size={90} {...props}>
        <AngleBracket angle="<" margin-right="0.05em" />
        Stylix
        <$.img src="paintbrush.svg" width="0.8em" margin-left="0.2em" vertical-align="-5%" />
        <AngleBracket angle=">" margin-left="0.05em" />
      </$.span>
    </$.div>
  );
});
