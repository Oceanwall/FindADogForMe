FROM node

RUN apt-get update

COPY package*.json ./

RUN npm --version
RUN npm install -g mocha
RUN npm install -g chai
RUN npm install -g request
RUN npm install -g newman
RUN npm install mocha
RUN npm install chai
RUN npm install request
RUN npm install newman

CMD bash
