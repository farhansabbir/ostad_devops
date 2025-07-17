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

# Run lint
RUN npm run lint

# Run build
RUN npm run build

# 2. Final Stage
FROM nginx:1.21.0-alpine
WORKDIR /usr/share/nginx/html

# Copy build output from builder stage
COPY --from=builder /app/.next .

# Copy public folder
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY ../nginx.conf /etc/nginx/conf.d

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]