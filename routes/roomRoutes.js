const express = require('express');
const router = express.Router();
const {createRoom,getRooms} = require('../contollers/RoomContoller');

router.post('/rooms', createRoom)
router.get('/rooms', getRooms)

module.exports = router;
 

