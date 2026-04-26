import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/client';


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
  ORDER_SUCCESS: 'ORDER_SUCCESS',
  ABOUT: 'ABOUT',
  ADMIN_LOGIN: 'ADMIN_LOGIN',
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD'
};



export const AppProvider = ({ children }) => {
  // Startup State
  const [isStartupComplete, setIsStartupComplete] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(() => {
    // Show landing page only on desktop (widht >= 768px)
    return window.innerWidth >= 768;
  });

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSession, setAdminSession] = useState(null);

  // Navigation State


  const [mode, setMode] = useState(APP_MODES.DINE_IN);
  const [activePage, setActivePage] = useState(APP_PAGES.HOME);
  const [menuData, setMenuData] = useState({ categories: [], items: [] });
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Fetch Live Data from Supabase
  useEffect(() => {
    const fetchAppData = async () => {
      try {
        console.log('📡 Fetching menu data from Supabase...');
        
        // Try fetching categories first (safer ordering by id if 'order' column is missing)
        const { data: categories, error: catError } = await supabase
          .from('categories')
          .select('*')
          .order('id'); // Using ID instead of 'order' which might be missing
        
        if (catError) throw catError;

        const { data: items, error: itemError } = await supabase
          .from('menu_items')
          .select('*')
          .order('name');
        
        if (itemError) throw itemError;

        if (categories && items && categories.length > 0) {
          console.log('📦 Categories from Supabase:', categories);
          console.log(`✅ Supabase data loaded: ${items.length} items.`);
          // Normalize data structure for frontend components
          const normalizedItems = items.map(item => ({
            ...item,
            title: item.name,
            isVegetarian: item.is_veg,
            categoryId: item.category_id,
            isAvailable: item.is_available,
            isDeliverable: item.is_deliverable !== undefined ? item.is_deliverable : true
          }));

          setMenuData({ 
            categories: categories.map(cat => ({ ...cat, id: cat.id })), 
            items: normalizedItems 
          });
        } else {
          throw new Error('Supabase database is empty or unreachable.');
        }

      } catch (error) {
        console.error('⚠️ Supabase connection failed. Falling back to local data:', error.message);
        
        // --- FALLBACK LOGIC ---
        // Dynamically import local data (since it's a large JSON)
        try {
          const localMenu = await import('../../data/menu.json');
          const allCategories = [
            ...localMenu.default.dineInCategories.map(c => ({ ...c, mode: 'DINE_IN' })),
            ...localMenu.default.deliveryCategories.map(c => ({ ...c, mode: 'DELIVERY' }))
          ];
          
          // Deduplicate categories by ID
          const uniqueCats = Array.from(new Map(allCategories.map(c => [c.id, c])).values());
          
          const allItems = [
            ...localMenu.default.dineInItems,
            ...localMenu.default.deliveryItems
          ];

          setMenuData({
            categories: uniqueCats,
            items: allItems
          });
          console.log('🛡️ Local fallback data active.');
        } catch (localError) {
          console.error('❌ Critical: Local menu data also failed to load!', localError);
        }
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchAppData();
  }, [isAdmin]); // Refetch when admin logs in/out to ensure fresh data

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
    showLandingPage, setShowLandingPage,
    isAdmin, setIsAdmin,
    adminSession, setAdminSession,
    menuData, isDataLoading,
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
