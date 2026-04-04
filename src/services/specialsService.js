import specialsData from '../data/specials.json';

// In the future, these will become async:
// export const getTodaysSpecial = async () => await fetch('/api/specials/today');

export const getTodaysSpecial = () => specialsData.todaysSpecial || null;
export const getPopularItems = () => specialsData.popularItems || [];
export const getPromoCombos = () => specialsData.promoCombos || [];
