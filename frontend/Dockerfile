# Etapa 1: Construcción de la aplicación React
FROM node:18.15.0 AS build-stage

WORKDIR /app

RUN npm install -g pnpm

COPY . /app

RUN pnpm install

RUN pnpm run build

# Etapa 2: Utiliza la imagen oficial de Nginx como base
FROM nginx:latest

# Copia los archivos estáticos de la aplicación React desde la etapa de construcción
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
