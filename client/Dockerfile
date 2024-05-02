# Use the specific version of Node.js
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY ./server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY ./server .

# The command to run your application
CMD ["node", "index.js"]
