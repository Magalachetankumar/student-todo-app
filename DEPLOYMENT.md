# Deployment Guide

## 📦 Push to GitHub

### Step 1: Initialize Git
```bash
cd backend
git init
```

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Log in to your account
3. Click "New" button to create a new repository
4. Name it: `student-todo-app`
5. Add description: "Advanced Student To-Do Application with Express.js and SQLite"
6. Choose "Public" (optional)
7. Click "Create repository"

### Step 3: Add Remote and Push
```bash
# Add your GitHub repository URL (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/student-todo-app.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Advanced student to-do app with authentication and database"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Verify
Check your GitHub repository online to confirm files are uploaded.

---

## 🚀 Deploy Options

### Option 1: Deploy to Railway (Recommended - Easiest)

#### Prerequisites:
- GitHub account (already have your repo)
- Railway account (free)

#### Steps:
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your `student-todo-app` repository
5. Railway will auto-detect Node.js
6. Set environment variables:
   - `PORT`: 3000
   - `SESSION_SECRET`: your-secret-key
   - `NODE_ENV`: production
7. Click "Deploy"
8. Wait for deployment (2-3 minutes)
9. Your app URL will be shown (e.g., `https://student-todo-app.up.railway.app`)

#### Database Notes:
- SQLite database will be stored in Railway's ephemeral storage
- For production, consider switching to PostgreSQL

---

### Option 2: Deploy to Render

#### Prerequisites:
- GitHub account (already have your repo)
- Render account (free)

#### Steps:
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your `student-todo-app` repository
5. Configure:
   - **Name**: student-todo-app
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables same as Railway
7. Click "Create Web Service"
8. Wait for deployment
9. Access your app at `https://student-todo-app.onrender.com`

---

### Option 3: Deploy to Heroku (Free tier ended, now paid)

If you still have a Heroku account with free credits:

```bash
# Install Heroku CLI
# Then login
heroku login

# Create app
heroku create student-todo-app

# Set environment variables
heroku config:set SESSION_SECRET=your-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

### Option 4: Deploy to Vercel (Node.js support)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Configure environment variables
5. Deploy

---

## 📝 Environment Variables Setup

Create a `.env` file in your backend folder with:

```
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-super-secret-key-change-this
```

For production deployment, use platform-specific settings:
- **Railway**: Set in Settings → Variables
- **Render**: Set in Environment
- **Heroku**: Use `heroku config:set`

---

## 🔄 Continuous Deployment

With Railway and Render, every push to your GitHub `main` branch automatically triggers a new deployment!

To push updates:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Your changes will be live within minutes!

---

## 📊 Database Persistence

### Current Setup (SQLite):
- Works great for small projects and development
- Database stored locally

### For Production (Optional Upgrade):
- Consider PostgreSQL (Railway provides free PostgreSQL)
- Update code to use PostgreSQL instead of SQLite
- Benefits: Better for concurrent users, automatic backups

---

## 🔗 Quick Links

- **GitHub**: https://github.com
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Vercel**: https://vercel.com

---

## ✅ Deployment Checklist

- [ ] Push code to GitHub
- [ ] Create `.env` file with SESSION_SECRET
- [ ] Test app locally with `npm start`
- [ ] Choose deployment platform
- [ ] Set environment variables on platform
- [ ] Deploy!
- [ ] Test live URL
- [ ] Share with friends!

---

## 🐛 Troubleshooting

### App crashes on deployment:
- Check logs on your deployment platform
- Verify environment variables are set
- Ensure `start` script in package.json is correct

### Database not persisting:
- SQLite on ephemeral storage will reset on redeploy
- Consider switching to PostgreSQL for production

### Port issues:
- App listens on `process.env.PORT || 3000`
- Platform assigns port automatically
- Never hardcode port in production

---

## 📞 Need Help?

- Railway Support: support@railway.app
- Render Support: https://render.com/docs
- Node.js Docs: https://nodejs.org/docs/
