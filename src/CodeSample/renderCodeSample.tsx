import $ from "@stylix/core";
import tinyProps from "@stylix/tinyprops";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Stylix from "@stylix/core";

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

export default function renderCodeSnippet(code: string, renderValue: string, element: HTMLElement) {
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
