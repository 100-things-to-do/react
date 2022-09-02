# pull official base image
FROM node:12.20.0-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./

EXPOSE 8080

# start app
CMD ["npm", "start"]
