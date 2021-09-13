const express = require('express');
const router = express.Router();
const members = require('../controllers/members.controller')
const member = require('../middlewares/member.mid')
const passport = require('passport')
const secure = require('../middlewares/secure.mid')
const meetups = require('../controllers/meetups.controller')
const conversations = require('../controllers/conversations.controller')
const upload = require('../config/multer.config')

router.get('/members', secure.isAuthenticated, members.list);
router.get('/members/:memberId', secure.isAuthenticated, member.exists, members.detail);
router.patch('/members/:memberId', secure.isAuthenticated, member.exists, upload.single('profilePicture'),  members.edit);

router.post('/register', secure.isNotAuthenticated, upload.single('profilePicture'), members.register);
router.post('/login', secure.isNotAuthenticated, members.login);
router.post('/logout', secure.isAuthenticated, members.logout);

router.get('/authenticate/google', members.loginWithGoogle)
router.get('/authenticate/google/cb', members.doLoginWithGoogle)

router.get('/meetups', secure.isAuthenticated, meetups.list);
router.post('/meetups/create', secure.isAuthenticated, meetups.create);
router.get('/meetups/:meetupId', secure.isAuthenticated, meetups.detail);
router.patch('/meetups/:meetupId', secure.isAuthenticated, meetups.edit)
router.delete('/meetups/:meetupId', secure.isAuthenticated, meetups.delete);
router.post('/meetups/:meetupId/subscribe', secure.isAuthenticated, meetups.subscribe);
router.post('/meetups/:meetupId/comments', secure.isAuthenticated, meetups.createComment);


router.post('/conversation/:receiverId', secure.isAuthenticated, conversations.create)
router.get('/conversations', secure.isAuthenticated, conversations.list)
router.delete('/conversations/:conversationId', secure.isAuthenticated, conversations.delete)
router.post('/conversations/:conversationId', secure.isAuthenticated, conversations.createMessage)
router.get('/conversations/:conversationId', secure.isAuthenticated, conversations.detail)

module.exports = router;

