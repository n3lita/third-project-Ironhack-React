const express = require('express');
const router = express.Router();
const members = require('../controllers/members.controller')

router.get('/users', members.list)

module.exports = router

