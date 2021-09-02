const express = require('express');
const router = express.Router();
const members = require('../controllers/members.controller')
const member = require('../middlewares/member.mid')
const passport = require('passport')
const secure = require('../middlewares/secure.mid')
const meetups = require('../controllers/meetups.controller')

router.get('/members', members.list);
router.get('/members/:memberId', member.exists, members.detail);
router.patch('/members/:memberId', member.exists, members.edit);

router.post('/register', secure.isNotAuthenticated, members.create);
router.post('/login', secure.isNotAuthenticated, members.login);
router.post('/logout', members.logout);

router.get('/meetups', meetups.list);
router.post('/meetups/create', meetups.create);
router.get('/meetups/:meetupId', meetups.detail);
router.delete('/meetups/:meetupId', meetups.delete);
router.post('/meetups/:meetupId/subscribe', meetups.subscribe);
router.post('/meetups/:meetupId/comments', meetups.createComment);


module.exports = router;

