const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'student-todo-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
}));

// Database setup
const db = new sqlite3.Database('./data/todos.db', (err) => {
  if (err) console.error('Database error:', err);
  else console.log('Database connected');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'General',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};

// Routes - Auth
app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  
  if (password !== confirm_password) {
    return res.render('register', { error: 'Passwords do not match' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  
  db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err) => {
      if (err) {
        return res.render('register', { error: 'Username or email already exists' });
      }
      res.redirect('/login');
    }
  );
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.render('login', { error: 'Invalid username or password' });
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    res.redirect('/dashboard');
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Routes - Todo Management
app.get('/dashboard', requireLogin, (req, res) => {
  const filter = req.query.filter || 'all';
  const category = req.query.category || 'all';
  
  let query = 'SELECT * FROM todos WHERE user_id = ?';
  let params = [req.session.userId];
  
  if (filter === 'completed') {
    query += ' AND completed = 1';
  } else if (filter === 'pending') {
    query += ' AND completed = 0';
  }
  
  if (category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY due_date ASC, priority DESC';
  
  db.all(query, params, (err, todos) => {
    if (err) console.error(err);
    
    const completedCount = todos.filter(t => t.completed).length;
    const stats = {
      total: todos.length,
      completed: completedCount,
      pending: todos.length - completedCount,
      percentage: todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0
    };
    
    res.render('dashboard', {
      todos,
      stats,
      username: req.session.username,
      currentFilter: filter,
      currentCategory: category
    });
  });
});

app.post('/add', requireLogin, (req, res) => {
  const { title, description, category, priority, due_date } = req.body;
  
  db.run(
    'INSERT INTO todos (user_id, title, description, category, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)',
    [req.session.userId, title, description, category, priority, due_date || null],
    (err) => {
      if (err) console.error(err);
      res.redirect('/dashboard');
    }
  );
});

app.post('/toggle/:id', requireLogin, (req, res) => {
  db.run(
    'UPDATE todos SET completed = NOT completed WHERE id = ? AND user_id = ?',
    [req.params.id, req.session.userId],
    (err) => {
      if (err) console.error(err);
      res.redirect('/dashboard');
    }
  );
});

app.post('/delete/:id', requireLogin, (req, res) => {
  db.run(
    'DELETE FROM todos WHERE id = ? AND user_id = ?',
    [req.params.id, req.session.userId],
    (err) => {
      if (err) console.error(err);
      res.redirect('/dashboard');
    }
  );
});

app.get('/edit/:id', requireLogin, (req, res) => {
  db.get(
    'SELECT * FROM todos WHERE id = ? AND user_id = ?',
    [req.params.id, req.session.userId],
    (err, todo) => {
      if (err || !todo) return res.redirect('/dashboard');
      res.render('edit', { todo });
    }
  );
});

app.post('/update/:id', requireLogin, (req, res) => {
  const { title, description, category, priority, due_date } = req.body;
  
  db.run(
    'UPDATE todos SET title = ?, description = ?, category = ?, priority = ?, due_date = ? WHERE id = ? AND user_id = ?',
    [title, description, category, priority, due_date || null, req.params.id, req.session.userId],
    (err) => {
      if (err) console.error(err);
      res.redirect('/dashboard');
    }
  );
});

app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Advanced Student To-Do App running on http://localhost:${PORT}`);
});
