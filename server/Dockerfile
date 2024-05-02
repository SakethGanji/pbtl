# Use the specific version of Node.js
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY ./client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY ./client .

# Build your Next.js application
RUN npm run build

# Command to start Next.js
CMD ["npm", "start"]
