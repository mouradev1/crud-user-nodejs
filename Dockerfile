FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV HOST_DB=${HOST_DB}
CMD ["npm", "start"]