# Quick Deployment Guide - ElectroMart

## 🚀 Deploy to Vercel (Easiest - 5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready to deploy"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"New Project"**
3. Import your repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Set Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
DATABASE_URL=your_mysql_connection_string
NEXT_PUBLIC_API_BASE_URL=https://your-backend.railway.app
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=https://your-app.vercel.app
```

### Step 4: Deploy Backend (Railway - Free)
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo → Set root directory to `/server`
4. Add MySQL database
5. Set environment variables:
   - `DATABASE_URL` (from Railway MySQL)
   - `NODE_ENV=production`
6. Deploy!

### Step 5: Update Frontend API URL
After backend deploys, update `NEXT_PUBLIC_API_BASE_URL` in Vercel to your Railway backend URL.

### Step 6: Run Database Migrations
In Railway, open terminal and run:
```bash
cd server
npx prisma migrate deploy
node scripts/generate-sample-products.js
```

## ✅ Done!
Your site will be live at: `https://your-app.vercel.app`

## 📱 Share Your Link
Anyone can now visit your deployed site using the Vercel URL!

---

## Alternative: Deploy to Netlify

1. Build locally: `npm run build`
2. Deploy `.next` folder to Netlify
3. Set environment variables
4. Configure build settings

See `DEPLOYMENT.md` for detailed instructions.



