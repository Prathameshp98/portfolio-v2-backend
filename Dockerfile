
# Use the official Node.js image as the base image
FROM node:20.8.0

# Set the working directory in the container
WORKDIR /

# Copy the application files into the working directory
COPY . /

# Install the application dependencies
RUN npm install

# Define the entry point for the container
EXPOSE 8000
CMD ["npm", "start"]