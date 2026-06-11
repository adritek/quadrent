FROM node:26.3.0-alpine

WORKDIR /app

COPY package*.json ./
# RUN npm ci --ignore-scripts --no-workspaces
RUN npm install --ignore-scripts

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/index.js"]