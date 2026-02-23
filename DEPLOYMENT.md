# Vercel Deployment Guide

This project is configured and ready for deployment to Vercel. Follow these steps:

## Pre-Deployment Checklist

- [x] **Build Configuration**: `vercel.json` created with proper build and output settings
- [x] **Build Success**: Verified with `npm run build` - all 19 pages generated successfully
- [x] **Dependencies**: All dependencies in `package.json` are production-ready
  - Next.js 16.1.6
  - React 19.2.3
  - Tailwind CSS 4
  - TypeScript 5
  - MDX support via next-mdx-remote

- [x] **Environment Setup**: `.env.example` created for reference
- [x] **Git Ignore**: Proper `.vercelignore` configured to exclude unnecessary files

## Deployment Steps

### 1. Push to GitHub (if not already done)
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Click "Deploy"

### 3. Configure Environment Variables (if needed)

If your application requires environment variables:
1. Go to your project settings in Vercel dashboard
2. Navigate to "Environment Variables"
3. Add any variables referenced in `.env.example`

## Project Structure

- **`/app`**: Next.js app router pages
  - `page.tsx`: Home page
  - `layout.tsx`: Root layout with Tailwind styles
  - `/devlog`: Blog posts with dynamic routing
  - `/wiki`: Static wiki pages with dynamic routing
- **`/components`**: Reusable React components
- **`/content`**: MDX content files
- **`/lib`**: Utility functions
- **`/public`**: Static assets

## Build Details

- **Framework**: Next.js with Turbopack
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS 4 with PostCSS
- **Content**: MDX with gray-matter for frontmatter
- **Date Handling**: date-fns for utilities

## Routes Generated

**Static Routes**:
- `/` - Home page
- `/devlog` - Devlog index
- `/wiki` - Wiki index

**Dynamic Routes**:
- `/devlog/[slug]` - 5 blog posts (SSG with generateStaticParams)
- `/wiki/[slug]` - 8 wiki pages (SSG with generateStaticParams)

## Post-Deployment

1. **Verify Deployment**: Visit your Vercel URL and test all routes
2. **Check Build Logs**: Review build logs in Vercel dashboard for any warnings
3. **Monitor Performance**: Use Vercel Analytics to track page performance
4. **Set Up Custom Domain** (optional):
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Add your custom domain

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are listed in `package.json`
- Ensure no hardcoded absolute paths that won't work on Vercel

### Pages Not Found
- Verify `generateStaticParams` is correctly implemented for dynamic routes
- Check that content files (MDX) are committed to git
- Ensure paths in your code match the file structure

### Performance Issues
- Use Vercel Analytics to identify slow pages
- Consider ISR (Incremental Static Regeneration) for frequently updated content
- Optimize images using Next.js Image component

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment/vercel)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
