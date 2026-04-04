import menuData from '../data/menu.json';

// In the future, these will become async:
// export const getDineInMenu = async () => await fetch('/api/menu/dine-in');

export const getDineInCategories = () => menuData.dineInCategories || [];
export const getDeliveryCategories = () => menuData.deliveryCategories || [];

export const getDineInItems = () => menuData.dineInItems || [];
export const getDeliveryItems = () => menuData.deliveryItems || [];
