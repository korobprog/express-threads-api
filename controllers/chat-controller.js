const { prisma } = require('../prisma/prisma-client');

const ChatController = {
  createChat: async (req, res) => {
    const { content } = req.body;
    const authorId = req.user.userId;

    if (!content) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
    try {
      const chat = await prisma.chat.create({
        data: {
          content,
          authorId,
        },
      });
      res.json(chat);
    } catch (error) {
      console.error('Create chat error', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllChat: async (req, res) => {
    const userId = req.user.userId;
    try {
      const chats = await prisma.chat.findMany({
        include: {
          author: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const chatWithInfo = chats.map((chat) => ({
        ...chat,
        author: chat.author,
      }));
      res.json(chatWithInfo);
    } catch (error) {
      console.error('get all chat error', error);
      res.status(500).json({ error: 'Произошла ошибка при получении чата' });
    }
  },
  getChatById: async (req, res) => {
    const { id } = req.params;
    try {
      const chat = await prisma.chat.findUnique({
        where: { id },
      });
      if (!chat) {
        res.status(404).json({ error: 'Пост чата не найден' });
      }
      const chatWithInfo = {
        ...chat,
      };
      res.json(chatWithInfo);
    } catch (error) {
      console.error('Get Chat by Id error', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = ChatController;
