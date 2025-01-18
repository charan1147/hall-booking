const mongoose=require("mongoose")


const connectDB=async (MONGO_URI)=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("mongodb connected",MONGO_URI);
        
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports=connectDB