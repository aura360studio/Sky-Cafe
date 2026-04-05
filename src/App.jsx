import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AppProvider, useApp, APP_PAGES } from './core/context/AppContext';
import { MobileShell } from './shared/layout/MobileShell';
import { HomeView } from './features/pages/HomeView';
import { MenuView } from './features/pages/MenuView';
import { CartView } from './features/pages/CartView';
import { BookingsView } from './features/pages/BookingsView';
import { InfoView } from './features/pages/InfoView';
import { ServicesView } from './features/pages/ServicesView';
import { EventsView } from './features/pages/EventsView';
import { OrderSuccessView } from './features/pages/OrderSuccessView';
import { SplashScreen } from './shared/components/SplashScreen';
import { ModeSelectionView } from './features/pages/ModeSelectionView';

const ViewRenderer = () => {
  const { activePage } = useApp();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ height: '100%', width: '100%' }}
      >
        {(() => {
          switch(activePage) {
            case APP_PAGES.HOME: return <HomeView />;
            case APP_PAGES.MENU: return <MenuView />;
            case APP_PAGES.CART: return <CartView />;
            case APP_PAGES.BOOKINGS: return <BookingsView />;
            case APP_PAGES.INFO: return <InfoView />;
            case APP_PAGES.SERVICES: return <ServicesView />;
            case APP_PAGES.EVENTS: return <EventsView />;
            case APP_PAGES.ORDER_SUCCESS: return <OrderSuccessView />;
            default: return <HomeView />;
          }
        })()}
      </motion.div>
    </AnimatePresence>
  );
};

const MainExperience = () => {
  const { isStartupComplete } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onFinish={() => setShowSplash(false)} />
      ) : !isStartupComplete ? (
        <ModeSelectionView key="selection" />
      ) : (
        <motion.div
           key="main"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5 }}
           style={{ height: '100%', width: '100%' }}
        >
          <MobileShell>
            <ViewRenderer />
          </MobileShell>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <AppProvider>
      <MainExperience />
    </AppProvider>
  );
}

export default App;
