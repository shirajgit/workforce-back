# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build TypeScript -> JavaScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "dist/server.js"]