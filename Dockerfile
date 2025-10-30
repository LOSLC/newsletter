FROM node:25


WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "run", "db:migrate", "&&", "npm", "run", "start"]
