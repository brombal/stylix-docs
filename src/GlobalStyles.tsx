import { useGlobalStyles } from '@stylix/core';
import React from 'react';
import Helmet from 'react-helmet';

export default function GlobalStyles() {
  useGlobalStyles({
    '*': {
      padding: 0,
      margin: 0,
      outline: 0,
      border: 0,
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
    },
    html: {
      font: '16px / 2 Montserrat, sans-serif',
    },
    body: {
      '-webkit-text-size-adjust': '100%',
    },
    a: {
      color: '#067F91',
      transition: 'color 100ms linear',
      textDecoration: 'none',
      '&:hover': {
        color: '#0CAAC1',
        textDecoration: 'underline',
      },
    },
    select: {
      border: '1px solid #CCC',
      padding: '4px 6px',
      borderRadius: 3,
    },
  });

  return (
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Nunito:wght@700;900&family=Source+Code+Pro:wght@400&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
}
