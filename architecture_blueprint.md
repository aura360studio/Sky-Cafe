# 🏗️ Sky Cafe App Blueprint & Architecture

This document serves as the master blueprint for the Sky Cafe & Kitchen mobile web application. It outlines how the entire app is structured to work efficiently without a formal backend routing API right now, while being perfectly molded for a potential future migration to **Supabase**.

---

## 📂 1. Directory Structure (Feature-Based)
The application uses a **Feature-Based Architecture**, keeping distinct domain responsibilities encapsulated in an organized file tree.

```text
src/
├── core/                  # Core absolute application wrappers
│   └── context/           
│       └── AppContext.jsx # Global State Management (Mode, Cart, User Info)
├── data/                  # Static Data Tier (Future Supabase DB Simulation)
│   ├── menu.json          # Master menu mapping
│   ├── specials.json      # Populated combos, popular items, today's special
│   └── restaurant.json    # Time bounds, holidays, emergency offline flags
├── services/              # Pure Logic Layer (Future async API mappings)
│   ├── menuService.js     # Returns formatted menu categories/items
│   ├── specialsService.js # Returns populated specals arrays
│   ├── restaurantService.js # Time/Date boundary calculation logic
│   └── whatsapp.js        # Business logic for generating WhatsApp URIs
├── shared/                # Design System & UI Components Toolkit
│   ├── components/        
│   │   ├── Button.jsx     
│   │   ├── Card.jsx       
│   │   ├── Input.jsx      
│   │   ├── Modal.jsx      
│   │   ├── SectionTitle.jsx
│   │   ├── SpecialBanner.jsx
│   │   ├── MenuItemCard.jsx
│   │   ├── CategoryCard.jsx
│   │   └── RestaurantStatusBanner.jsx
│   └── layout/            # Scaffolding Elements
│       ├── MobileShell.jsx
│       ├── Header.jsx
│       ├── BottomNavigation.jsx
│       └── CartBar.jsx
├── features/              # Higher-Level Page Components (Screens)
│   └── pages/             
│       ├── HomeView.jsx       # The Dashboard
│       ├── MenuView.jsx       # The Browsing View
│       ├── CartView.jsx       # Checkout Manager
│       └── OrderSuccessView.jsx # Success Feedback
├── App.jsx                # Main Routing Hub
├── index.css              # Global Design Tokens (Colors, Typography, Modes)
└── index.html             # Entry point (Imports Material Icons CDN)
```

---

## 🧠 2. Core State Management (`AppContext.jsx`)

Since this is a client-side PWA, `AppContext` serves as the pseudo-backend database mimicking a user login session. It uses React's Context API to expose a massive state payload globally to any component that hooks `useApp()`. 

**Key Context Variables Tracked:**
- **Mode Tracking**: `mode` (DINE_IN, DELIVERY, NIGHT_LIFE). Dictates the rendering shape of virtually every other screen via conditional `switch` statements.
- **Page Routing**: `activePage` acts as a static Router to instantly swap the visible Screen without loading screens.
- **Order Pipeline**: `cartItems`, `cartTotal`, `addToCart()`, `removeFromCart()`. 
- **Session Bills**: `sessionOrders`, `syncSessionOrders()`, saving to the device's native browser `localStorage` silently so that running Dine-In bills survive phone refreshes.
- **User Metadata**: `customerName`, `tableNumber`, `location`.

---

## 🛠️ 3. The Services Layer (`src/services/`)

To prevent UI components from becoming bloated and to make backend migration easy, the app strictly segregates data access and formatting into pure javascript services. 

- **How it works:** Whenever a UI Screen needs data (e.g., `HomeView` needs "Popular Items"), it does NOT import `specials.json` directly. Instead, it calls `getPopularItems()` from `specialsService.js`. 
- **Why this matters for your manual coding:** When you eventually connect Supabase, you do absolutely **zero** work to `HomeView.jsx`. You only change `getPopularItems()` inside `specialsService.js` to run a database `fetch()` instead of reading the JSON. The UI will instantly absorb it.

---

## 📱 4. UI / Component Strategy (`src/shared/components/`)

The application embraces **Dumb Components**. Components like `<Button />` or `<Card />` hold zero business logic. They accept generic data (props) and render them.  

**Material Design 3 (Pixel Style)**
- **BottomNavigation**: Dynamically swaps out its four core buttons depending on the global `mode`. 
- **Icons**: Uses Google Material Icons via a CDN script in `index.html`. 
- **CSS Architecture**: `index.css` acts as the master Design Token layer mapping root CSS variables (e.g., `--accent-color: #10a37f`). If you ever need to change the brand color of Sky Cafe, you change one line in `index.css`, replacing it everywhere.

---

## 🚦 5. The Routing Logic (`App.jsx`)

The Sky Cafe app does not utilize React Router or any external routing dependencies. 

Because it is a snappy "Mobile App Shell", `App.jsx` handles routing by wrapping everything in `MobileShell` and rendering the specific `<View />` child dynamically based on the string variable stored in `activePage`. 

```javascript
// Extremely simple Pseudo-Routing
{activePage === APP_PAGES.HOME && <HomeView />}
{activePage === APP_PAGES.MENU && <MenuView />}
{activePage === APP_PAGES.CART && <CartView />}
```

This prevents ugly page loads and keeps the bottom navigation locked into the viewport perfectly at all times.

---

## 🛒 6. The Cart & WhatsApp Checkout Flow

The critical checkout architecture runs seamlessly through WhatsApp.

1. User clicks **Add to Cart** on `<MenuItemCard />` in the `MenuView`.
2. Action triggers `addToCart()` globally in `AppContext`.
3. User opens `<CartView />`. The UI loops through `cartItems` to display line totals.
4. User clicks **"Send Secure WhatsApp Order"**.
5. `CartView` intercepts the action, verifies Name/Table, and passes all `cartItems` arrays down into `generateDineInUrl()` sitting in `src/services/whatsapp.js`.
6. `whatsapp.js` maps over the arrays, formats a clean human-readable text string, URI-encodes it, and appends it to a global WhatsApp business phone number.
7. `CartView` opens that external URL, jumping the user to their native WhatsApp application.
8. Component immediately sets active mode to `ORDER_SUCCESS` and commits the items to the `localStorage` Session Bill before clearing the unsent Cart variables.
