import mongoose from "mongoose";
import 'dotenv/config'

const mongoURI = process.env.MONGOURI;

const connectTOMongoDB = async () => {
    mongoose.set('strictQuery', true);

    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to MongoDB successfully");
    })
        .catch((err) => {
            console.log("Error connecting to MongoDB:", err);
        });

}


export default connectTOMongoDB;