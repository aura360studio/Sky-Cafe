import { useApp } from '../../core/context/AppContext';

export const HamburgerMenu = () => {
  const { isHamburgerOpen, setIsHamburgerOpen } = useApp();

  const links = [
    'Night Life', 'Events', 'Gallery', 'Location / Map', 
    'Contact', 'About', 'Delivery Info', 'Admin (Hidden)'
  ];

  if (!isHamburgerOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsHamburgerOpen(false)} style={{ zIndex: 998 }} />
      <div 
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '250px',
          backgroundColor: 'var(--surface-color)',
          borderLeft: '1px solid var(--border-color)',
          zIndex: 999,
          transform: isHamburgerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h3 style={{ margin: 0 }}>Menu</h3>
          <button className="icon-btn" onClick={() => setIsHamburgerOpen(false)}>&times;</button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {links.map(link => (
            <button 
              key={link} 
              onClick={() => setIsHamburgerOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                textAlign: 'left',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
