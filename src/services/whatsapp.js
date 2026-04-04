const WA_NUMBER = "917411116694"; // Configurable constant
const BASE_URL = `https://wa.me/${WA_NUMBER}?text=`;

export const generateDineInUrl = (cartItems, customerName, tableNumber, cartTotal) => {
  let text = `*NEW DINE-IN ORDER* 🍽️\n*Name:* ${customerName}\n*Table:* ${tableNumber}\n------------------------\n`;
  cartItems.forEach(item => {
    text += `${item.quantity}x ${item.title} - ₹${item.lineTotal.toFixed(2)}\n`;
  });
  text += `------------------------\n*Total:* ₹${cartTotal.toFixed(2)}\n`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateDeliveryUrl = (cartItems, customerName, cartTotal) => {
  let text = `*NEW DELIVERY ORDER* 🛵\n*Name:* ${customerName}\n------------------------\n`;
  cartItems.forEach(item => {
    text += `${item.quantity}x ${item.title} - ₹${item.lineTotal.toFixed(2)}\n`;
  });
  text += `------------------------\n*Total:* ₹${cartTotal.toFixed(2)}\n`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateNightlifeUrl = (service, slot, guests) => {
  let text = `*NEW NIGHT LIFE BOOKING* 🥂\n*Package:* ${service.title}\n*Slot:* ${slot}\n*Guests:* ${guests}\n`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateCallWaiterUrl = (customerName, tableNumber) => {
  let text = `🛎️ *PING: Waiter Requested!*\n*Name:* ${customerName}\n*Table:* ${tableNumber}\n\nPlease attend to this table promptly.`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateRequestBillUrl = (customerName, tableNumber) => {
  let text = `🧾 *PING: Bill Requested!*\n*Name:* ${customerName}\n*Table:* ${tableNumber}\n\nPlease bring the final bill to this table.`;
  return BASE_URL + encodeURIComponent(text);
};
