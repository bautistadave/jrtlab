FROM node:14-alpine3.12

RUN mkdir -p /usr/src/app
#WORKDIR  /dist
WORKDIR /usr/src/app   
COPY package*.json ./
RUN npm install 
#--production

COPY . .

EXPOSE 3000

#CMD ["node", "./dist/index.js"]   
CMD [ "npm", "start" ]