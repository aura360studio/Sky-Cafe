import { useState, useEffect } from 'react';
import { useApp, APP_MODES } from '../../core/context/AppContext';
import { CategoryCard } from '../../shared/components/CategoryCard';
import { MenuItemCard } from '../../shared/components/MenuItemCard';
import { SectionTitle } from '../../shared/components/SectionTitle';
import { getDineInCategories, getDeliveryCategories, getDineInItems, getDeliveryItems } from '../../services/menuService';

export const MenuView = () => {
  const dineInCategories = getDineInCategories();
  const deliveryCategories = getDeliveryCategories();
  const dineInItems = getDineInItems();
  const deliveryItems = getDeliveryItems();

  const { mode, addToCart } = useApp();

  const isDelivery = mode === APP_MODES.DELIVERY;
  const activeCategories = isDelivery ? deliveryCategories : dineInCategories;
  const activeItems = isDelivery ? deliveryItems : dineInItems;

  const [activeCat, setActiveCat] = useState(activeCategories[0]?.id);
  const [vegOnly, setVegOnly] = useState(false);

  // Reset active category when changing modes
  useEffect(() => {
    setActiveCat(activeCategories[0]?.id);
  }, [mode, activeCategories]);

  if (mode === APP_MODES.NIGHT_LIFE) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h3>Menu Unavailable</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Food ordering is handled directly through table service during Night Life events. Switch to Dine In, or check out Bookings!</p>
      </div>
    );
  }

  const filteredItems = activeItems.filter(item => 
    item.categoryId === activeCat && (!vegOnly || item.isVegetarian)
  );

  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SectionTitle title={isDelivery ? "Delivery Menu" : "Dine In Menu"} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer', background: 'var(--surface-color)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          <input type="checkbox" checked={vegOnly} onChange={() => setVegOnly(!vegOnly)} style={{ accentColor: '#4caf50', cursor: 'pointer' }} />
          <span style={{ fontWeight: vegOnly ? 'bold' : 'normal', color: vegOnly ? '#4caf50' : 'inherit' }}>🟢 Veg Only</span>
        </label>
      </div>
      
      <div className="tabs-container" style={{ margin: '0 -16px 20px', padding: '0 16px' }}>
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
