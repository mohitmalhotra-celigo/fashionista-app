# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Set environment variable to skip Husky installation
ENV HUSKY_SKIP_INSTALL=1
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"] 