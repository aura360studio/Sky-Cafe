import { useApp, APP_PAGES, APP_MODES } from '../../core/context/AppContext';

export const BottomNavigation = () => {
  const { mode, activePage, setActivePage } = useApp();

  const getNavItems = () => {
    switch(mode) {
      case APP_MODES.DINE_IN:
        return [
          { page: APP_PAGES.HOME, label: 'Home', icon: 'home' },
          { page: APP_PAGES.MENU, label: 'Menu', icon: 'restaurant_menu' },
          { page: APP_PAGES.CART, label: 'Cart', icon: 'shopping_cart' },
          { page: APP_PAGES.BOOKINGS, label: 'Bookings', icon: 'event_seat' }
        ];
      case APP_MODES.DELIVERY:
        return [
          { page: APP_PAGES.HOME, label: 'Home', icon: 'home' },
          { page: APP_PAGES.MENU, label: 'Menu', icon: 'menu_book' },
          { page: APP_PAGES.CART, label: 'Cart', icon: 'shopping_cart' },
          { page: APP_PAGES.INFO, label: 'Info', icon: 'info' }
        ];
      case APP_MODES.NIGHT_LIFE:
        return [
          { page: APP_PAGES.HOME, label: 'Home', icon: 'home' },
          { page: APP_PAGES.SERVICES, label: 'Services', icon: 'room_service' },
          { page: APP_PAGES.BOOKINGS, label: 'Bookings', icon: 'event_seat' },
          { page: APP_PAGES.EVENTS, label: 'Events', icon: 'celebration' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button 
          key={item.page}
          className={`nav-item ${activePage === item.page ? 'active' : ''}`}
          onClick={() => setActivePage(item.page)}
        >
          <div className="nav-icon-container">
            <span className="material-icons">{item.icon}</span>
          </div>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
