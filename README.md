# Стек

- 🛠️ React
- 💾 Typescript
- ⭐️ Node.js Express
- 🎨 Rexux Toolkit
- ↩️ RTK Query
- ⌨️ React Hook Form
- 🤝 Docker
- 🧰 Docker Compose
- 🔐 База данных из Docker
- 🌐 React 18
- 💅 Next UI

# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий с api по ссылке https://github.com/korobprog/express-threads-api.git на свой компьютер.

```
git clone https://github.com/korobprog/express-threads-api.git
```

2. Склонировать репозиторий с клиентским приложением по ссылке [https://github.com/korobprog/react-threads.git](https://github.com/korobprog/react-client) на свой компьютер.

```
git clone https://github.com/korobprog/react-threads.git
```

3. Открыть терминал (или командную строку) и перейти в корневую директорию сервера.

```
cd express-threads-api
```

4. Переименовать файл .env.local (убрать .local)

```
.env
```

5. Запустить команду docker compose которая поднимет сервер, клиент и базу данных

```
docker compose up
```

6. Открыть браузер и перейти по адресу http://localhost:80, чтобы увидеть запущенный проект.

# Если вы хотите скачать образ базы данных MongoDB

Запустите контейнер с образом MongoDB и настройками replica set (он автоматичиски скачает и запустит этот образ):

```
  docker run --name mongo \
       -p 27017:27017 \
       -e MONGO_INITDB_ROOT_USERNAME="monty" \
       -e MONGO_INITDB_ROOT_PASSWORD="pass" \
       -d prismagraphql/mongo-single-replica:5.0.3
```
