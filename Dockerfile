FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

RUN npm uninstall bcrypt

# Install TypeScript
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN tsc

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["node", "dist/app.js"]
