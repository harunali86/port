import '../styles/globals.css';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/Layout';
import SmoothScroll from '../components/SmoothScroll';
import Preloader from '../components/Preloader';
import WhatsAppButton from '../components/WhatsAppButton';

function MyApp({ Component, pageProps, router }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      {/* Preloader */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* WhatsApp Floating Button */}
      {!isLoading && <WhatsAppButton />}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={router?.pathname || 'main'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScroll>
  );
}

export default MyApp;
