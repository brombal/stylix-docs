import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faBook, faExternalLinkAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import $, { StylixProps } from '@stylix/core';

const HeaderLink = ({ icon, iconSize, href, label, external = false, ...styles }) => (
  <$.a
    href={href}
    color="inherit"
    text-decoration="none"
    display="inline-flex"
    align-items="center"
    target={external ? '_blank' : ''}
    $css={{
      svg: {
        opacity: 0.8,
        transition: 'all 100ms ease-out',
      },
      '&:hover': { color: 'inherit' },
      '&:hover svg': {
        opacity: 1,
        transform: 'scale(1.1)',
      },
    }}
    {...styles}
  >
    <$ $el={<FontAwesomeIcon icon={icon} />} font-size={iconSize} />
    <$.span margin-left={15} font-size={18}>
      {label}
    </$.span>
    {external && (
      <$
        $el={<FontAwesomeIcon icon={faExternalLinkAlt} />}
        font-size={11}
        margin-left={10}
        opacity={0.75}
      />
    )}
  </$.a>
);

interface HeaderNavProps {
  showDocumentation?: boolean;
}

export default function HeaderNav({ showDocumentation, ...styles }: HeaderNavProps & StylixProps) {
  return (
    <$.div
      display="inline-flex"
      align-items="center"
      justify-content="flex-start"
      color="white"
      {...styles}
    >
      {showDocumentation && (
        <HeaderLink
          iconSize={24}
          label="Documentation"
          icon={faBook}
          href="/#introduction"
          margin-right={50}
        />
      )}
      <HeaderLink
        iconSize={40}
        label="View on npm"
        icon={faNpm}
        href="https://npmjs.org/package/@stylix/core"
        external
        margin-right={50}
      />
      <HeaderLink
        icon={faGithub}
        iconSize={40}
        label="View on GitHub"
        href="https://github.com/brombal/stylix"
        external
      />
    </$.div>
  );
}
