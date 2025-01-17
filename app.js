const express = require('express');


const app = express();
app.use(express.json());

let rooms = [];
let bookings = [];
let RoomId = 1;
let BookingId = 1;

app.post('/rooms', (req, res) => {
    const { numberOfSeats, amenities, pricePerHour } = req.body;
    const room = {
        id: RoomId++,
        numberOfSeats,
        amenities,
        pricePerHour,
        booked: false,
    };
    rooms.push(room);
    res.status(201).json(room);
});

 
app.put('/rooms/:id',(req,res)=>{
    const id= parseInt(req.params.id);
    const room=rooms.findIndex(room=>room.id===id)
    if(room===-1){
        return res.status(404).send("room not found")
    }
rooms[room]={id,...req.body}
res.json(rooms[room])
})


app.delete('rooms/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    rooms=rooms.filter(room=>room.id!==id)
    res.status(204).send()
})


app.post('/bookings', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    
    const room = rooms.find(room => room.id === roomId);
    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    } else if (room.booked) {
        return res.status(400).json({ error: 'Room is already booked' });
    }

    const booking = {
        bookingId: BookingId++,
        roomId,
        customerName,
        date,
        startTime,
        endTime,
        bookingDate: new Date(),
        status: 'Booked'
    };

    bookings.push(booking);
    room.booked = true; 
    res.status(201).json(booking);
});

app.get('/rooms', (req, res) => {
    const roomWithBookingData = rooms.map(room => {
        const booking = bookings.find(booked => booked.roomId === room.id);
        return {
            roomName: `Room ${room.id}`,
            bookedStatus: room.booked ? 'Booked' : 'Available',
            customerName: booking ? booking.customerName : null,
            date: booking ? booking.date : null,
            startTime: booking ? booking.startTime : null,
            endTime: booking ? booking.endTime : null
        };
    });
    res.json(roomWithBookingData);
});

app.get('/customers', (req, res) => {
    const customerBookings = bookings.map(booking => {
        const room = rooms.find(r => r.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: `Room ${room.id}`,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        };
    });
    res.json(customerBookings);
});


app.get('/customer-bookings/:customerName', (req, res) => {
    const customerName = req.params.customerName;
    const customerBookings = bookings.filter(b => b.customerName === customerName);
    
    const bookingDetails = customerBookings.map(booking => {
        const room = rooms.find(r => r.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: `Room ${room.id}`,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.bookingId,
            bookingDate: booking.bookingDate,
            bookingStatus: booking.status
        };
    });

    res.json(bookingDetails);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




