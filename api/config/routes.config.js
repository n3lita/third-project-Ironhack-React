const express = require('express');
const router = express.Router();
const members = require('../controllers/members.controller')
const member = require('../middlewares/member.mid')
const passport = require('passport')
const secure = require('../middlewares/secure.mid')

router.post('/register', members.create);
router.get('/members',  members.list);
router.get('/members/:memberId',  member.exists, members.detail);
router.put('/members/:memberId',  member.exists, members.edit);

router.post('/login', members.login);
router.post('/logout', members.logout);

module.exports = router;

