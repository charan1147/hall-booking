const express = require('express');
const router = express.Router();
const {createRoom,getRooms} = require('../contollers/RoomContoller');

router.post('/', createRoom)
router.get('/', getRooms)

module.exports = router;
 

