FROM node

RUN npm install -g serve

WORKDIR /client

COPY package*.json /client/

RUN npm install 

COPY . /client/

RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "static"]