FROM node:14.17.0-alpine
WORKDIR /user/Documents/oauth2-fa-proxy/prototype
COPY package*.json ./
COPY ./ ./
RUN npm install
CMD [ "npm", "start"]