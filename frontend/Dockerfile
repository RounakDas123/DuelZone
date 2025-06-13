# Use official Node.js image as the base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock file first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose port for the development server
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
