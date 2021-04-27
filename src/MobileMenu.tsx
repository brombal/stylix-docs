import $, { StylixProps } from '@stylix/core';
import * as React from 'react';

import Menu from '@app/Menu';

type MobileNavProps = { visible: boolean; onClickMenu(): void } & StylixProps<'div'>;

export default function MobileMenu({ visible, onClickMenu, ...styles }: MobileNavProps) {
  return (
    <$.div
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      background="white"
      overflow="scroll"
      padding="20px"
      // display={visible ? 'block' : 'none'}
      transform={`translateY(${visible ? 0 : -150}px)`}
      opacity={visible ? 1 : 0}
      pointer-events={visible ? 'auto' : 'none'}
      transition="transform 400ms cubic-bezier(.2, .45, .45, 1), opacity 200ms linear"
      {...styles}
    >
      <Menu font-size={20} onClickMenu={onClickMenu} />
    </$.div>
  );
}
