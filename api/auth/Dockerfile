FROM node:12

WORKDIR /app
COPY package*.json ./
RUN npm install -qy
COPY . .
ENV PORT 9000
EXPOSE 9000
CMD ["npm", "start"]