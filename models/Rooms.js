const mongoose=require("mongoose")


const RoomSchema= new mongoose.Schema({
    id:{type:Number,required:true},
    numberOfSeats:{type:Number,required:true},
    amenities:{type:String,required:true},
    PricePerHour:{type:String,required:true},
    booked:{type:Boolean,default:false}


})

module.exports=mongoose.model("Rooms",RoomSchema)
