const bcrypt = require('bcryptjs');
const path = require('path');
const { prisma } = require('../prisma/prisma-client');
const fs = require('fs');
const Jdenticon = require('jdenticon');
const { error } = require('console');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserController = {
  register: async (req, res) => {
    const { email, password, name } = req.body;

    // Проверяем поля на существование
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    try {
      // Проверяем, существует ли пользователь с таким email
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Генерируем аватар для нового пользователя
      const png = Jdenticon.toPng(name, 200);
      const avatarName = `${name}_${Date.now()}.png`;
      const avatarPath = path.join(__dirname, '/../uploads', avatarName);
      fs.writeFileSync(avatarPath, png);

      // Создаем пользователя
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          avatarUrl: `/uploads/${avatarName}`,
        },
      });

      res.json(user);
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
    try {
      //ищем пользователя в BD
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Неверный логин или пароль' });
      }
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(400).json({ error: 'Неверный логин или пароль' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
      res.json({ token });
    } catch (error) {
      console.log('login error', error);
      res.status(500).json({ error: 'Internal server error ' });
    }
  },
  getUserById: async (req, res) => {
    res.send('getUserById');
  },
  updateUser: async (req, res) => {
    res.send('updateUser');
  },
  current: async (req, res) => {
    res.send('current');
  },
};

module.exports = UserController;
