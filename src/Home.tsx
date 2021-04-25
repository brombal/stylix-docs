import { faLevelDown } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $, { StylixProps } from '@stylix/core';
import * as React from 'react';
import { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import CodeSample from './CodeSample';
import HeaderNav from './HeaderNav';
import Logo, { logoSrc } from './Logo';

export default function Home(props: { bannerRef: React.Ref<HTMLDivElement> } & StylixProps) {
  const { bannerRef, ...styles } = props;
  const logoRef = useRef<HTMLDivElement>(null);

  return (
    <$.div {...styles}>
      <$.div
        background-image="radial-gradient(at 80% 10%, rgb(7, 104, 255) 0%, rgb(0, 213, 163) 100%)"
        color="white"
        text-shadow="0 0.1em 0.1em rgba(0, 0, 0, 0.15)"
        ref={props.bannerRef}
      >
        <$.div
          max-width={1200}
          margin="0 auto"
          width="100%"
          padding="15px 0"
          display="flex"
          justify-content="flex-end"
        >
          <HeaderNav showDocumentation />
        </$.div>

        <$.div padding="80px 0 150px" text-align="center">
          <Logo ref={logoRef} display="inline-block" />
          <$.div font-size={30} font-weight={400} opacity={0.75}>
            React, with style.
          </$.div>
        </$.div>
      </$.div>

      <$.div position="relative" max-width={1200} margin="0 auto">
        <$.div display="flex" align-items="flex-start">
          <$.div flex="0 0 auto" margin="-100px 0 0">
            <$.span
              color="white"
              font="24px Nunito, sans-serif"
              display="inline-block"
              transform="translate(-30px, -5px) rotate(-10deg)"
              text-shadow="0 4px 12px rgba(0, 0, 0, 0.3)"
            >
              Editable!
              <$
                $el={<FontAwesomeIcon icon={faLevelDown} />}
                margin-left={10}
                vertical-align="-40%"
              />
            </$.span>

            <CodeSample
              src={logoSrc}
              mode="text/typescript-jsx"
              editable
              render
              renderRef={logoRef}
              width={550}
              border-top="1px solid #AAA"
            />
          </$.div>

          <$.div flex="1 1 auto" padding="80px 0 0 60px">
            <$.div font-size={28} line-height={1.3} margin-bottom={30}>
              Style your apps with pure React code.
            </$.div>

            <$.p margin-bottom={20}>
              Stylix is a new library and methodology for styling your React apps. With Stylix, you
              add styles to your components the same way you add any other information: with <b>props</b>.
            </$.p>

            <$.p margin-bottom={20}>
              No separate CSS files, quirky alternative JavaScript syntax, or build tool
              configuration—<b>everything is React</b>, minimizing your learning curve and
              encouraging the same patterns and organizational best practices that have made React
              so popular.
            </$.p>

            <$.p>
              If you still aren't convinced, read the <Link to="/why-stylix">Why Stylix?</Link> page
              to see why we created Stylix, and why we think you'll love it.
            </$.p>
          </$.div>
        </$.div>
      </$.div>

      <$.a id="introduction" display="block" height={80} />
    </$.div>
  );
}
