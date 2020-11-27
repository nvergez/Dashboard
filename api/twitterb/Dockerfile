FROM node:12

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
ENV PORT 9002
EXPOSE 9002
CMD ["npm", "start"]