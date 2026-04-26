import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../core/context/AppContext';
import { supabase } from '../../core/supabase/client';

export const AdminDashboard = () => {
  const { setIsAdmin, setAdminSession } = useApp();
  const [activeTab, setActiveTab] = useState('bookings');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setAdminSession(null);
  };


  const tabs = [
    { id: 'bookings', label: 'Bookings', icon: 'auto_stories' },
    { id: 'menu', label: 'Manage Menu', icon: 'restaurant_menu' },
    { id: 'events', label: 'Events & Specials', icon: 'celebration' },
    { id: 'analytics', label: 'Analytics', icon: 'insights' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <div className="admin-dashboard-container" style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#050505',
      display: 'flex',
      color: '#fff',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        /* High-specificity override for Admin Dashboard scrollbars */
        .admin-dashboard-container, 
        .admin-dashboard-container * {
          scrollbar-width: thin !important;
          scrollbar-color: var(--accent-color) rgba(255,255,255,0.05) !important;
        }

        .admin-dashboard-container ::-webkit-scrollbar {
          display: block !important;
          width: 6px !important;
          height: 6px !important;
        }

        .admin-dashboard-container ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02) !important;
        }

        .admin-dashboard-container ::-webkit-scrollbar-thumb {
          background: #10a37f !important; /* Brighter accent green */
          border-radius: 10px !important;
        }

        .admin-dashboard-container ::-webkit-scrollbar-thumb:hover {
          background: #0e8c6c !important;
        }
      `}</style>

      
      {/* Sidebar */}
      <div style={{
        width: '280px',
        height: '100%',
        backgroundColor: '#0a0a0a',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 20px'
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', paddingLeft: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--accent-color)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-icons" style={{ color: '#fff' }}>restaurant</span>
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', margin: 0, letterSpacing: '1px' }}>SKY CAFE</h1>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Command Center</p>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                backgroundColor: activeTab === tab.id ? 'rgba(16, 163, 127, 0.1)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.5)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span className="material-icons" style={{ fontSize: '20px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 16px',
            backgroundColor: 'transparent',
            color: '#e5534b',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <span className="material-icons" style={{ fontSize: '20px' }}>logout</span>
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Header */}
        <header style={{
          height: '80px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', textTransform: 'capitalize' }}>{activeTab.replace('_', ' ')}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>Admin User</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Super Admin</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222', border: '1px solid rgba(255,255,255,0.1)' }}></div>
          </div>
        </header>

        {/* Content Area */}
        <main style={{ 
          flex: 1, 
          padding: '40px', 
          overflowY: 'auto',
          height: 'calc(100vh - 80px)' // Ensure height is explicit for scrolling
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'bookings' && <BookingsModule />}
              {activeTab === 'menu' && <MenuModule onNotify={showToast} />}
              {activeTab === 'events' && <EventsModule />}
              {activeTab === 'analytics' && <AnalyticsModule />}
              {activeTab === 'settings' && <SettingsModule />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Toast */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                backgroundColor: 'var(--accent-color)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 2000
              }}
            >
              <span className="material-icons" style={{ fontSize: '20px' }}>check_circle</span>
              <span style={{ fontWeight: '600' }}>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


const MenuModule = ({ onNotify }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // all, special, popular, combo
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingPrice, setEditingPrice] = useState({}); // { id: value }



  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const { data: catData, error: catError } = await supabase.from('categories').select('*').order('id');
      if (catError) throw catError;

      const { data: itemData, error: itemError } = await supabase.from('menu_items').select('*').order('name');
      if (itemError) throw itemError;

      setCategories(catData || []);
      setItems(itemData || []);
    } catch (err) {
      console.error('Menu load error:', err);
      onNotify(`Error loading menu: ${err.message || 'Check connection'}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (itemId, currentStatus) => {
    setUpdatingId(itemId);
    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: !currentStatus })
      .eq('id', itemId);
    
    if (!error) {
      setItems(items.map(i => i.id === itemId ? { ...i, is_available: !currentStatus } : i));
      onNotify(`Dish marked as ${!currentStatus ? 'Available' : 'Unavailable'}`);
    }
    setUpdatingId(null);
  };

  const toggleFlag = async (itemId, flag, currentStatus) => {
    setUpdatingId(itemId);
    const { error } = await supabase
      .from('menu_items')
      .update({ [flag]: !currentStatus })
      .eq('id', itemId);
    
    if (error) {
      console.error(`Error updating ${flag}:`, error);
      onNotify(`Error: ${error.message || 'Check if DB columns exist'}`);
    } else {
      setItems(items.map(i => i.id === itemId ? { ...i, [flag]: !currentStatus } : i));
      const flagName = flag.replace('is_', '').toUpperCase();
      onNotify(`${flagName} updated for item`);
    }
    setUpdatingId(null);
  };


  const handlePriceSave = async (itemId) => {
    const newPrice = editingPrice[itemId];
    if (newPrice === undefined) return;

    setUpdatingId(itemId);
    const { error } = await supabase
      .from('menu_items')
      .update({ price: parseFloat(newPrice) })
      .eq('id', itemId);
    
    if (!error) {
      setItems(items.map(i => i.id === itemId ? { ...i, price: parseFloat(newPrice) } : i));
      onNotify('Price updated successfully');
      setEditingPrice(prev => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
    }
    setUpdatingId(null);
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setUpdatingId(itemId);
    const { error } = await supabase.from('menu_items').delete().eq('id', itemId);
    if (!error) {
      setItems(items.filter(i => i.id !== itemId));
      onNotify('Item deleted successfully');
    } else {
      onNotify(`Error: ${error.message}`);
    }
    setUpdatingId(null);
  };

  const clearDuplicates = async () => {
    if (!window.confirm('This will delete items with identical names, keeping only one of each. Proceed?')) return;
    setLoading(true);
    
    // Logic to find and delete duplicates
    const itemMap = new Map();
    const toDelete = [];
    
    items.forEach(item => {
      if (itemMap.has(item.name)) {
        toDelete.push(item.id);
      } else {
        itemMap.set(item.name, item.id);
      }
    });

    if (toDelete.length > 0) {
      const { error } = await supabase.from('menu_items').delete().in('id', toDelete);
      if (!error) {
        setItems(items.filter(i => !toDelete.includes(i.id)));
        onNotify(`Removed ${toDelete.length} duplicate items`);
      } else {
        onNotify(`Error: ${error.message}`);
      }
    } else {
      onNotify('No duplicates found!');
    }
    setLoading(false);
  };


  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'special' && item.is_special) ||
      (activeFilter === 'popular' && item.is_popular) ||
      (activeFilter === 'combo' && item.is_combo);
    const matchesCategory = selectedCategory === 'all' || item.category_id === selectedCategory;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>Loading Menu Data...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Search and Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '400px' }}>
          <span className="material-icons" style={{ position: 'absolute', left: '16px', top: '12px', color: 'rgba(255,255,255,0.3)', fontSize: '20px' }}>search</span>
          <input 
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '12px 16px 12px 48px',
              color: '#fff',
              fontSize: '15px'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '4px' }}>
            {['all', 'special', 'popular', 'combo'].map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeFilter === f ? 'rgba(16, 163, 127, 0.2)' : 'transparent',
                  color: activeFilter === f ? 'var(--accent-color)' : 'rgba(255,255,255,0.4)',
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowAddDrawer(true)}
            style={{ backgroundColor: 'var(--accent-color)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span className="material-icons" style={{ fontSize: '20px' }}>add</span>
            Add New Item
          </button>
          <button 
            onClick={clearDuplicates}
            style={{ backgroundColor: 'rgba(229, 83, 75, 0.1)', color: '#e5534b', border: '1px solid rgba(229, 83, 75, 0.2)', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span className="material-icons" style={{ fontSize: '20px' }}>cleaning_services</span>
            Double Check & Clean
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAddDrawer && (
          <AddItemDrawer 
            categories={categories} 
            onClose={() => setShowAddDrawer(false)} 
            onAdded={fetchMenu} 
          />
        )}
      </AnimatePresence>


      {/* Categories Horizontal Quick-Scroll */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
        <div 
          onClick={() => setSelectedCategory('all')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: selectedCategory === 'all' ? 'rgba(16, 163, 127, 0.2)' : 'rgba(255,255,255,0.03)', 
            borderRadius: '20px', 
            border: `1px solid ${selectedCategory === 'all' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)'}`, 
            fontSize: '13px', 
            whiteSpace: 'nowrap', 
            cursor: 'pointer',
            color: selectedCategory === 'all' ? 'var(--accent-color)' : '#fff'
          }}
        >
          All Items
        </div>
        {categories.map(cat => (
          <div 
            key={cat.id} 
            onClick={() => setSelectedCategory(prev => prev === cat.id ? 'all' : cat.id)}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: selectedCategory === cat.id ? 'rgba(16, 163, 127, 0.2)' : 'rgba(255,255,255,0.03)', 
              borderRadius: '20px', 
              border: `1px solid ${selectedCategory === cat.id ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)'}`, 
              fontSize: '13px', 
              whiteSpace: 'nowrap', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              color: selectedCategory === cat.id ? 'var(--accent-color)' : '#fff'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Menu Table Container */}
      <div style={{ 
        background: 'rgba(255,255,255,0.02)', 
        borderRadius: '24px', 
        border: '1px solid rgba(255,255,255,0.05)', 
        overflowX: 'auto' // Vertical scrolling is handled by <main>
      }}>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontVariant: 'all-small-caps', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Dish Name</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontVariant: 'all-small-caps', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Category</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontVariant: 'all-small-caps', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Price (₹)</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontVariant: 'all-small-caps', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Promo</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontVariant: 'all-small-caps', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Deliv?</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontVariant: 'all-small-caps', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Status</th>
              <th style={{ padding: '20px 24px', fontSize: '12px', fontVariant: 'all-small-caps', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => {
              const category = categories.find(c => c.id === item.category_id);
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', opacity: updatingId === item.id ? 0.5 : 1 }}>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.is_veg ? '#4caf50' : '#e5534b' }}></div>
                      <span style={{ fontWeight: '600' }}>{item.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                    {category ? category.name : 'Unknown'}
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input 
                        type="number" 
                        value={editingPrice[item.id] !== undefined ? editingPrice[item.id] : item.price}
                        onChange={(e) => setEditingPrice({ ...editingPrice, [item.id]: e.target.value })}
                        style={{
                          width: '80px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--accent-color)',
                          fontWeight: '700',
                          fontSize: '15px',
                          padding: '6px 10px',
                          borderRadius: '8px'
                        }}
                      />
                      {editingPrice[item.id] !== undefined && (
                        <button 
                          onClick={() => handlePriceSave(item.id)}
                          style={{
                            background: '#10a37f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <span className="material-icons" style={{ fontSize: '18px' }}>check</span>
                        </button>
                      )}
                    </div>
                  </td>

                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => toggleFlag(item.id, 'is_special', item.is_special)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.is_special ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)' }}
                        title="Special"
                      >
                        <span className="material-icons" style={{ fontSize: '20px' }}>{item.is_special ? 'star' : 'star_outline'}</span>
                      </button>
                      <button 
                        onClick={() => toggleFlag(item.id, 'is_popular', item.is_popular)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.is_popular ? '#ffc107' : 'rgba(255,255,255,0.1)' }}
                        title="Popular"
                      >
                        <span className="material-icons" style={{ fontSize: '20px' }}>trending_up</span>
                      </button>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <button 
                      onClick={() => toggleFlag(item.id, 'is_deliverable', item.is_deliverable ?? true)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        color: (item.is_deliverable ?? true) ? '#2196f3' : 'rgba(255,255,255,0.1)' 
                      }}
                      title={(item.is_deliverable ?? true) ? 'Deliverable' : 'Dine-In Only'}
                    >
                      <span className="material-icons" style={{ fontSize: '22px' }}>
                        {(item.is_deliverable ?? true) ? 'local_shipping' : 'local_shipping'}
                      </span>
                      {!(item.is_deliverable ?? true) && (
                        <div style={{ position: 'absolute', width: '20px', height: '2px', backgroundColor: '#e5534b', transform: 'rotate(-45deg)' }}></div>
                      )}
                    </button>
                  </td>

                  <td style={{ padding: '20px 24px' }}>
                    <div 
                      onClick={() => toggleAvailability(item.id, item.is_available)}
                      style={{
                        width: '40px',
                        height: '20px',
                        backgroundColor: item.is_available ? 'var(--accent-color)' : '#333',
                        borderRadius: '20px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <motion.div
                        animate={{ x: item.is_available ? 22 : 2 }}
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#fff',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '2px'
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: '4px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.target.style.color = '#e5534b'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.2)'}
                    >
                      <span className="material-icons" style={{ fontSize: '18px' }}>delete</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EventsModule = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*, categories(name)')
        .or('is_special.eq.true,is_popular.eq.true,is_combo.eq.true');
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Highlights load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeHighlight = async (id, flag) => {
    const { error } = await supabase.from('menu_items').update({ [flag]: false }).eq('id', id);
    if (!error) fetchHighlights();
  };

  if (loading) return <div style={{ color: 'rgba(255,255,255,0.4)' }}>Loading summary...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Today's Special Section */}
        <HighlightCard 
          title="Today's Special" 
          icon="star" 
          items={items.filter(i => i.is_special)} 
          onRemove={(id) => removeHighlight(id, 'is_special')}
          color="#10a37f"
        />

        {/* Popular Items Section */}
        <HighlightCard 
          title="Popular Items" 
          icon="trending_up" 
          items={items.filter(i => i.is_popular)} 
          onRemove={(id) => removeHighlight(id, 'is_popular')}
          color="#ffc107"
        />

        {/* Combos Section */}
        <HighlightCard 
          title="Promo Combos" 
          icon="layers" 
          items={items.filter(i => i.is_combo)} 
          onRemove={(id) => removeHighlight(id, 'is_combo')}
          color="#9c27b0"
        />

      </div>
    </div>
  );
};

const HighlightCard = ({ title, icon, items, onRemove, color }) => (
  <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', padding: '24px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <span className="material-icons" style={{ color: color }}>{icon}</span>
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{title}</h3>
      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>{items.length} Active</span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', margin: 0, padding: '12px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px' }}>
          No {title} set
        </p>
      ) : (
        items.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{item.name}</p>
              <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>₹{item.price} • {item.categories?.name}</p>
            </div>
            <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', padding: '4px' }}>
              <span className="material-icons" style={{ fontSize: '16px' }}>close</span>
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);
const AnalyticsModule = () => <p>Analytics insights coming soon.</p>;
const SettingsModule = () => <p>Platform settings.</p>;
const BookingsModule = () => (
  <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
    <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Live Booking Feed</h3>
    <p style={{ color: 'rgba(255,255,255,0.4)' }}>Real-time bookings will appear here once the database is seeded.</p>
  </div>
);


// Helper Component: Add Item Drawer
const AddItemDrawer = ({ categories, onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: categories[0]?.id || '',
    is_veg: true,
    description: '',
    is_special: false,
    is_popular: false,
    is_combo: false,
    is_deliverable: true
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('menu_items').insert([formData]);
    if (!error) {
      onAdded();
      onClose();
    }
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        boxShadow: '-10px 0 50px rgba(0,0,0,0.5)',
        zIndex: 1000,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '800' }}>Add Dish</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <span className="material-icons">close</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>DISH NAME</label>
          <input 
            required
            type="text" 
            placeholder="e.g. Schezwan Chicken"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: '14px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>PRICE (₹)</label>
            <input 
              required
              type="number" 
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              style={{ padding: '14px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>VEG/NON-VEG</label>
            <select 
              value={formData.is_veg}
              onChange={(e) => setFormData({ ...formData, is_veg: e.target.value === 'true' })}
              style={{ padding: '14px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
            >
              <option value="true">Vegetarian</option>
              <option value="false">Non-Vegetarian</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>CATEGORY</label>
          <select 
            required
            value={formData.category_id}
            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            style={{ padding: '14px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name} ({cat.mode})</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>SPECIAL ATTRIBUTES</label>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.is_special} onChange={(e) => setFormData({ ...formData, is_special: e.target.checked })} />
              Special
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.is_popular} onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })} />
              Popular
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.is_combo} onChange={(e) => setFormData({ ...formData, is_combo: e.target.checked })} />
              Combo
            </label>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(16, 163, 127, 0.6)', margin: 0, lineHeight: '1.4' }}>
            💡 <strong>Combos:</strong> Add as a new item with special price & bundled description (e.g. Burger + Fries).
          </p>
        </div>

        <button 
          disabled={saving}
          type="submit" 
          style={{ 
            marginTop: '20px', 
            padding: '16px', 
            backgroundColor: 'var(--accent-color)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '12px', 
            fontWeight: '800', 
            fontSize: '16px',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? 'Creating Item...' : 'Add to Menu'}
        </button>
      </form>
    </motion.div>
  );
};


