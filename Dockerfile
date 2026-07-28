# Use the latest LTS version of Node
FROM node:22

# Create app directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose webpack dev server port
EXPOSE 8080

# Allow webpack-dev-server to be accessed from outside the container
CMD ["npm", "start", "--", "--host", "0.0.0.0"]