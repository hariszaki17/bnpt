# Use the official Node.js image as the base image
FROM node:18.20.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./


# Install Strapi globally via npm
RUN npm install strapi -g

# Copy all project files to the working directory in the container
COPY . .

RUN rm -rf /usr/src/app/node_modules

RUN npm install --platform=linux --arch=arm64v8 sharp

RUN npm install

CMD ["npm", "run", "build"]

# # Build the Strapi project
# RUN strapi build

# Expose the Strapi default port (1337)
EXPOSE 1337

# Start Strapi when the container starts
CMD ["npm", "run", "develop"]
