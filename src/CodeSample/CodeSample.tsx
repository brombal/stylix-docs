import $, { StylixProps } from '@stylix/core';
import { debounce } from 'lodash-es';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';

import renderCodeSnippet from './renderCodeSample';
import StyledEditor from './StyledEditor';

interface CodeSampleProps {
  src: string;
  editable?: boolean;
  lang: string; // language for syntax highlighting
  render?: boolean; // Whether to render result
  renderValue?: string; // JS expression to render; if empty will render last expression
  renderRef?: React.RefObject<HTMLElement>; // Element to render into; if not specified will render in split pane
}

/**
 * Displays a syntax-highlighted code editor (optionally read-only) that renders `renderValue` to the element
 * referenced by `renderRef`.
 */
export default function CodeSample(props: CodeSampleProps & StylixProps<'div'>) {
  const { src, lang, render, renderValue, editable, renderRef, ...styles } = props;

  const selfRenderRef = useRef<HTMLDivElement>(null);
  const isSelfRendering = !!render && !renderRef;

  const realRenderRef = renderRef || selfRenderRef;

  const debouncedRenderCodeSnippet = useCallback(debounce(renderCodeSnippet, 200), []);

  useEffect(() => {
    if (!render) return;
    debouncedRenderCodeSnippet(src, renderValue, realRenderRef.current);
  }, [render, src]);

  return (
    <$.div
      display="flex"
      flex-direction={['row', 'column']}
      border-radius={4}
      overflow="scroll"
      box-shadow="0 8px 16px rgba(0, 0, 0, 0.35)"
      height="auto"
      {...styles}
    >
      <$.div
        position="relative"
        flex={isSelfRendering ? '0 0 auto' : '1 1 auto'}
        width={isSelfRendering ? ['50%', 'auto'] : 'auto'}
      >
        <StyledEditor
          src={src}
          lang={lang}
          editable={editable}
          onChange={(code) => {
            if (render)
              debouncedRenderCodeSnippet(code, renderValue, realRenderRef.current);
          }}
        />
        {editable && (
          <$.span
            position="absolute"
            font="12px Nunito, sans-serif"
            color="white"
            bottom={10}
            right={10}
            border="1px solid rgba(255, 255, 255, 0.8)"
            padding="0 8px"
            border-radius={20}
            opacity={0.5}
          >
            Editable
          </$.span>
        )}
      </$.div>
      {isSelfRendering && (
        <$.div ref={selfRenderRef} flex="0 0 auto" width={['50%', 'auto']} padding="8px 12px" />
      )}
    </$.div>
  );
}
