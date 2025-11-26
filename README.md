# 🚀 NexaTech - Modern E-Commerce Platform

<div align="center">

![NexaTech Logo](https://img.shields.io/badge/NexaTech-E--Commerce-blue?style=for-the-badge&logo=react)

**A cutting-edge e-commerce platform for tech enthusiasts built with Next.js 16 and Express.js**

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://nexa-tech-zeta.vercel.app/)
[![GitHub](https://img.shields.io/badge/github-backend-black?style=for-the-badge&logo=github)](https://github.com/TusharChow20/project-Nexa-Tech-Server)

[Features](#-features) • [Installation](#-installation) • [Routes](#-routes) • [Tech Stack](#-tech-stack) • [License](#-license)

</div>

---

## 📖 About The Project

**NexaTech** is a full-stack e-commerce application designed for selling tech products with a modern, responsive UI. Built with Next.js 16 and powered by an Express.js backend, it offers seamless user authentication, product management, and a delightful shopping experience.

### ✨ Key Highlights

- 🔐 **Secure Authentication** - NextAuth.js with credentials & Google OAuth
- 🛍️ **Product Management** - Full CRUD operations for products
- 🎨 **Modern UI/UX** - DaisyUI + Tailwind CSS with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Performance** - Next.js 16 with React 19
- 🔔 **Toast Notifications** - Real-time user feedback with React Toastify
- 🌐 **RESTful API** - Express.js backend with MongoDB

---

## 🎯 Features

### User Features
- ✅ User registration and authentication (email/password & Google)
- ✅ Profile management with avatar support
- ✅ Browse products with detailed views
- ✅ Search and filter products
- ✅ Responsive navigation with user dropdown

### Product Management
- ✅ Add new products (authenticated users)
- ✅ Update existing products
- ✅ Delete products
- ✅ Image preview for products
- ✅ Priority and date metadata

### UI/UX Features
- ✅ Beautiful gradient designs
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling
- ✅ Toast notifications for user actions
- ✅ Mobile-first responsive design

---

## 🛠️ Tech Stack

### Frontend
```
├── Next.js 16.0.3          # React framework
├── React 19.2.0            # UI library
├── NextAuth.js 4.24.13     # Authentication
├── Tailwind CSS 4.x        # Styling
├── DaisyUI 5.5.5           # UI components
├── Lucide React 0.554.0    # Icons
├── React Toastify 11.0.5   # Notifications
├── Axios 1.13.2            # HTTP client
└── Swiper 12.0.3           # Carousels
```

### Backend
```
├── Express.js              # Node.js framework
├── MongoDB                 # Database
├── Mongoose 9.0.0          # ODM
└── bcryptjs 3.0.3          # Password hashing
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1️⃣ Clone the Repositories

```bash
# Clone Frontend
git clone <your-frontend-repo-url>
cd nexatech-frontend

# Clone Backend
git clone https://github.com/TusharChow20/project-Nexa-Tech-Server
cd project-Nexa-Tech-Server
```

### 2️⃣ Backend Setup

```bash
cd project-Nexa-Tech-Server

# Install dependencies
npm install

# Create .env file
touch .env
```

**Backend `.env` Configuration:**
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

```bash
# Start backend server
npm run dev
# Server runs on http://localhost:4000
```

### 3️⃣ Frontend Setup

```bash
cd nexatech-frontend

# Install dependencies
npm install

# Create .env.local file
touch .env.local
```

**Frontend `.env.local` Configuration:**
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:4000
```

```bash
# Start development server
npm run dev
# App runs on http://localhost:3000
```

### 4️⃣ Build for Production

```bash
# Frontend
npm run build
npm start

# Backend
npm start
```

---

## 🗺️ Routes

### 🌐 Frontend Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Home page with featured products | ❌ |
| `/login` | Login & Registration page | ❌ |
| `/products` | Browse all products | ❌ |
| `/products/[id]` | Individual product details | ❌ |
| `/services` | Services information | ❌ |
| `/about` | About page | ❌ |
| `/contact` | Contact page | ❌ |
| `/dashboard` | User dashboard | ✅ |
| `/add-product` | Add new product | ✅ |
| `/manage-products` | Manage user's products | ✅ |
| `/update-product/[id]` | Edit product | ✅ (Owner) |

### 🔌 Backend API Endpoints

#### Authentication
```
POST   /api/register          # Register new user
POST   /api/login             # User login
POST   /api/userExits         # Check if user exists
```

#### Products
```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (Auth)
PUT    /api/products/:id      # Update product (Auth + Owner)
DELETE /api/products/:id      # Delete product (Auth + Owner)
```

#### User
```
GET    /api/user/products     # Get user's products (Auth)
GET    /api/user/profile      # Get user profile (Auth)
PUT    /api/user/profile      # Update user profile (Auth)
```

---

## 📁 Project Structure

```
nexatech-frontend/
├── src/
│   ├── app/
│   │   ├── (root)/
│   │   │   ├── page.jsx                 # Home page
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── services/
│   │   │   │   └── page.jsx             # Services page
│   │   │   └── products/
│   │   │       ├── page.jsx             # Products listing
│   │   │       └── [id]/
│   │   │           └── page.jsx         # Product details
│   │   ├── login/
│   │   │   └── page.jsx                 # Auth page
│   │   ├── dashboard/
│   │   ├── add-product/
│   │   ├── manage-products/
│   │   └── update-product/
│   │       └── [id]/
│   │           └── page.jsx             # Update product
│   ├── Component/
│   │   ├── Navbar.jsx                   # Navigation bar
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── FeaturedProduct.jsx
│   │   ├── LoginPage.jsx                # Login/Register form
│   │   └── ...
│   ├── models/
│   │   └── User.js                      # Mongoose User model
│   └── ...
├── public/
├── .env.local
├── package.json
└── tailwind.config.js
```

---

## 🎨 Component Highlights

### 🔐 LoginPage Component
- Dual-mode authentication (Login/Register)
- Email/Password authentication
- Google OAuth integration
- Real-time form validation
- Toast notifications
- Auto-login after registration
- Password visibility toggle

### 🧭 Navbar Component
- Responsive design
- User avatar with dropdown
- Dynamic menu based on auth state
- Mobile hamburger menu
- User info display
- Quick links to dashboard and products

### ✏️ UpdateProduct Component
- Pre-filled form with existing data
- Image preview functionality
- Authorization checks
- Loading and submitting states
- Toast notifications
- Redirect after successful update

### 🎯 Services Component
- 6 Service cards with gradients
- Icon-based features
- Responsive grid layout
- CTA section
- Service hours information

---

## 🔧 Configuration

### Tailwind + DaisyUI Setup

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
```

### NextAuth Configuration

```javascript
// src/app/api/auth/[...nextauth]/route.js
export const authOptions = {
  providers: [
    CredentialsProvider({
      // Credentials configuration
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Additional NextAuth configuration
}
```

---

## 🌟 Features Showcase

### Authentication Flow
```
1. User visits /login
2. Chooses email/password or Google OAuth
3. Form validation and submission
4. Backend verifies credentials
5. JWT token generation
6. NextAuth session creation
7. Redirect to homepage with toast notification
```

### Product Management Flow
```
1. User navigates to /add-product
2. Fills product details with image URL
3. Form validation
4. API call to create product
5. Success toast + redirect to product page
6. Product appears in /products and user's dashboard
```

---

## 📝 Environment Variables

### Required Frontend Variables
```env
NEXTAUTH_URL=                # Your app URL
NEXTAUTH_SECRET=             # Random secret key
GOOGLE_CLIENT_ID=            # Google OAuth ID (optional)
GOOGLE_CLIENT_SECRET=        # Google OAuth Secret (optional)
NEXT_PUBLIC_API_URL=         # Backend API URL
```

### Required Backend Variables
```env
PORT=                        # Server port (default: 4000)
MONGODB_URI=                 # MongoDB connection string
JWT_SECRET=                  # JWT signing secret
CORS_ORIGIN=                 # Frontend URL for CORS
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "Cannot connect to backend"**
```bash
# Solution: Check if backend is running
cd project-Nexa-Tech-Server
npm run dev
```

**Issue: "NextAuth session error"**
```bash
# Solution: Verify NEXTAUTH_SECRET is set
echo $NEXTAUTH_SECRET
# Generate new secret if needed
openssl rand -base64 32
```

**Issue: "MongoDB connection failed"**
```bash
# Solution: Check MongoDB URI in .env
# Ensure MongoDB service is running
# Verify network access in MongoDB Atlas
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Already deployed at
https://nexa-tech-zeta.vercel.app/

# For your own deployment
vercel --prod
```

### Backend (Railway/Render)
```bash
# Push to GitHub
git push origin main

# Connect repository to Railway/Render
# Set environment variables
# Deploy automatically
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Tushar Chowdhury**

- GitHub: [@TusharChow20](https://github.com/TusharChow20)
- Live Demo: [nexa-tech-zeta.vercel.app](https://nexa-tech-zeta.vercel.app/)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/TusharChow20/project-Nexa-Tech-Server/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

## 📞 Support

For support, email your-email@example.com or join our Slack channel.

---

<div align="center">

**Made with ❤️ and ☕ by Tushar Chowdhury**

[![GitHub followers](https://img.shields.io/github/followers/TusharChow20?style=social)](https://github.com/TusharChow20)

</div>