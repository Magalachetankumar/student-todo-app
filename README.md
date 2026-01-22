# Advanced Student To-Do App

A comprehensive task management application built with Express.js, EJS, and SQLite for students to manage assignments, exams, and other academic tasks.

## 🌟 Features

### Authentication & Security
- User registration and login with bcrypt password hashing
- Session management with express-session
- Secure user-specific task management
- Logout functionality

### Task Management
- ✅ Create, read, update, and delete tasks
- 📁 Organize tasks by categories (General, Assignment, Exam, Reading, Project)
- 🎯 Priority levels (Low, Medium, High)
- 📅 Due date tracking
- ✔️ Mark tasks as completed/incomplete
- 📝 Detailed task descriptions

### Dashboard & Analytics
- 📊 Real-time statistics (total, completed, pending tasks)
- 📈 Progress percentage tracking
- 🔍 Filter tasks by status (All, Pending, Completed)
- 🏷️ Filter tasks by category
- 🎨 Beautiful, responsive UI with gradient design

### Data Persistence
- SQLite database for persistent data storage
- User-specific data isolation
- Automatic table creation

## 📋 Tech Stack

- **Backend:** Node.js, Express.js
- **View Engine:** EJS
- **Authentication:** bcryptjs
- **Database:** SQLite3
- **Session Management:** express-session
- **Frontend:** HTML5, CSS3 (with gradients and animations)

## 🚀 Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The application will run on `http://localhost:3000`

## 📝 Usage

### First Time Setup
1. Go to `http://localhost:3000`
2. Click "Register here" to create an account
3. Enter username, email, and password
4. Login with your credentials
5. Start managing your tasks!

### Managing Tasks
- **Add Task:** Click "+ Add New Task" button, fill in details, and submit
- **Mark Complete:** Click the checkbox next to a task
- **Edit Task:** Click the "Edit" button on a task card
- **Delete Task:** Click the "Delete" button (requires confirmation)
- **Filter:** Use the sidebar to filter by status or category

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password` - Hashed password
- `created_at` - Timestamp

### Todos Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `title` - Task title
- `description` - Task description
- `category` - Task category
- `priority` - Priority level (low/medium/high)
- `due_date` - Due date
- `completed` - Completion status
- `created_at` - Timestamp

## 🔐 Security Features
- Password hashing with bcryptjs
- Session-based authentication
- User-specific task isolation
- Input validation
- Secure cookies

## 🎨 UI/UX Features
- Responsive design for mobile and desktop
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Priority-based color coding
- Real-time progress tracking
- Intuitive modal for task creation

## 📱 Responsive Design
- Works on desktop, tablet, and mobile devices
- Adaptive layout using CSS Grid and Flexbox
- Mobile-friendly navigation

## 🛣️ Routes

### Authentication
- `GET /register` - Registration page
- `POST /register` - Register new user
- `GET /login` - Login page
- `POST /login` - Login user
- `GET /logout` - Logout user

### Task Management
- `GET /` - Redirect to dashboard or login
- `GET /dashboard` - Main dashboard with task list
- `POST /add` - Add new task
- `GET /edit/:id` - Edit task page
- `POST /update/:id` - Update task
- `POST /toggle/:id` - Toggle task completion
- `POST /delete/:id` - Delete task

## 💡 Future Enhancements
- Due date notifications/reminders
- Task categories customization
- Export tasks to PDF/CSV
- Dark mode
- Collaborative tasks
- Mobile app
- Email notifications

## 📄 License
ISC
