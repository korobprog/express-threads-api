const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  UserController,
  PostController,
  CommentController,
  LikeController,
  FollowController,
  ChatController,
} = require('../controllers');
const { authenticateToken } = require('../middleware/auth');

const uploadDestination = 'uploads';

//Показываем где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });
// Роуты User
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authenticateToken, UserController.current);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put(
  '/users/:id',
  authenticateToken,
  uploads.single('avatar'),
  UserController.updateUser
);
// Роуты Posts
router.post('/posts', authenticateToken, PostController.createPost);
router.get('/posts', authenticateToken, PostController.getALLPosts);
router.get('/posts/:id', authenticateToken, PostController.getPostById);
router.delete('/posts/:id', authenticateToken, PostController.deletePost);
// Роуты Comments
router.post('/comments', authenticateToken, CommentController.createComment);
router.delete(
  '/comments/:id',
  authenticateToken,
  CommentController.deleteComment
);

// Роуты подписки
router.post('/follow', authenticateToken, FollowController.followUser);
router.delete(
  '/unfollow/:id',
  authenticateToken,
  FollowController.unfollowUser
);

//Роутер Likes
router.post('/likes', authenticateToken, LikeController.likePost);
router.delete('/likes/:id', authenticateToken, LikeController.unlikePost);

module.exports = router;

// Чат
router.post('/chats', authenticateToken, ChatController.createChat);
router.get('/chats', authenticateToken, ChatController.getAllChat);
router.get('/chats/:id', authenticateToken, ChatController.getChatById);
