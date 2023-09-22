FROM node:18.15.0

WORKDIR /app

RUN npm install -g pnpm

COPY . /app

RUN pnpm install

RUN pnpm run build

CMD ["pnpm", "start"]
