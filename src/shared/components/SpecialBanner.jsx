import { useApp } from '../../core/context/AppContext';

export const SpecialBanner = ({ special }) => {
  const { addToCart } = useApp();
  
  if (!special) return null;
  return (
    <div className="special-banner" style={{ position: 'relative' }}>
      <div className="banner-content">
        <span className="banner-badge">Today's Special</span>
        <h3>{special.title}</h3>
        <p>{special.description}</p>
        <button onClick={() => addToCart(special)} style={{ marginTop: '8px', background: 'var(--text-primary)', color: 'var(--surface-color)', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
          Add for ₹{special.price}
        </button>
      </div>
      {special.image && <img src={special.image} alt="Special" className="banner-img" />}
    </div>
  );
};
