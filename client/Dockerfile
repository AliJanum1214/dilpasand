# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) 
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Bundle app source inside Docker image
COPY . .

# Build your Next.js application
RUN npm run build

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime.
CMD ["npm", "run", "start"]