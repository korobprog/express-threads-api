# Используем образ линукс Apline с версией node 14 
FROM node:19.5.0-alpine

# Указываем нашу рабочию деректорию
WORKDIR /app

# Скопировать package.json и package-lock.json внутрь контейнера

COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем оставшееся приложение в контейнер

COPY  . .

# Установить Prisma
RUN npm install -g prisma

# Генерируем Prisma client 
RUN prisma generate

# Копируем Prisma schema и URL базы данных в контейнер
COPY prisma/schema.prisma ./prisma/

# Открыть порт в нашем контейнере
EXPOSE 3000

# Запускаем наш сервер
CMD ["npm" , "start"]

