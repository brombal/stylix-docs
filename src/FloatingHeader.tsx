import { faBars } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $, { StylixProps } from '@stylix/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';

import HeaderNav from '@app/HeaderNav';
import Logo from '@app/Logo';

interface FloatingHeaderProps {
  visible: boolean;
  onClickMobileMenu(): void;
}

export default React.forwardRef<HTMLDivElement, StylixProps<'div'> & FloatingHeaderProps>(
  function FloatingHeader({ visible, onClickMobileMenu, ...styles }, ref) {
    const { width } = useWindowSize();

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
        <$.div padding="15px 0" pageWidth display="flex" width="100%">
          <$.span flex="1 1 auto" display="flex" align-items="center">
            {width <= 1024 && (
              <$.span
                $css={{ '&:active': { opacity: 0.4 } }}
                width={44}
                display="inline-flex"
                padding={8}
                margin-right={10}
                onClick={onClickMobileMenu}
              >
                <$ $el={FontAwesomeIcon} icon={faBars} font-size={26} color="white" />
              </$.span>
            )}

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
          </$.span>

          <HeaderNav flex="0 0 auto" />
        </$.div>
      </$.div>
    );
  },
);
