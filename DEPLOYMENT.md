# Deployment Guide for ElectroMart

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `DATABASE_URL` - Your MySQL database connection string
     - `NEXT_PUBLIC_API_BASE_URL` - Your backend API URL (or use Vercel serverless functions)
     - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
     - `NEXTAUTH_URL` - Your Vercel deployment URL
   - Click "Deploy"

3. **Deploy Backend Separately:**
   - The backend server needs to be deployed separately (Railway, Render, or Heroku)
   - Update `NEXT_PUBLIC_API_BASE_URL` to point to your deployed backend

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Environment Variables Required

Create a `.env.local` file (or set in Vercel dashboard):

```env
DATABASE_URL=your_mysql_connection_string
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-app.vercel.app
```

## Alternative: Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder to Netlify
3. Set environment variables in Netlify dashboard
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

## Backend Deployment

### Option 1: Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add MySQL database
4. Set environment variables
5. Deploy

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Set build command: `cd server && npm install && npm start`
5. Add MySQL database
6. Set environment variables

## Database Setup

1. Create MySQL database (Railway, PlanetScale, or any MySQL provider)
2. Run migrations:
   ```bash
   cd server
   npx prisma migrate deploy
   ```
3. Generate products:
   ```bash
   node scripts/generate-sample-products.js
   ```

## Post-Deployment Checklist

- [ ] Database connected and migrations run
- [ ] Environment variables set correctly
- [ ] Backend API is accessible
- [ ] Products generated in database
- [ ] Test user registration/login
- [ ] Test product browsing
- [ ] Test cart functionality

## Share Your Link

Once deployed, you'll get a URL like:
- `https://your-app.vercel.app` (Vercel)
- `https://your-app.netlify.app` (Netlify)

Share this link with anyone to view your site!



