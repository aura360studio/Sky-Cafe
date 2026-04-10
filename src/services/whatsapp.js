const WA_NUMBER = "917411116694"; // Configurable constant
export const WA_BUSINESS_NUMBER = "+91 74111 16694";
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

// --- Night Life & Bookings ---

export const generateTableBookingUrl = (data) => {
  const { name, phone, date, slot, guests, area } = data;
  let text = `*Table Booking – Sky Cafe* 🍽️\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Time Slot:* ${slot}\n*Number of People:* ${guests}\n*Preferred Area:* ${area}\n*Booking Type:* Table Booking`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateCandleLightUrl = (data) => {
  const { name, phone, date, slot, specialRequest } = data;
  let text = `*Candle Light Dinner Booking – Sky Cafe* 🏮\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Time Slot:* ${slot}\n*Special Request:* ${specialRequest || 'None'}`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateBirthdayBookingUrl = (data) => {
  const { name, phone, date, guests, decoration, cakeCutting } = data;
  let text = `*Birthday Celebration Booking – Sky Cafe* 🎂\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Number of Guests:* ${guests}\n*Decoration Required:* ${decoration}\n*Cake Cutting:* ${cakeCutting}`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateEventBookingUrl = (type, data) => {
  const { name, phone, date, guests, description } = data;
  let text = `*${type} Booking – Sky Cafe* ✨\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Guests:* ${guests}\n*Details:* ${description || 'N/A'}`;
  return BASE_URL + encodeURIComponent(text);
};

export const generateGeneralInquiryUrl = (subject) => {
  let text = `Hi, I have an inquiry about ${subject}.`;
  return BASE_URL + encodeURIComponent(text);
};

export const generatePrivateEventUrl = () => {
  let text = `Hi, I am interested in booking a private event at Sky Cafe.`;
  return BASE_URL + encodeURIComponent(text);
};

