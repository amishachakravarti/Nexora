 # 🚀 Nexora

Nexora is a full-stack platform that enables users to generate professional resumes, cover letters, and access industry-specific insights. Built with a modern tech stack, it features a clean, responsive UI using **Tailwind CSS** and handles data with **Prisma ORM** connected to **NeonDB** (PostgreSQL).

## 🛠️ Tech Stack

- **Frontend**: Next.js · React.js · Tailwind CSS
- **Backend**: Node.js · Prisma ORM · NeonDB (PostgreSQL)
- **Authentication**: Clerk
- **Deployment**: Vercel

## ✨ Features

- 🔐 **Authentication** using Clerk
- 📄 **Resume & Cover Letter Generation**
- 📊 **Industry Insights** based on selected fields
- 💅 **Tailwind CSS** for clean, reusable UI components
- 🚀 **Deployment** on Vercel + NeonDB PostgreSQL database

## 📦 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Sameer7698/Nexora.git
cd Nexora

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Add your Clerk API keys, OpenAI API key, and NeonDB database URL

# 4. Push Prisma schema to NeonDB
npx prisma db push

# 5. Run the development server
npm run dev


/components         → Tailwind-based reusable UI components
/pages              → App routes (Next.js pages)
/lib                → Utility functions and helpers
/prisma             → Prisma schema and client setup
/public             → Static assets
