
# Use Node LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy rest of your app
COPY . .

# Expose the port your app runs on
EXPOSE 9600

# Start the app
CMD ["npm", "start"]
