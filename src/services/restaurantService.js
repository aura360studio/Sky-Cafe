import restaurantData from '../data/restaurant.json';

export const getRestaurantStatus = () => {
  const now = new Date();
  
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  if (restaurantData.holidays?.includes(todayStr)) {
    return 'holiday';
  }

  if (restaurantData.fullyBooked) {
    return 'fullyBooked';
  }

  if (restaurantData.manualOffline) {
    return 'closed';
  }

  const currentHours = now.getHours();
  const currentMins = now.getMinutes();
  const currentTimeVal = currentHours * 60 + currentMins;

  const [opH, opM] = restaurantData.openingTime.split(':').map(Number);
  const openTimeVal = opH * 60 + (opM || 0);

  const [clH, clM] = restaurantData.closingTime.split(':').map(Number);
  const closeTimeVal = clH * 60 + (clM || 0);

  if (openTimeVal > closeTimeVal) {
     if (currentTimeVal >= openTimeVal || currentTimeVal < closeTimeVal) {
        return 'online';
     }
  } else {
     if (currentTimeVal >= openTimeVal && currentTimeVal < closeTimeVal) {
        return 'online';
     }
  }

  return 'closed';
};
