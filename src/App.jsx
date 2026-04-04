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

const ViewRenderer = () => {
  const { activePage } = useApp();
  
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
};

function App() {
  return (
    <AppProvider>
      <MobileShell>
        <ViewRenderer />
      </MobileShell>
    </AppProvider>
  );
}

export default App;
