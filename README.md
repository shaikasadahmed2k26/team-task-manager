
# 🚀 Team Task Manager — Ethara.AI Assignment

A full-stack collaborative task management web application inspired by tools like Trello and Asana. Built as part of the Ethara.AI full-stack development assignment.

---

## 🌐 Live Demo
> https://team-task-manager-two-navy.vercel.app

---

## 🔌 Backend API
> https://team-task-manager-production-5677.up.railway.app



## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Backend | Node.js + Express.js |
| Database | Supabase (PostgreSQL) |
| Authentication | JWT (JSON Web Tokens) |
| Styling | CSS Variables + Inter Font |
| Drag & Drop | @hello-pangea/dnd |
| Deployment | Railway |

---

## ✨ Features

### 🔐 Authentication
- Secure Signup and Login with JWT
- Password strength indicator (Weak → Strong)
- Protected routes — only logged in users can access the app

### 📁 Project Management
- Create projects with name and description
- Creator automatically becomes Admin
- Add or remove team members by email
- View all projects you are part of

### ✅ Task Management
- Create tasks with title, description, priority, due date
- Assign tasks to team members
- Drag and drop tasks across columns (To Do → In Progress → Done)
- Delete tasks
- Overdue task detection with visual indicator

### 📊 Dashboard
- Total tasks count
- Tasks by status (To Do, In Progress, Done)
- Overdue tasks count
- Recent projects list
- Task overview with progress bars

### 🎨 UI/UX
- Clean and modern professional design
- Dark mode and Light mode toggle
- Smooth animations and transitions
- Responsive layout
- Ethara.AI branded splash screen on load
- Splash screen highlights the Ethara.AI assignment and supports dark mode theme

### 🔒 Role Based Access
- Admin — full control over tasks and members
- Member — can view and update assigned tasks

---

## 🗄️ Database Schema

### users
| Column | Type |
|---|---|
| id | uuid (PK) |
| name | text |
| email | text (unique) |
| password | text (hashed) |
| role | text |
| created_at | timestamp |

### projects
| Column | Type |
|---|---|
| id | uuid (PK) |
| name | text |
| description | text |
| created_by | uuid (FK → users) |
| created_at | timestamp |

### project_members
| Column | Type |
|---|---|
| id | uuid (PK) |
| project_id | uuid (FK → projects) |
| user_id | uuid (FK → users) |
| role | text |
| joined_at | timestamp |

### tasks
| Column | Type |
|---|---|
| id | uuid (PK) |
| project_id | uuid (FK → projects) |
| title | text |
| description | text |
| status | text |
| priority | text |
| due_date | date |
| assigned_to | uuid (FK → users) |
| created_by | uuid (FK → users) |
| created_at | timestamp |

---

## 📁 Project Structure

```
team-task-manager/
├── server/
│   ├── config/
│   │   └── supabase.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tasks.js
│   │   └── users.js
│   ├── .env
│   └── index.js
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── TaskBoard.jsx
│   │   │   └── SplashScreen.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- A Supabase account

### 1. Clone the repository
```bash
git clone https://github.com/shaikasadahmed2k23/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server folder:
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 4. Open the app
```
http://localhost:5173
```

---

## 🚀 Deployment

Both frontend and backend are deployed on **Railway**.

- Backend runs as a Node.js service
- Frontend runs as a static Vite build
- Environment variables configured via Railway dashboard
- Supabase used as the cloud database

---

## 👨‍💻 Developer

**Shaik Asad Ahmed**
- GitHub: [@shaikasadahmed2k23](https://github.com/shaikasadahmed2k23)
- LinkedIn: [Shaik Asad Ahmed](https://www.linkedin.com/in/shaik-asad-ahmed-224b9b2a8/)

---

*Built with 💜 for Ethara.AI Full Stack Assignment*