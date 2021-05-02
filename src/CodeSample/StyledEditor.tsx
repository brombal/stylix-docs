import $, { StylixProps } from '@stylix/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, loadLanguages } from 'reprism';
import Prism from 'reprism';

const { default: jsx } = require('reprism/languages/jsx');
loadLanguages(jsx);
// Overrides jsx tag detection to support <$.div>, etc.
Prism.languages.jsx.tag.pattern = /<\/?[\w$.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{[^}]*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?>/i;

const { default: typescript } = require('reprism/languages/typescript');
const { default: tsx } = require('reprism/languages/tsx');
const { default: bash } = require('reprism/languages/bash');
loadLanguages(typescript, tsx, bash);
Prism.languages.sh = Prism.languages.bash;

interface StyledEditorProps {
  src: string;
  editable?: boolean;
  lang: string;
  onChange(src: string): void;
}

export default function StyledEditor(props: StyledEditorProps & StylixProps<'div'>) {
  const { src, lang, editable, onChange, ...styles } = props;

  const [code, setCode] = useState(src);

  useEffect(() => {
    if (!editable) return;
    setCode(src);
  }, [editable, src]);

  return (
    <$
      $el={
        <Editor
          padding={10}
          value={code}
          readOnly={!editable}
          className={`lang-${lang}`}
          onValueChange={(code) => {
            setCode(code);
            onChange(code);
          }}
          highlight={(code) => {
            return highlight(code, lang, { component: false });
          }}
        />
      }
      {...styles}
      $css={{
        backgroundColor: '#212121',
        font: '14px / 24px Source Code Pro, monospace',

        'textarea, pre': {
          whiteSpace: 'pre !important',
        },

        '&.lang-bash': {
          color: '#EEFFFF',

          '.token.function': {
            color: '#FFCB6B',
          }
        },

        '&.lang-tsx': {
          color: '#ffa6bf',

          '.token.keyword': {
            color: '#C792EA',
          },
          '.token.builtin': {
            color: '#FFCB6B',
          },
          '.token.punctuation': {
            color: '#EEFFFF',
          },
          '.token.operator': {
            color: '#CCC',
          },
          '.token.string, .token.number': {
            color: '#a7f3a5',
          },
          '.token.comment': {
            color: '#888',
          },
          '.token.tag': {
            color: '#71def0',
          },
          '.token.attr-name': {
            color: '#c2f3fb',
          },
          '.token.attr-value': {
            color: '#a7f3a5',
          },
          '.token.tag .token.spread .token.attr-value': {
            color: '#FF6B95',
          },
          '.token.plain-text': {
            color: '#EEFFFF',
          },
        },
      }}
    />
  );
}
