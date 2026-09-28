# Inthugil.in — Women's Affordable Elegant Clothing

A luxury, high-conversion fullstack eCommerce website crafted for **Inthugil.in**, designed for everyday grace, honest pricing, and **ultra-easy maintenance**.

---

## 🌸 Features & Highlights

### 1. High-Fashion Boutique Experience
- **Luxury Color Palette:** Terracotta Rose (`#C46E63`), Warm Sand (`#FAF8F5`), Deep Regal Mulberry (`#2A1A22`), and Brass Gold accents (`#DFC27D`).
- **Editorial Typography:** High-fashion serif headlines (*Playfair Display*) paired with clean, readable sans-serif (*Plus Jakarta Sans*).
- **Curated Catalog:** Pre-seeded with Kurtis, Sarees, Western Midi Dresses, Co-ord Sets, and Cloud-Soft Loungewear.
- **Indian Pricing & Sizing:** Native INR (`₹`) formatting, Indian standard sizes (`XS`, `S`, `M`, `L`, `XL`, `XXL`), and an interactive Size Guide modal with inches and centimeters.
- **Slide-Over Cart Drawer:** Real-time free delivery progress bar (*"Add ₹X more to get FREE Delivery!"*), quantity adjusters, and promo code support (`ELEGANCE10` for 10% off).

### 2. Complete Maintenance CMS Studio (`/admin`)
Designed specifically so the store owner can maintain and update the entire website with **zero coding required**:
- **Products Manager:** Add, edit, or delete items. Adjust selling prices, original prices (auto-calculates % discount), stock levels, size chips, fabric details, care instructions, and upload photos.
- **Orders Manager:** View all orders with full customer address, phone number, and items. Update status with 1 click: `Placed` → `Confirmed` → `Shipped` → `Delivered` → `Cancelled`. Assign courier tracking numbers (Delhivery, Bluedart, etc.).
- **Website Customizer:** Edit the top announcement bar ticker text, hero banner headlines and images, free shipping threshold (default ₹799), and customer support contacts.
- **SEO & Google Search Preview:** Live Google Search snippet simulator to preview meta tags, with instant links to the dynamic `sitemap.xml` and `robots.txt`.
- **Customer Inquiries:** Review messages sent from the Contact Us form.

### 3. Complete SEO Architecture
- **Keywords Targeted:** *affordable women's clothing online India*, *elegant women's dresses online*, *budget ethnic wear for women*, *cheap kurtis online India*.
- **Dynamic Meta Titles & Descriptions:** Matches all 7 sections of the Inthugil SEO specifications.
- **Clean URL Structure:** `/ethnic-wear`, `/western-wear`, `/loungewear`, `/new-arrivals`, `/product/:slug`, `/about-us`, `/contact-us`, `/track-order`.
- **Dynamic XML Sitemap:** Automatically generated at `http://localhost:5000/sitemap.xml` listing all pages and product slugs with `<lastmod>` and `<priority>`.
- **Robots.txt:** Generated at `http://localhost:5000/robots.txt` protecting cart/checkout and directing search crawlers to the sitemap.
- **JSON-LD Schema Markup:**
  - `ClothingStore` Organization Schema on Homepage
  - `Product` Schema on every product page (price in INR, in-stock availability, brand, aggregate ratings)
  - `BreadcrumbList` Schema
  - `FAQPage` Schema on Contact page

### 4. Payments (India)
- **Razorpay Integration:** Full support for UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), and Net Banking.
- **Cash on Delivery (COD):** Built-in COD option with customizable handling fee.
- **Self-Service Order Tracking:** Customers can track parcels at `/track-order` using their order number (e.g., `INTH-84920`) or mobile number.

---

## 🚀 How to Run the Website

### Option A: One-Click Launch (Recommended for Windows)
Simply double-click the included batch file:
```cmd
start.bat
```
This boots the server on `http://localhost:5000` and automatically opens your default browser!

### Option B: Development Mode (With Hot Reload)
Run the dev launcher:
```cmd
start-dev.bat
```
Or manually in two terminals:
```bash
# Terminal 1: Backend API
cd inthugil/server
node index.js

# Terminal 2: Frontend with Vite Hot Reload
cd inthugil/client
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🔐 Admin CMS Login Credentials

- **Portal URL:** `http://localhost:5000/admin` (or `http://localhost:3000/admin`)
- **Default Email:** `admin@inthugil.in`
- **Default Password:** `admin123`

*(You can change these credentials anytime in `server/.env`)*

---

## 🗄️ Database Architecture

The backend includes a **Zero-Setup Dual-Mode Persistence Engine**:
1. **Out-of-the-Box Local Mode:** All changes (new products, modified prices, customer orders, settings) automatically persist to `server/data/store.json`. No external database installation needed!
2. **MongoDB Atlas Mode:** Add your MongoDB connection string in `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/inthugil?retryWrites=true&w=majority
   ```
3. **Supabase / PostgreSQL Mode:** Add your database URL in `server/.env`:
   ```env
   DATABASE_URL=postgresql://postgres:<password>@db.supabase.co:5432/postgres
   ```

---

## 💳 Connecting Live Razorpay & Cloudinary

Open `server/.env` (or create it from `server/.env.example`):

### 1. Razorpay (Live UPI & Card Payments)
Get your API keys from [dashboard.razorpay.com](https://dashboard.razorpay.com/app/keys):
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
```

### 2. Cloudinary (Automatic WebP Image Optimization)
Get your credentials from [cloudinary.com](https://cloudinary.com):
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🌐 Deploying to Production

### Deploy Frontend to Vercel
1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the root directory to `inthugil/client`.
4. Deploy!

### Deploy Backend to Railway or Render
1. Create a new service on [Railway](https://railway.app) or [Render](https://render.com).
2. Set the root directory to `inthugil/server`.
3. Add environment variables from `.env.example`.
4. Command: `npm start`.

---

## 📄 License
© 2026 Inthugil.in — All Rights Reserved.
