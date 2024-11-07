# 💸 Web Expense Tracker

A web-based, mobile-responsive expense tracker built with **Next.js** and styled with **Chakra UI**. This app leverages **Prisma** and **Supabase** for database management and **SSO (Single Sign-On)** with GitHub and Google for user authentication.

## 🌟 Features

- 🔐 **Single Sign-On Authentication**: Sign in with GitHub or Google for a seamless experience.
- 📈 **Expense Tracking and Analytics**: Record, categorize, and analyze expenses.
- 📊 **Data Visualizations**: View expense trends and insights with Chart.js.
- 💻 **Responsive Design**: Optimized for both desktop and mobile devices using Chakra UI.

## 📂 Project Structure

This application is structured as follows:

- **Frontend**: Built with Next.js, styled using Chakra UI for a polished and responsive interface.
- **Backend**: API routes managed by Next.js, with database operations via Prisma.
- **Database**: Supabase (PostgreSQL) as the primary database, managed with Prisma.

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14 or later
- **PostgreSQL**
- **Yarn** or **npm**

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/web-expense-tracker.git
   cd web-expense-tracker

2. **Install Dependencies:**:
   ```bash
    npm install

3. **Environment Variables:**:
    ```.env
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    GITHUB_CLIENT_ID=your-github-client-id
    GITHUB_CLIENT_SECRET=your-github-client-secret
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret

4. **Initialize the Prisma database:**:
    ```.bash
    npx prisma migrate dev --name init

5. **Start the Development Server**:
    ```.bash
    npm run dev

The app will be available at http://localhost:3000.

## 📜 **Available Scripts**
- **npm run dev**: Starts the development server.
- **npm run build**: Builds the project for production.
- **npm run start**: Runs the production server.
- **npm run lint**: Lints the codebase using ESLint.
## 🛠️ **Prisma Models**

    model User {
      id        String   @id @default(uuid())
      createdAt DateTime @default(now())
      username  String
      email     String   @unique
      balance   Float    @default(0.0)
      expenses  Expense[]
    }
    model Expense {
      id      String   @id @default(uuid())
      date    DateTime @default(now())
      amount  Float
      category String
      userId  String
      user    User     @relation(fields: [userId], references: [id])
    }
## 🛠️ **Technologies Used**
Next.js: React framework for server-side rendering and static site generation.
Chakra UI: Component library for a modern and responsive UI.
Prisma: ORM for type-safe database access.
Supabase (PostgreSQL): Relational database for storing user and expense data.
NextAuth: Authentication library for secure login and session management.
Chart.js: Data visualization library for displaying charts.

## 📜 License
This project is licensed under the MIT License.