import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $, { StylixProps, StylixProvider } from '@stylix/core';
import MarkdownIt from 'markdown-it';
import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';
import superagent from 'superagent';

import CodeSample from './CodeSample/CodeSample';

const md = MarkdownIt({
  html: true,
  linkify: true,
});

const replacers = [
  {
    query: 'a.next-link',
    render(element: HTMLElement) {
      return (
        <$.div
          border="1px solid #DDD"
          borderRadius={4}
          padding="10px 16px"
          display="flex"
          justify-content="flex-end"
          align-items="center"
          font-size={18}
          margin-top={40}
        >
          <$.span margin-right={8} opacity={0.4}>
            Next:
          </$.span>
          <$.span dangerouslySetInnerHTML={{ __html: element.outerHTML }} />
          <$ $el={FontAwesomeIcon} icon={faChevronRight} margin-left={10} />
        </$.div>
      );
    },
  },
  {
    query: 'pre',
    render(element: HTMLElement) {
      const codeElement = element.querySelector('code');
      if (!codeElement) return;

      let lang = codeElement.className.split(' ').find((c) => c.startsWith('language-'));

      const isRenderable = !!lang.match(/-render\b/);
      const isEditable = isRenderable && !lang.match(/-readonly\b/);
      const renderValue = lang.match(/-render-app$/) ? '<App />' : '';

      lang = lang.replace(/(^language-|-.*$)/g, '');

      if (lang === 'sh') lang = 'bash';

      return (
        <$.div margin="40px 0">
          <CodeSample
            src={codeElement.innerText?.trim()}
            lang={lang}
            editable={isEditable}
            render={isRenderable}
            renderValue={renderValue}
          />
        </$.div>
      );
    },
  },
];

interface MarkdownRendererProps {
  filename: string;
}

export default React.forwardRef<HTMLDivElement, MarkdownRendererProps & StylixProps>(
  function MarkdownRenderer({ filename, ...props }, ref) {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const reactContainers = [];

      (async () => {
        try {
          divRef.current.innerHTML = '';
          const result = await superagent.get(`/markdown/${filename}.md`);
          if (!result.text.trim()) return;

          divRef.current.innerHTML = md.render(result.text);

          const h1 = divRef.current.querySelector('h1');
          if (h1) setPageTitle(h1.innerText);
          replacers.forEach((replacer) => {
            const elements = divRef.current.querySelectorAll(replacer.query);
            elements.forEach((element: HTMLElement) => {
              const rendered = replacer.render(element);
              if (!rendered) return;
              const reactContainer = document.createElement('div');
              element.insertAdjacentElement('afterend', reactContainer);
              ReactDOM.render(
                <StylixProvider media={['', '(max-width: 1200px)', '(max-width: 768px)']}>
                  {rendered}
                </StylixProvider>,
                reactContainer,
              );
              reactContainers.push(reactContainer);
              element.style.display = 'none';
            });
          });
        } catch (e) {}
      })();

      return () => {
        setPageTitle('');
        reactContainers.forEach((reactContainer) => {
          try {
            ReactDOM.unmountComponentAtNode(reactContainer);
          } catch (e) {}
        });
      };
    }, [filename]);

    const [pageTitle, setPageTitle] = useState('');

    const history = useHistory();
    const handleClick = useCallback((e) => {
      if (
        e.target instanceof HTMLAnchorElement &&
        !e.target.getAttribute('href').startsWith('http') &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        history.push(e.target.pathname);
        e.preventDefault();
      }
    }, []);

    return (
      <$.div ref={ref} {...props}>
        {pageTitle && (
          <Helmet>
            <title>Stylix - {pageTitle}</title>
          </Helmet>
        )}
        <$.div
          ref={divRef}
          onClick={handleClick}
          $css={{
            '> *:first-child': {
              marginTop: 0,
            },
            h1: {
              fontSize: 46,
              lineHeight: 1.3,
              fontWeight: 'normal',
              marginBottom: 30,
            },
            h2: {
              fontSize: 30,
              lineHeight: 1.4,
              fontWeight: 'normal',
              margin: '50px 0 30px',
              paddingBottom: 5,
              borderBottom: '1px solid #DDD',
            },
            h3: {
              fontSize: 24,
              lineHeight: 1.6,
              fontWeight: 'normal',
              margin: '30px 0',
            },
            p: {
              marginBottom: 20,
            },
            code: {
              display: 'inline-block',
              padding: '0 5px',
              margin: '0 0.1em',
              fontFamily: "'Source Code Pro', monospace",
              fontSize: '0.9em',
              background: '#e9f7f9',
              border: '1px solid #d5e3e6',
              borderRadius: 3,
              lineHeight: 1.4,
            },
            'pre > code': {
              display: 'block',
              marginBottom: 20,
              padding: '8px 14px',
            },
            blockquote: {
              borderLeft: '3px solid #b6dce0',
              background: '#e9f7f9',
              padding: '10px 18px',
              fontSize: '0.9em',
              margin: '30px 0',
              borderRadius: 2,
              'p:last-child': {
                marginBottom: 0,
              },
            },
            ul: {
              marginLeft: 30,
              marginBottom: 20,
            },
            li: {
              marginBottom: 10,
            },
            table: {
              borderCollapse: 'collapse',
            },
            'td, th': {
              padding: '4px 8px',
              border: '1px solid #e3ecee',
            },
            'thead th': {
              background: '#f4f8f9',
            },
            'tr:nth-child(2n)': {
              background: '#f4f8f9',
            },
          }}
        />
      </$.div>
    );
  },
);
