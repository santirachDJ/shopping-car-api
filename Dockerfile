#Stage 1 building the code
# FROM node:14.7.0-alpine3.10 as builder

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run clean
# RUN npm run build

# # Stage 2
# FROM node:14.7.0-alpine3.10

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install pm2 -g
# RUN npm install
# COPY --from=builder /usr/src/app/dist ./dist
# CMD ["pm2-runtime", "./dist/index.js"]




FROM node:14.7.0-alpine3.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm","start"]