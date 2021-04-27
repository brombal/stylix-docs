import $, { StylixProps } from '@stylix/core';
import MarkdownIt from 'markdown-it';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import superagent from 'superagent';

const md = MarkdownIt();

type MenuProps = { onClickMenu(): void } & StylixProps<'div'>;

export default React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { onClickMenu, ...styles },
  ref,
) {
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      const result = await superagent.get(
        'https://raw.githubusercontent.com/brombal/stylix-docs/main/markdown/menu.md',
      );
      setContent(md.render(result.text));
    })();
  }, []);

  const history = useHistory();
  const location = useLocation();

  const handleLinkClick = useCallback((e) => {
    if ('pathname' in e.target && !e.ctrlKey && !e.metaKey) {
      history.push(e.target.pathname);
      e.preventDefault();

      if (e.target.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });

      onClickMenu();
    }
  }, []);

  return (
    <$.div
      font-size={16}
      line-height={1.5}
      {...styles}
      ref={ref}
      dangerouslySetInnerHTML={{ __html: content }}
      onClick={handleLinkClick}
      $css={[
        {
          li: {
            marginTop: 20,
            listStyle: 'none',
            fontWeight: 'normal',

            '&:first-child': {
              marginTop: 0,
            },

            a: {
              textDecoration: 'none',
              display: 'block',

              [`&[href="${location.pathname}"]`]: {
                fontWeight: 'bold',
              },
            },

            li: {
              marginLeft: 20,
              fontSize: '0.9em',

              '&:first-child': {
                marginTop: 20,
              },
            },
          },
        },
        styles.$css,
      ]}
    />
  );
});
