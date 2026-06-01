# ==========================================
# Stage 1 - Build React App
# ==========================================

FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

RUN npm ci

# Copy source code
COPY . .

# Build production app
RUN npm run build

# ==========================================
# Stage 2 - Nginx
# ==========================================

FROM nginx:1.27-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]