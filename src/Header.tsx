import * as React from 'react';
import { Link } from 'react-router-dom';
import $, { StylixProps } from '@stylix/core';

import HeaderNav from '@app/HeaderNav';
import Logo from '@app/Logo';

interface FloatingHeaderProps {
  visible: boolean;
}

export default React.forwardRef<HTMLDivElement, FloatingHeaderProps & StylixProps>(
  function FloatingHeader({ visible, ...styles }, ref) {
    return (
      <$.div
        background="#0CAAC1"
        background-image="linear-gradient(to bottom left, hsl(215, 100%, 50%) 0%, #00B5C0 100%)"
        position="fixed"
        top={0}
        left={0}
        width="100%"
        transform={visible ? '' : 'translateY(-100%)'}
        transition="transform 300ms ease-out"
        text-shadow="0 0.1em 0.1em rgba(0, 0, 0, 0.15)"
        ref={ref}
        {...styles}
      >
        <$.div
          display="flex"
          justify-content="space-between"
          max-width={1200}
          margin="0 auto"
          width="100%"
          padding="15px 0"
        >
          <$
            $el={Link}
            to="/"
            text-decoration="none"
            color="inherit"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Logo font="30px Nunito, sans-serif" color="white" />
          </$>
          <HeaderNav />
        </$.div>
      </$.div>
    );
  },
);
