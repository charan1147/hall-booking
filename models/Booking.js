const mongoose=require("mongoose")

const BookingSchema=new mongoose.Schema({
    bookingId:{type:Number,required:true},
    roomId:{type:Number,required:true},
    customerName:{type:String,required:true},
    date:{type:Date,required:true},
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    bookingDate:{type:Date,required:true},
    status:{type:String,default:"Booked"}


})

module.exports=mongoose.model("Booking",BookingSchema)