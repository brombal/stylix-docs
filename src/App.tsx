import $ from '@stylix/core';
import { throttle } from 'lodash-es';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { Route, useLocation } from 'react-router';

import GlobalStyles from './GlobalStyles';
import Header from './Header';
import Home from './Home';
import MarkdownRenderer from './MarkdownRenderer';
import Menu from './Menu';

export default function App() {
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [menuSticky, setMenuSticky] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const location = useLocation();
  const [bannerRef, bannerInView] = useInView();

  const headerClearance = headerRef.current?.clientHeight;
  const isHome = location.pathname === '/';

  useEffect(() => {
    // Always display nav bar on interior pages
    if (isHome) setHeaderVisible(true);

    // Menu is always sticky on interior pages
    if (!isHome) setMenuSticky(true);

    // Scroll to top whenever location changes
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    // When scrolling past menu offset, toggle stickiness (on home only)
    const onScroll = throttle(() => {
      if (isHome) setMenuSticky(window.scrollY > menuRef.current.offsetTop - headerClearance);
    }, 10);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname, headerClearance]);

  // Toggle header when banner goes in/out of view.
  // If banner comes into view, turn off menu stickiness (this helps when users return to the home page but no
  // scrolling has occurred to otherwise disable this).
  useEffect(() => {
    setHeaderVisible(!bannerInView);
    if (bannerInView) setMenuSticky(false);
  }, [bannerInView]);

  return (
    <>
      <GlobalStyles />

      <Helmet>
        <title>Stylix - React, with style</title>
      </Helmet>

      <$.div position="relative" z-index={0}>
        <Header ref={headerRef} visible={headerVisible} z-index={100} />

        <Route path="/" exact render={() => <Home bannerRef={bannerRef} />} />

        <$.div
          max-width={1200}
          margin="0 auto"
          padding-top={isHome ? 0 : headerClearance}
          padding-bottom={200}
          display="flex"
          ref={bodyRef}
        >
          <$.div ref={menuRef} width={300} flex="0 0 auto" margin-top={5}>
            <Menu
              position={menuSticky ? 'fixed' : 'static'}
              top={headerClearance}
              bottom={0}
              overflowY="scroll"
              padding-top={40}
              width={275}
              $css={{
                // Can't use padding-bottom on wrapper because it doesn't work with scrollbar
                '> *': { marginBottom: 40 },
              }}
            />
          </$.div>
          <MarkdownRenderer
            filename={
              location.pathname
                .replace(/(^\/|\/$)/g, '')
                .split('/')
                .map(encodeURIComponent)
                .join('/') || 'index'
            }
            padding-top={40}
            flex="1 1 auto"
          />
        </$.div>
      </$.div>
    </>
  );
}
