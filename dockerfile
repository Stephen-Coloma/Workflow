# use official node js runtime and alpine
FROM node:22-alpine

# set the working directory
WORKDIR /app

# copy package.json in the app directory
COPY package*.json ./

# install app dependencies
RUN npm install

# copy remaining files
COPY . .

# build the source code that generates /dist folder
RUN npm run build

CMD ["node", "dist/src/index.js"]