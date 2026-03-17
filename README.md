# 🏃 Hempel Sports Manufacturing

**Premium B2B Manufacturer of Performance Sportswear, Tracksuits, and Athletic Apparel.**

Hempel Sports is a high-performance digital platform designed for a global manufacturing brand. It bridges the gap between premium product showcase and confidential B2B manufacturing partnerships through a streamlined, high-aesthetic user interface.

---

## ✨ Key Features

- **🏆 Comprehensive Product Showcase**: Dedicated sections for Tracksuits, Jackets, Hoodies, and other athletic apparel.
- **📝 Smart Quotation System**: A high-delivery-rate B2B request system featuring:
  - Multi-category selection with immediate visual feedback.
  - Dark-themed premium benefits sidebar with "Rapid Turnaround" and "NDA Policy" highlights.
  - Sticky context sidebar for enhanced desktop UX.
- **🛡️ Secure Admin Panel**: A private, PIN-gated dashboard for managing categories, subcategories, and product inventory.
- **⚡ High-Performance Architecture**: Built with Next.js 15+ and React 19, ensuring blazing fast load times and SEO optimization.
- **🎨 Premium Athletic Aesthetic**: Featuring a modern sportswear theme with dynamic colors and professional design.

---

## 🛠️ Tech Stack

- **Core**: [Next.js 15+](https://nextjs.org/) (App Router)
- **UI & Animation**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Media**: [Cloudinary](https://cloudinary.com/) (for high-optimization asset delivery)
- **Communication**: [Nodemailer](https://nodemailer.com/) (for quotation email automation)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone <repository-url>
cd hempel-sports
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory and populate it with the following:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Cloudinary Config
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Access
ADMIN_PIN=your_secure_pin_here

# Email (Nodemailer)
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## 📂 Project Structure

- `src/app/(site)` - Public-facing website pages (Home, Quote, About, Contact).
- `src/app/(admin)` - Secure admin panel routes.
- `src/components` - Reusable UI components (Quotation Forms, Stat Cards, Navbar).
- `src/data` - Static site configuration and category definitions.
- `src/models` - Mongoose database schemas.
- `src/store` - zustand stores for global application state.

---

## 🛡️ License

Confidential and Private. All rights reserved by **Hempel Sports Manufacturing**.
