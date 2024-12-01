# Frontend Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the React app
RUN npm run build

# Expose React port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]

