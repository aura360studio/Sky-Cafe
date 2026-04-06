import slotsData from '../data/bookingSlots.json';

export const getSlotsByDate = (dateString) => {
  return slotsData[dateString] || [];
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'available': return 'Available';
    case 'few': return 'Few Tables Left';
    case 'full': return 'Full';
    case 'closed': return 'Not Available';
    default: return 'No Slots Found';
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'available': return '#4caf50'; // Green
    case 'few': return '#ff9800';      // Orange
    case 'full': return '#f44336';      // Red
    case 'closed': return '#9e9e9e';    // Grey
    default: return 'var(--text-secondary)';
  }
};

export const isDateAllowed = (date, bookingType) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  if (bookingType === 'dine-in-table') {
    // Only today and tomorrow
    return targetDate.getTime() === today.getTime() || targetDate.getTime() === tomorrow.getTime();
  }
  
  // Future allowed for others
  return targetDate.getTime() >= today.getTime();
};
