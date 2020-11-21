FROM node:13 

COPY dist ./dist 
COPY package*.json ./ 
COPY server.js ./ 

RUN npm ci

EXPOSE 4000

CMD node server.js