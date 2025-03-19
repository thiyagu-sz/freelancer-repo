import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, {
       useNewUrlParser: true,
       useUnifiedTopology: true
    })     
//    try { mongoose.connect('mongodb://127.0.0.1:27017/prescripto', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     })
//     then(() => {
//     console.log('Connected to MongoDB');
//     })}
//     catch(error) {
//     console.error('Error connecting to MongoDB:', error);
//     };  


   
}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.