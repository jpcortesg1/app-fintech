FROM node:18.15.0

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "run", "dev-host"]
