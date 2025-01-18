const express = require('express');
const router = express.Router();
const {createBooking,getBookings,getCustomerBookings} = require('../contollers/BookingContoller.js');

router.post('/', createBooking)
router.get('/', getBookings)
router.get('/:customerName', getCustomerBookings)

module.exports = router;
