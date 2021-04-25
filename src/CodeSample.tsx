import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/shell/shell';
import './stylix-editor-theme.css';

import $, { StylixProps } from '@stylix/core';
import * as Stylix from '@stylix/core';
import tinyProps from '@stylix/tinyprops';
import { debounce } from 'lodash-es';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { UnControlled as ReactCodeMirror } from 'react-codemirror2';
import * as ReactDOM from 'react-dom';

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOM;
    Stylix: typeof $;
    StylixTinyProps: typeof tinyProps;
    ts: any;
  }
}

window.React = React;
window.ReactDOM = ReactDOM;
window.Stylix = $;
window.StylixTinyProps = tinyProps;

function renderCodeSnippet(code: string, renderValue: string, element: HTMLElement) {
  function require(name) {
    if (name === '@stylix/core') {
      return {
        default: (window as any).Stylix,
        ...Stylix,
      };
    } else if (name === '@stylix/tinyprops') {
      return {
        default: (window as any).StylixTinyProps,
      };
    }
    throw new Error('Cannot import anything other than stylix here! ' + name);
  }
  require('@stylix/core'); // prevents uglify removing "unused" function

  try {
    const output = window.ts.transpileModule(code + (renderValue ? `; ${renderValue};` : ''), {
      compilerOptions: {
        jsx: 'react',
        target: 'es5',
      },
      reportDiagnostics: true,
    });

    if (output.diagnostics?.length) {
      throw new Error(output.diagnostics[0].messageText);
    }

    const app: any = eval(`
      var exports = {};
      const $ = window.Stylix;
      ${output.outputText};
    `);

    try {
      ReactDOM.unmountComponentAtNode(element);
    } catch (e) {}

    ReactDOM.render(<Stylix.StylixProvider>{app}</Stylix.StylixProvider>, element);
  } catch (e) {
    try {
      ReactDOM.unmountComponentAtNode(element);
    } catch (e) {}
    if (element) element.innerHTML = e.message;
    else console.error(e);
  }
}

interface CodeSampleProps {
  src: string;
  editable?: boolean;
  mode: any; // mode option passed to codemirror
  render?: boolean; // Whether to render result
  renderValue?: string; // JS expression to render; if empty will render last expression
  renderRef?: React.RefObject<HTMLElement>; // Element to render into; if not specified will render in split pane
}

/**
 * Displays a syntax-highlighted code editor (optionally read-only) that renders `renderValue` to the element
 * referenced by `renderRef`.
 */
export default function CodeSample(props: CodeSampleProps & StylixProps<'div'>) {
  const { src, mode, render, renderValue, editable, renderRef, ...styles } = props;

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
      flex-direction="row"
      border-radius={4}
      overflow="hidden"
      box-shadow="0 8px 16px rgba(0, 0, 0, 0.35)"
      height="auto"
      {...styles}
    >
      <$.div
        position="relative"
        flex={isSelfRendering ? '0 0 auto' : '1 1 auto'}
        width={isSelfRendering ? '50%' : 'auto'}
      >
        <$
          $el={
            <ReactCodeMirror
              value={src}
              options={{
                mode,
                theme: 'stylix',
                lineNumbers: false,
                tabSize: 2,
                readOnly: !editable || !render ? 'nocursor' : false,
              }}
              onChange={(editor, event, value) => {
                debouncedRenderCodeSnippet(value, renderValue, realRenderRef.current);
              }}
            />
          }
          position="relative"
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
        <$.div ref={selfRenderRef} flex="0 0 auto" width="50%" padding="8px 12px" />
      )}
    </$.div>
  );
}
