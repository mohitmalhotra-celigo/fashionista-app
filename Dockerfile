# Use official Node.js LTS image
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "dist/server/index.js"] 