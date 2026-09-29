import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { ExploreStateProvider } from '@/state/ExploreState';
import { BoothModeProvider, useBoothMode } from '@/state/BoothMode';
import { ThemeProvider } from '@/state/Theme';
import { Header } from '@/components/Navigation/Header';
import { Footer } from '@/components/Navigation/Footer';
import { IdleReset } from '@/components/Booth/IdleReset';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';

// Map pages load eagerly (they're the core). Other sections are split out.
const Timeline = lazy(() => import('@/pages/Timeline'));
const Unification = lazy(() => import('@/pages/Unification'));
const Kings = lazy(() => import('@/pages/Kings'));
const Sources = lazy(() => import('@/pages/Sources'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** Scroll to top on page change (but not on in-page query changes). */
function ScrollOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Shell() {
  const booth = useBoothMode();
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      <ScrollOnRoute />
      {/* The home page is a full-bleed welcome screen; the header appears on every other page. */}
      {!isHome && <Header />}
      <main id="main" tabIndex={-1} className={isHome ? 'is-home' : ''}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          {/* Keyed wrapper replays the page-enter animation on each navigation. */}
          <div className="route-view" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/unification" element={<Unification />} />
            <Route path="/kings" element={<Kings />} />
            <Route path="/sources" element={<Sources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
      {booth && <IdleReset />}
    </>
  );
}

export default function App() {
  return (
    <BoothModeProvider>
      <ThemeProvider>
      <LanguageProvider>
        <ExploreStateProvider>
          {/* HashRouter: works on any static host (and from a local file) with no server rewrites. */}
          <HashRouter>
            <Shell />
          </HashRouter>
        </ExploreStateProvider>
      </LanguageProvider>
      </ThemeProvider>
    </BoothModeProvider>
  );
}
