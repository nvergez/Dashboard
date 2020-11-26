FROM node:12

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PORT 9001
EXPOSE 9001
CMD ["npm", "start"]