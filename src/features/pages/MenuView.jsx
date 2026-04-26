import { useState, useEffect, useMemo, useRef } from 'react';
import { useApp, APP_MODES } from '../../core/context/AppContext';
import { CategoryCard } from '../../shared/components/CategoryCard';
import { MenuItemCard } from '../../shared/components/MenuItemCard';
import { SectionTitle } from '../../shared/components/SectionTitle';


export const MenuView = () => {
  const { mode, addToCart, menuData, isDataLoading } = useApp();
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const isDelivery = mode === APP_MODES.DELIVERY;
  
  // Memoize categories to prevent the 'snap-back' bug when clicking
  const activeCategories = useMemo(() => {
    return menuData.categories.filter(cat => {
      // A category is active in this mode if it has items that are valid for this mode
      return menuData.items.some(item => 
        item.categoryId === cat.id && 
        (isDelivery ? item.isDeliverable : true)
      );
    });
  }, [menuData, isDelivery]);

  const activeItems = menuData.items;

  const [activeCat, setActiveCat] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);

  // Drag to scroll logic
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Initialize active category once data is loaded
  useEffect(() => {
    if (activeCategories.length > 0 && !activeCat) {
      setActiveCat(activeCategories[0].id);
    }
  }, [activeCategories, activeCat]);


  // Reset active category ONLY when changing modes
  useEffect(() => {
    if (activeCategories.length > 0) {
      setActiveCat(activeCategories[0].id);
    }
  }, [mode]); // Removed activeCategories from dependency to stop resetting on every render

  if (isDataLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <div className="loader"></div>
      </div>
    );
  }

  if (mode === APP_MODES.NIGHT_LIFE) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h3>Menu Unavailable</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Food ordering is handled directly through table service during Night Life events. Switch to Dine In, or check out Bookings!</p>
      </div>
    );
  }

  const filteredItems = activeItems.filter(item => {
    const matchesCategory = item.categoryId === activeCat;
    const matchesVeg = !vegOnly || item.isVegetarian;
    const matchesDelivery = !isDelivery || item.isDeliverable;
    return matchesCategory && matchesVeg && matchesDelivery;
  });


  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SectionTitle title={isDelivery ? "Delivery Menu" : "Dine In Menu"} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer', background: 'var(--surface-color)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <input type="checkbox" checked={vegOnly} onChange={() => setVegOnly(!vegOnly)} style={{ accentColor: '#4caf50', cursor: 'pointer' }} />
          <span style={{ fontWeight: vegOnly ? 'bold' : 'normal', color: vegOnly ? '#4caf50' : 'inherit' }}>🟢 Veg Only</span>
        </label>
      </div>
      
      <div 
        className="tabs-container" 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ 
          margin: '0 -16px 20px', 
          padding: '0 16px',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
      >
        {activeCategories.map(cat => (
          <CategoryCard 
            key={cat.id} 
            category={cat} 
            isActive={activeCat === cat.id}
            onClick={() => setActiveCat(cat.id)}
          />
        ))}
      </div>
      
      <div style={{ paddingBottom: '70px' }}>
        {filteredItems.map(item => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            onAdd={(item) => addToCart(item, 1)}
          />
        ))}
        {filteredItems.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '40px' }}>No items found in this section.</p>}
      </div>
    </div>
  );
};
