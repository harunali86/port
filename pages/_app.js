import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

// Dynamic imports for non-critical components
// Removed SmoothScroll - it was blocking initial render
// Dynamic imports for non-critical components
// Removed SmoothScroll - it was blocking initial render
const WhatsAppButton = dynamic(() => import('../components/WhatsAppButton'), { ssr: false });
const SoundToggle = dynamic(() => import('../components/SoundToggle'), { ssr: false });


// Optimize Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    // Track Visit (Once per session)
    if (!sessionStorage.getItem('visit_tracked')) {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'visit' })
      }).catch(err => console.error("Tracking Error:", err));
      sessionStorage.setItem('visit_tracked', 'true');
    }
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {/* Removed SmoothScroll wrapper - native scroll is fast enough */}
      <div className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}>
        {/* WhatsApp Floating Button */}
        <WhatsAppButton />

        {/* Sound Toggle Button */}
        <SoundToggle />


        {/* Main Content - Always rendered behind preloader for fast LCP */}
        <div className="relative z-0">
          <m.div
            key={router?.pathname || 'main'}
            className="min-h-screen"
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}

export default MyApp;
