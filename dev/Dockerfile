FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/precon/api
WORKDIR /usr/src/precon/api

# Install app dependencies
COPY package.json /usr/src/precon/api
RUN npm install

# Bundle app source
COPY . /usr/src/precon/api

EXPOSE 3000
CMD [ "gulp", "serve" ]