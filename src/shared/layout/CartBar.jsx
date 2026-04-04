import { useApp, APP_PAGES, APP_MODES } from '../../core/context/AppContext';

export const CartBar = () => {
  const { mode, cartItemCount, cartTotal, setActivePage, activePage } = useApp();

  // Hide the bar if cart is empty, OR if we are ALREADY on the cart page!
  // Also hide if in NIGHT_LIFE mode
  if (cartItemCount === 0 || activePage === APP_PAGES.CART || mode === APP_MODES.NIGHT_LIFE) return null;

  return (
    <div className="cart-bar" onClick={() => setActivePage(APP_PAGES.CART)}>
      <span>{cartItemCount} Items | ₹{cartTotal.toFixed(2)}</span>
      <span>Confirm Order &gt;</span>
    </div>
  );
};
