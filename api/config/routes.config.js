const express = require('express');
const router = express.Router();
const members = require('../controllers/members.controller')

router.post('/register', members.create);
router.get('/members', members.list);
router.get('/members/:id', members.detail);
router.put('/members/:id', members.edit);
module.exports = router;

