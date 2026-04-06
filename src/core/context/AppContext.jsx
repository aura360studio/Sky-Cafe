import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const APP_MODES = {
  DINE_IN: 'DINE_IN',
  DELIVERY: 'DELIVERY',
  NIGHT_LIFE: 'NIGHT_LIFE'
};

export const APP_PAGES = {
  HOME: 'HOME',
  MENU: 'MENU',
  CART: 'CART',
  BOOKINGS: 'BOOKINGS',
  INFO: 'INFO',
  SERVICES: 'SERVICES',
  EVENTS: 'EVENTS',
  ORDER_SUCCESS: 'ORDER_SUCCESS'
};

export const AppProvider = ({ children }) => {
  // Startup State
  const [isStartupComplete, setIsStartupComplete] = useState(false);

  // Navigation State
  const [mode, setMode] = useState(APP_MODES.DINE_IN);
  const [activePage, setActivePage] = useState(APP_PAGES.HOME);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  
  // Checkout Context Metadata
  const [customerName, setCustomerNameState] = useState(() => {
    try { return window.localStorage.getItem('sky_customer_name') || ''; } catch (e) { return ''; }
  });
  const [tableNumber, setTableNumberState] = useState(() => {
    try { return window.localStorage.getItem('sky_table_number') || ''; } catch (e) { return ''; }
  });
  
  const setCustomerName = (name) => {
    setCustomerNameState(name);
    try {
      if (name) window.localStorage.setItem('sky_customer_name', name);
      else window.localStorage.removeItem('sky_customer_name');
    } catch (e) {}
  };

  const setTableNumber = (table) => {
    setTableNumberState(table);
    try {
      if (table) window.localStorage.setItem('sky_table_number', table);
      else window.localStorage.removeItem('sky_table_number');
    } catch (e) {}
  };

  const [location, setLocation] = useState(''); 
  const [distance, setDistance] = useState(null); 
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Cart Logic
  const addToCart = (item, quantity = 1, customizations = {}) => {
    const cartItemId = `${item.id}_${Date.now()}`;
    const lineTotal = item.price * quantity;
    setCartItems(prev => [...prev, { ...item, cartItemId, quantity, customizations, lineTotal }]);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateCartItemQuantity = (cartItemId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity, lineTotal: item.price * newQuantity };
      }
      return item;
    }));
  };

  // Session Orders (Current Bill)
  const [sessionOrders, setSessionOrders] = useState(() => {
    try {
      const item = window.localStorage.getItem('sky_session_orders');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      return [];
    }
  });

  const syncSessionOrders = (newOrders) => {
    const updated = [...sessionOrders, ...newOrders];
    setSessionOrders(updated);
    try {
      window.localStorage.setItem('sky_session_orders', JSON.stringify(updated));
    } catch (error) {}
  };

  const clearSessionOrders = () => {
    setSessionOrders([]);
    setCustomerNameState('');
    setTableNumberState('');
    try {
      window.localStorage.removeItem('sky_session_orders');
      window.localStorage.removeItem('sky_customer_name');
      window.localStorage.removeItem('sky_table_number');
    } catch (error) {}
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.lineTotal, 0);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const sessionTotal = sessionOrders.reduce((acc, item) => acc + item.lineTotal, 0);

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isiOS, setIsiOS] = useState(false);

  useEffect(() => {
    // 1. Check if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // 2. Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsiOS(/iphone|ipad|ipod/.test(userAgent));

    // 3. Capture beforeinstallprompt event (Android/Chrome)
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleSetMode = (newMode) => {
    setMode(newMode);
    setActivePage(APP_PAGES.HOME);
    setIsStartupComplete(true);
  };

  const value = {
    isStartupComplete, setIsStartupComplete,
    mode, setMode: handleSetMode,
    activePage, setActivePage,
    isHamburgerOpen, setIsHamburgerOpen,
    cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, cartTotal, cartItemCount,
    sessionOrders, syncSessionOrders, clearSessionOrders, sessionTotal,
    customerName, setCustomerName,
    tableNumber, setTableNumber,
    location, setLocation,
    distance, setDistance,
    selectedSlot, setSelectedSlot,
    deferredPrompt, isInstalled, isiOS, handleInstallApp
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
