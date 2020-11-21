FROM node:13 

COPY dist ./dist 
COPY package*.json ./ 
COPY server.js ./ 

RUN npm ci

EXPOSE 80

CMD node server.js