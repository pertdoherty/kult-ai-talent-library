# Deployment Guide: Railway + Vercel

## Your URLs
- **Railway Backend**: https://kult-ai-talent-library-production.up.railway.app
- **Vercel Frontend**: https://kult-ai-talent-library.vercel.app (will be created)

---

## Step 7: Deploy Backend to Railway

### 7.1 Connect Railway to GitHub

1. Go to [Railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `kult-ai-talent-library` repository
4. Railway will detect your monorepo
5. Click **"Configure"** and select:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node --env-file=.env.local server.js`)

### 7.2 Set Environment Variables in Railway

Go to your Railway project dashboard:

1. Click **"Variables"** or **"Environment"**
2. Add these variables:

```
GOOGLE_CLOUD_PROJECT=project-logan-456105
GOOGLE_CLOUD_LOCATION=global
PROXY_HEADER=dAGtg3qhY5E8-3ai3mnHrtJoh34Rz4qR
API_BACKEND_PORT=3000
API_BACKEND_HOST=0.0.0.0
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://kult-ai-talent-library.vercel.app
```

Replace:
- `your_cloud_name`, `your_api_key`, `your_api_secret` with your Cloudinary credentials

### 7.3 Deploy

- Railway will auto-deploy when you push to GitHub
- Check **"Deployments"** tab to see the build status
- Once live, you'll see your Railway URL in the dashboard

### 7.4 Test Backend

```bash
curl https://kult-ai-talent-library-production.up.railway.app/api/talents
```

Should return a JSON array (empty or with data from Firestore).

---

## Step 8: Deploy Frontend to Vercel

### 8.1 Connect Vercel to GitHub

1. Go to [Vercel.com](https://vercel.com)
2. Click **"New Project"** → Import your GitHub repo
3. Select `kult-ai-talent-library`
4. Configure:
   - **Framework**: Other (or Vite)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 8.2 Set Environment Variables in Vercel

In Vercel dashboard, go to **Settings** → **Environment Variables**:

Add:
```
VITE_API_URL=https://kult-ai-talent-library-production.up.railway.app
```

### 8.3 Deploy

- Click **"Deploy"**
- Vercel will build and deploy automatically
- You'll get a URL like `https://kult-ai-talent-library.vercel.app`

### 8.4 Test Frontend

Open https://kult-ai-talent-library.vercel.app in your browser and:
1. Navigate to **Admin Dashboard**
2. Try adding a talent
3. Upload an image - should upload to Cloudinary
4. Submit - should save to Firestore

---

## Testing Checklist

- [ ] Backend is running on Railway
- [ ] `curl https://kult-ai-talent-library-production.up.railway.app/api/talents` returns data
- [ ] Frontend is deployed on Vercel
- [ ] Can access https://kult-ai-talent-library.vercel.app
- [ ] Admin dashboard loads without API errors
- [ ] Can add a new talent
- [ ] Image upload works (check Cloudinary dashboard)
- [ ] Data persists after page refresh
- [ ] Delete talent works

---

## Environment Variables Summary

### Backend (.env.local in Railway)
```
GOOGLE_CLOUD_PROJECT=project-logan-456105
GOOGLE_CLOUD_LOCATION=global
PROXY_HEADER=dAGtg3qhY5E8-3ai3mnHrtJoh34Rz4qR
API_BACKEND_PORT=3000
API_BACKEND_HOST=0.0.0.0
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://kult-ai-talent-library.vercel.app
```

### Frontend (.env.production in Vercel)
```
VITE_API_URL=https://kult-ai-talent-library-production.up.railway.app
```

---

## Local Development (After Deployment)

To test with your deployed backend locally:

1. Update `frontend/.env.local`:
   ```
   VITE_API_URL=https://kult-ai-talent-library-production.up.railway.app
   ```

2. Run frontend: `npm run dev --prefix frontend`

This lets you test the full production setup locally.

---

## Troubleshooting

### Frontend shows "Cannot fetch from API"
- Check browser **Console** for CORS errors
- Verify `VITE_API_URL` is set correctly in Vercel
- Ensure Railway backend is running (`/api/talents` endpoint works)

### Image uploads fail
- Verify Cloudinary credentials in Railway env vars
- Check Cloudinary dashboard for upload limits

### Talent data doesn't persist
- Verify Firebase/Firestore is accessible from Railway
- Check Railway logs for Firebase errors
- Ensure `GOOGLE_CLOUD_PROJECT` is correct

### Railway build fails
- Check Railway **Build Logs** for errors
- Verify all env vars are set
- Ensure `backend/package.json` exists with correct scripts

---

## Next Steps

1. **Push to GitHub** (changes are already committed)
2. **Deploy backend to Railway** (follow section 7)
3. **Deploy frontend to Vercel** (follow section 8)
4. **Test the full app** (use testing checklist above)
5. **Migrate initial data** to Firestore (optional, data will build up as you add talents)

---

## Quick Reference

| Component | URL | Type |
|-----------|-----|------|
| Backend API | https://kult-ai-talent-library-production.up.railway.app | Node/Express |
| Frontend | https://kult-ai-talent-library.vercel.app | React/Vite |
| Database | Firestore (Google Cloud) | NoSQL |
| Image Storage | Cloudinary | CDN |
