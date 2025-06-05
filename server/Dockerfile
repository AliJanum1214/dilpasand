# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including pm2
RUN npm install pm2 -g  # Install pm2 globally
RUN npm install --legacy-peer-deps --verbose

# Copy the rest of your application.
COPY . .

EXPOSE 30007 

# Start the application using pm2-runtime
CMD ["pm2-runtime", "start", "index.js"]
