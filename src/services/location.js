/**
 * Calculates the Haversine distance between two points on the Earth.
 * @param {number} lat1 Latitude of first point
 * @param {number} lon1 Longitude of first point
 * @param {number} lat2 Latitude of second point (Cafe)
 * @param {number} lon2 Longitude of second point (Cafe)
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Estimates delivery cost based on distance tiers.
 * @param {number} distance in km
 * @returns {Object} range string and est time
 */
export const getDeliveryEstimate = (distance) => {
  if (distance <= 3) return { range: "₹40 - ₹50", time: "20-30 min" };
  if (distance <= 6) return { range: "₹60 - ₹80", time: "30-45 min" };
  if (distance <= 10) return { range: "₹90 - ₹120", time: "45-60 min" };
  return { range: "₹150+", time: "60+ min (Out of regular zone)" };
};
