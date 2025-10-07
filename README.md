# ⚡ Feature-Rich Project Management Dashboard

A **modern, real-time project management dashboard** built with **Next.js 15**, **React 19**, and **TypeScript**.  
It provides seamless project and task management with live updates powered by **Socket.IO**, **React Query**, **Redux Toolkit Query**, and **ShadCN UI** components.

---

## 🔑 Demo Login

You can log in using the following **demo credentials**:

Email: admin@example.com
Password: 1234

- ⚠️ This is a **fake authentication system** — credentials are for demo purposes only.
- No real backend or sensitive data is involved.

## 🚀 Features

### 🧩 Core Functionality

- 📊 **Dashboard Overview**
  - Interactive charts showing project progress and completion rates.
  - Real-time project updates synced via Socket.IO.
- 📁 **Projects Management**
  - Create, edit, and track projects with live data binding.
  - Inline updates for fields like status, budget, and progress.
- ✅ **Task Management**
  - Add, edit, and delete tasks per project.
  - Task forms with full validation (Yup + React Hook Form).
  - Filter and search tasks easily in a responsive table.
- 🔄 **Real-Time Sync**
  - Tasks and projects automatically update across clients using Socket.IO.
- 💾 **Persistent Data**
  - Mock/fake backend API using Next.js API routes (perfect for frontend-only demos).
- 🧠 **Optimized State Management**
  - React Query handles caching, mutations, and optimistic UI updates.

---

## 🛠️ Tech Stack

| Category           | Technology                                                                             |
| ------------------ | -------------------------------------------------------------------------------------- |
| Framework          | [Next.js 15](https://nextjs.org)                                                       |
| Language           | [TypeScript](https://www.typescriptlang.org/)                                          |
| UI Library         | [ShadCN UI](https://ui.shadcn.com)                                                     |
| Styling            | [Tailwind CSS](https://tailwindcss.com)                                                |
| State Management   | [React Query](https://tanstack.com/query)                                              |
| Realtime           | [Socket.IO](https://socket.io)                                                         |
| Forms & Validation | [React Hook Form](https://react-hook-form.com) + [Yup](https://github.com/jquense/yup) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/feature-rich.git
cd feature-rich
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔌 Real-Time Socket Setup

The app initializes a Socket.IO server in:

```
/lib/socket/server.ts
```

and connects from the client via:

```
/lib/socket/client.ts
```

All task changes (create, edit, delete) emit live events:

- `task_created`
- `task_updated`
- `task_deleted`

So other connected clients receive instant updates.

---

## 🧩 API Routes (Fake Backend)

| Method   | Endpoint                                 | Description               |
| -------- | ---------------------------------------- | ------------------------- |
| `GET`    | `/api/projects`                          | Fetch all projects        |
| `GET`    | `/api/projects/:projectId`               | Get single project        |
| `PATCH`  | `/api/projects/:projectId`               | Update project            |
| `GET`    | `/api/projects/:projectId/tasks`         | Fetch tasks for a project |
| `POST`   | `/api/projects/:projectId/tasks`         | Create a new task         |
| `PATCH`  | `/api/projects/:projectId/tasks/:taskId` | Edit a task               |
| `DELETE` | `/api/projects/:projectId/tasks/:taskId` | Delete a task             |

---

## 🧠 Design Principles

- **Fully client-driven** UI for fast UX.
- **Optimistic updates** for task mutations.
- **Reusable hooks** for modularity.
- **Separation of concerns:** UI, logic, and data layers are cleanly split.
- **Type-safe** with strict TypeScript types for all entities.

---

## 🌈 UI Preview

> Example screens include:

- Dashboard with live charts
- Project list with inline editing
- Task management table with modal form
- Realtime update indicators

---

## 💡 Future Improvements

- 🔐 Add authentication & roles (Admin, Manager, Developer)
- ☁️ Connect to a real backend (Express / Prisma / Supabase)
- 📱 Mobile-friendly dashboard layout
- 🧾 Export reports to PDF or Excel

---

## 🤝 Contributing

Pull requests are welcome!  
If you’d like to suggest an improvement or fix a bug:

1. Fork the repo
2. Create a new branch (`feature/improvement-name`)
3. Submit a PR 🎉

---

**Made with ❤️ using Next.js 15, React 19, and Socket.IO**
