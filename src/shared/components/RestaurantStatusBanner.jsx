import { getRestaurantStatus } from '../../services/restaurantService';
import { useApp, APP_MODES } from '../../core/context/AppContext';

export const RestaurantStatusBanner = () => {
  const status = getRestaurantStatus();
  const { customerName, tableNumber, mode } = useApp();

  let statusText = '';
  let statusColor = '';

  switch(status) {
    case 'online':
      statusText = 'Open Now';
      statusColor = '#4caf50'; // Green
      break;
    case 'closed':
      statusText = 'Closed Now';
      statusColor = '#9e9e9e'; // Grey
      break;
    case 'holiday':
      statusText = 'Today Holiday';
      statusColor = '#ff9800'; // Orange
      break;
    case 'fullyBooked':
      statusText = 'Fully Booked';
      statusColor = '#f44336'; // Red
      break;
    default:
      statusText = 'Status Unknown';
      statusColor = 'var(--text-secondary)';
      break;
  }

  return (
    <div style={{ background: 'var(--surface-color)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
      <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 'bold' }}>Welcome to Sky Cafe &amp; Kitchen</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>We are</span>
        <span style={{ 
          backgroundColor: `${statusColor}22`, 
          color: statusColor, 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '12px', 
          fontWeight: '800', 
          textTransform: 'uppercase',
          letterSpacing: '1px',
          border: `1px solid ${statusColor}44`,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            backgroundColor: statusColor,
            boxShadow: `0 0 8px ${statusColor}`
          }}></span>
          {statusText}
        </span>
      </div>

      {customerName && (
        <div style={{ 
          marginTop: '20px', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border-color)',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            Happy to serve you today!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }}>
            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent-color)' }}>
              {customerName}
            </span>
            {mode === APP_MODES.DINE_IN && tableNumber && (
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Occupied table no <strong style={{ color: 'var(--text-primary)' }}>{tableNumber}</strong>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
