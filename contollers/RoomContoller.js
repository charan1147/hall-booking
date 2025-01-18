const rooms = [];
let RoomId = 1;

exports.createRoom = (req, res) => {
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
};

exports.getRooms = (req, res) => {
    res.json(rooms);
};

exports.rooms = rooms;
