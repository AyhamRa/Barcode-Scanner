FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . . 
# Serve the app using a lightweight web server
EXPOSE 5173
CMD [ "npm", "run", "dev", "--", "--host" ]
