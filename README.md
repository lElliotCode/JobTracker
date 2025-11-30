# 🎯 Job Application Tracker

A modern, fullstack web application to efficiently track your job applications. Built with Next.js, TypeScript, and Supabase.


> **Status:** MVP Functional - Core features complete, authentication and advanced analytics in roadmap.

[🔗 Live Demo] | https://job-tracker-jet-three.vercel.app) |

---

## 💡 The Problem

Job hunting is chaotic. Tracking applications across multiple companies in spreadsheets is tedious and error-prone. You lose track of what you applied to, when, and what status each application is in.

## ✨ The Solution

An intuitive, fast web app that centralizes all your job applications with powerful filtering, search, and organization features.

---

## 🚀 Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, read, update, and delete applications
- ✅ **Smart Filtering** - Filter by status (Applied, Interview, Pending, Rejected, etc.)
- ✅ **Real-time Search** - Find applications by company name or position
- ✅ **Multi-field Sorting** - Sort by date, company, or status (ascending/descending)
- ✅ **Rich Application Data** - Track company, position, location, salary range, URL, and more

### User Experience
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Loading States** - Smooth skeleton loaders for better perceived performance
- ✅ **Confirmation Modals** - Prevents accidental deletions
- ✅ **Empty States** - Helpful guidance when no data is present
- ✅ **Animations** - Smooth transitions and fade-in effects

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS, Custom CSS animations |
| **Backend** | Next.js API Routes (Serverless) |
| **Database** | PostgreSQL (via Supabase) |
| **Deployment** | Vercel |

---

## 📸 Screenshots

### Main Dashboard with Filters
![Dashboard](./public/screenshots/dashboard.png)

### Add New Application
![Add Application](./public/screenshots/add-modal.png)

### Edit Application
![Edit Application](./public/screenshots/edit-modal.png)

### Delete Confirmation
![Delete Modal](./public/screenshots/delete-modal.png)

### Search & Filter in Action
![Filters](./public/screenshots/filters.png)

---

## 🏃 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up the database**
   
   Run this SQL in your Supabase SQL Editor:
```sql
   create table applications (
     id uuid default gen_random_uuid() primary key,
     company text not null,
     position text not null,
     status text not null default 'applied',
     applied_date date not null default current_date,
     url text,
     location text,
     salary_range text,
     notes text,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
```

5. **Run the development server**
```bash
   npm run dev
```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📊 Database Schema
```sql
applications
├── id (uuid, primary key)
├── company (text, required)
├── position (text, required)
├── status (text, default: 'applied')
├── applied_date (date, default: today)
├── url (text, optional)
├── location (text, optional)
├── salary_range (text, optional)
├── notes (text, optional)
├── created_at (timestamp)
└── updated_at (timestamp)
```

---

## 🎓 What I Learned

Building this project taught me:

- **Next.js 14 App Router** - Server and client components, routing, and API routes
- **TypeScript** - Type safety, interfaces, and type inference
- **Supabase** - PostgreSQL database, real-time subscriptions, and REST API
- **State Management** - React hooks (useState, useEffect) and derived state
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **UX Patterns** - Loading states, empty states, confirmation dialogs, and error handling
- **CRUD Operations** - Full create, read, update, delete implementation
- **Advanced Filtering** - Multi-criteria filtering and sorting algorithms

---

## 🚧 Roadmap

Future enhancements planned:

- [ ] User authentication (Supabase Auth)
- [ ] Row-level security (user-specific data)
- [ ] Statistics dashboard with charts
- [ ] Export applications to CSV
- [ ] Email reminders for follow-ups
- [ ] Dark mode toggle
- [ ] Application notes/timeline
- [ ] Interview preparation checklist

---

## 🤝 Contributing

This is a personal learning project, but feedback and suggestions are welcome! Feel free to open an issue or submit a pull request.

---

## 👨‍💻 Author

**Elliot** - Transitioning from construction to tech
