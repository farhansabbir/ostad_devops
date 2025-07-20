# Dockerfile for Next.js app with Nginx

# 1. Builder Stage
FROM node:lts-slim AS builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Run lint (optional, as it's not strictly needed for build, but good practice)
RUN npm run lint

# Run build - this will now generate the 'out' directory
RUN npm run build

# 2. Final Stage
FROM nginx:1.21.0-alpine
WORKDIR /usr/share/nginx/html

# Copy the *co ntents* of the 'out' directory to Nginx's root
# This will place index.html, 404.html, and other static pages directly in /usr/share/nginx/html
COPY --from=builder /app/out/ .

# Copy public folder - still good to have directly, though usually out/ will contain its static assets already
# if you used image optimization within Next.js. If you have non-processed static files, keep this.
# If your Next.js static export copies public assets directly into 'out' and handles them,
# this line might become redundant or conflict, so verify your 'out' folder structure.
# For simplicity, if 'out' contains everything, you might remove this line after testing.
COPY --from=builder /app/public ./public

# Expose port 3000 (from nginx.conf)
EXPOSE 3000

# Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
 
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]