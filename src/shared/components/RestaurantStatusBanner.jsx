import { getRestaurantStatus } from '../../services/restaurantService';

export const RestaurantStatusBanner = () => {
  const status = getRestaurantStatus();

  let statusText = '';
  let statusColor = '';

  switch(status) {
    case 'online':
      statusText = 'We are Open Now';
      statusColor = '#4caf50'; // Green
      break;
    case 'closed':
      statusText = 'We are Closed Now';
      statusColor = '#9e9e9e'; // Grey
      break;
    case 'holiday':
      statusText = 'Today is Holiday';
      statusColor = '#ff9800'; // Orange
      break;
    case 'fullyBooked':
      statusText = 'Fully Booked Today';
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}40` }}></span>
        <span style={{ color: statusColor, fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.5px' }}>
          {statusText}
        </span>
      </div>
    </div>
  );
};
