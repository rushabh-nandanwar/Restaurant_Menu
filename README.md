# Nandu Saoji Bhojnalaya 🌶️
### *Authentic Saoji Tradition Since 2008*

A premium, highly-interactive digital menu experience built for Nandu Saoji Bhojnalaya. Designed with a cinematic dark aesthetic, glassmorphism, and seamless ordering flows.

---

## ✨ Key Features

- **🎬 Cinematic Multi-Stage Experience**: A smooth transition from an immersive landing page to a 3-column category grid, followed by an interactive menu display.
- **🛒 Smart Order System**: A real-time cart/list system with quantity controls and a breakdown of the final order (tax, subtotal).
- **📱 Ultra-Responsive Design**: Optimised for every device. Features a unique 3-column category grid on mobile and bento-box item layouts.
- **🔍 Intelligent Filtering**: Instant search and category-based filtering (Papad, Roti, Chicken, Thali, etc.) for a frictionless user journey.
- **💎 Premium Aesthetics**: Rich dark mode, orange-to-red gradients, glassmorphism, and subtle micro-animations using Tailwind CSS v4 and Framer-like transition effects.
- **🔗 Deep Navigation**: Smart linking that remembers your position, allowing you to jump from Checkout directly back to the active menu items.

---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React context API (CartContext)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Typography**: Inter (Modern Sans-Serif)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rushabh-nandanwar/Restaurant_Menu.git
   cd restaurantMenu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
src/
├── Components/
│   └── Menu/
│       ├── Menu.jsx           # Main orchestrator (Landing, Categories, Items)
│       ├── MenuItem.jsx       # Individual dish cards
│       ├── CategoryFilter.jsx # Pill-based horizontal filters
│       └── CartList.jsx       # Floating cart (Mobile) & Sidebar (Desktop)
├── Pages/
│   └── Checkout.jsx           # Order summary & Checkout experience
├── context/
│   └── CartContext.jsx        # Global cart state management
├── data/
│   └── menuItems.js           # Digital menu catalog (Prices, Images, Categories)
└── index.css                  # Custom animations and global styles
```

---

## 📸 Branding

The digital menu incorporates the official **NSB Logo** and follows the heritage established by Nandu Saoji Bhojnalaya. Every color and shadow is crafted to reflect the spice and vibrancy of Saoji cuisine.

---

## 👤 Credits

Developed with ❤️ for **Nandu Saoji Bhojnalaya**.
*Copyright © 2025 - All Rights Reserved.*
