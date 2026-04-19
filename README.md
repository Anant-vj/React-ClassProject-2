# 🚀 SmartJob - The Ultimate Job Search Hub

**SmartJob** is a premium, high-performance job application tracker designed for modern job seekers. Built with a stunning glassmorphism aesthetic, it provides intuitive tools to manage your career journey, from initial application to final offer.

![SmartJob Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?mx-auto&w=1200&q=80) 

---

## ✨ Key Features

### 📊 Dynamic Dashboard
Get a high-level overview of your job search progress.
- **Real-time Stats**: Track Total Applications, Interviewing, Offers, and Rejections at a glance.
- **Upcoming Interviews**: Integrated countdown for your scheduled interviews.
- **Recent Activity**: Quick access to your latest 4 job applications.

### 💼 Career Pipeline Management
Full CRUD (Create, Read, Update, Delete) for your job applications.
- **Detailed Tracking**: Record role, company, platform, status, salary, location, and key dates.
- **Smart Filtering**: Filter by status (Applied, Interviewing, Offer, Rejected) or bookmarks.
- **Advanced Search**: Instant search by company name or role with debounced input.
- **Sorting & Filtering**: Sort by Date, Salary, or Company in ascending/descending order. Filter by platform (LinkedIn, Indeed, etc.) or location type (Remote, Hybrid, On-site).

### 📈 Powerful Analytics
Data-driven insights to optimize your search.
- **Pipeline Breakdown**: Visual pie charts showing your status distribution.
- **Timeline Analysis**: Bar charts tracking your application frequency over the last 6 months.
- **Success Metrics**: Automatic calculation of your Offer Rate and Interview conversion.

### 🎨 Premium User Experience
- **Glassmorphism UI**: A sleek, translucent design with blurred backgrounds and neon gradients.
- **Micro-animations**: Powered by `framer-motion` for smooth layout transitions and hover effects.
- **Zero-Latency State**: Local-first architecture using `localStorage` ensures your data is always available instantly.
- **Responsive Layout**: Seamless experience across mobile, tablet, and desktop.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite |
| **Animation** | Framer Motion |
| **State** | React Context API, Custom Hooks |
| **Styling** | Vanilla CSS (Modern Design System) |
| **Icons** | React Icons (Feather) |
| **Charts** | Recharts |
| **Forms** | React Hook Form, Yup Valdation |
| **Utilities** | date-fns, Axios, useLocalStorage |

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd p2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI components (Sidebar, Charts, Cards, etc.)
├── context/        # Global state management using Context API
├── hooks/          # Custom React hooks (useApplications, useLocalStorage, etc.)
├── pages/          # Main application views (Dashboard, Applications, Analytics)
├── services/       # Mock API services and data initializers
├── utils/          # Helper functions and constants
└── index.css       # Core design system and global styles
```

---


*Built with ❤️*
