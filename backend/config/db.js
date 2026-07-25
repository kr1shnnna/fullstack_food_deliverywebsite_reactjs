import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://krishna9842740994_db_user:0ovFbq1qfDPIu4Z6@cluster0.dt0h4tz.mongodb.net/food-delivery')
    .then(()=>{
        console.log('MongoDB connected');
    })
}