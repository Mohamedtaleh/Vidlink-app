# 🚀 SnapKit.io Deployment Guide

This guide will help you deploy SnapKit.io to production using Vercel (frontend) and Railway (backend).

## 📋 Prerequisites

- GitHub account
- Vercel account
- Railway account (or Render/Heroku)
- MongoDB Atlas account

## 🏗️ Architecture Overview

```
Frontend (React) → Vercel
Backend (FastAPI) → Railway
Database (MongoDB) → MongoDB Atlas
```

## 🗄️ Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free account

2. **Create New Cluster**
   - Choose "Build a Database"
   - Select "Free" tier
   - Choose region closest to your users

3. **Setup Database Access**
   - Database Access → Add New Database User
   - Username: `snapkit_user`
   - Password: Generate secure password
   - Database User Privileges: Read and write to any database

4. **Setup Network Access**
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow access from anywhere)

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<username>` and `<password>` with your credentials

## 🔧 Step 2: Prepare Backend for Railway

1. **Create Railway Account**
   - Go to [Railway](https://railway.app/)
   - Sign up with GitHub

2. **Create New Project**
   - New Project → Deploy from GitHub repo
   - Connect your GitHub repository
   - Select the repository containing your SnapKit.io code

3. **Configure Environment Variables**
   ```
   MONGO_URL=mongodb+srv://snapkit_user:yourpassword@cluster.mongodb.net/snapkit
   DB_NAME=snapkit
   PORT=8000
   ENVIRONMENT=production
   CORS_ORIGINS=https://snapkit.vercel.app,https://your-custom-domain.com
   ```

4. **Deploy Backend**
   - Railway will automatically detect the Python app
   - It will use the `Procfile` to start the server
   - Wait for deployment to complete
   - Note the generated URL (e.g., `https://snapkit-backend.railway.app`)

## 🎨 Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com/)
   - Sign up with GitHub

2. **Import Project**
   - New Project → Import Git Repository
   - Select your GitHub repository
   - Framework Preset: Create React App
   - Root Directory: `frontend`

3. **Configure Environment Variables**
   ```
   REACT_APP_BACKEND_URL=https://snapkit-backend.railway.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your Vercel URL (e.g., `https://snapkit.vercel.app`)

## 🔄 Step 4: Update Backend CORS

1. **Update Railway Environment**
   - Go to Railway dashboard
   - Update `CORS_ORIGINS` to include your Vercel URL:
   ```
   CORS_ORIGINS=https://snapkit.vercel.app,https://snapkit-io.vercel.app
   ```

2. **Redeploy Backend**
   - Railway will automatically redeploy

## 🌐 Step 5: Custom Domain (Optional)

### For Frontend (Vercel)
1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### For Backend (Railway)
1. Go to Railway dashboard
2. Settings → Domains
3. Add custom domain
4. Update frontend environment variables

## 📝 Step 6: Environment Variables Summary

### Frontend (.env.production)
```
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
```

### Backend (Railway Environment)
```
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/snapkit
DB_NAME=snapkit
PORT=8000
ENVIRONMENT=production
CORS_ORIGINS=https://snapkit.vercel.app,https://custom-domain.com
```

## 🔍 Step 7: Testing Deployment

1. **Test Frontend**
   - Visit your Vercel URL
   - Check if page loads correctly
   - Test theme toggle and language selector

2. **Test Backend**
   - Visit `https://your-backend-url.railway.app/api/health`
   - Should return: `{"status": "healthy"}`

3. **Test Full Flow**
   - Enter a TikTok URL
   - Check if video parses correctly
   - Test download functionality
   - Check sharing features

## 🚨 Common Issues & Solutions

### CORS Errors
- Check `CORS_ORIGINS` in backend environment
- Ensure your frontend URL is included
- Redeploy backend after changes

### Backend Not Starting
- Check Railway logs for errors
- Verify all environment variables are set
- Check MongoDB connection string

### Database Connection Issues
- Verify MongoDB Atlas IP allowlist
- Check database user permissions
- Test connection string format

### Build Failures
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check for environment variable typos

## 🎯 Step 8: AdSense Integration

1. **Apply for Google AdSense**
   - Ensure site is live and functional
   - Apply at [Google AdSense](https://adsense.google.com/)

2. **Replace Ad Placeholders**
   - Edit `App.js` components
   - Replace `<AdBanner />` with actual AdSense code
   - Test ad placement and responsiveness

3. **Monitor Performance**
   - Use Google Analytics
   - Monitor ad revenue and user engagement
   - Optimize ad placement based on performance

## 📊 Step 9: Analytics Setup

1. **Google Analytics**
   - Create Google Analytics account
   - Add tracking code to React app
   - Monitor user behavior and conversions

2. **Performance Monitoring**
   - Use Vercel Analytics
   - Monitor Railway metrics
   - Set up alerts for downtime

## 🔒 Step 10: Security Checklist

- [ ] Environment variables are properly set
- [ ] MongoDB is secured with authentication
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] Input validation is working
- [ ] HTTPS is enforced
- [ ] Error handling doesn't expose sensitive info

## 🎉 Congratulations!

Your SnapKit.io is now live in production! 🚀

- **Frontend**: https://snapkit.vercel.app
- **Backend**: https://snapkit-backend.railway.app
- **Database**: MongoDB Atlas

## 📈 Next Steps

1. **SEO Optimization**
   - Submit sitemap to Google Search Console
   - Optimize meta tags and descriptions
   - Build backlinks and social media presence

2. **Monetization**
   - Implement Google AdSense
   - Monitor ad performance
   - Consider premium features

3. **Scaling**
   - Monitor usage and performance
   - Scale database and server resources
   - Implement caching strategies

4. **Maintenance**
   - Regular updates and security patches
   - Monitor error logs
   - User feedback and improvements

Need help? Check the troubleshooting section or contact support!