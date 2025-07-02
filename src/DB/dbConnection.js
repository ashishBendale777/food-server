import mongoose from "mongoose";

let DB_URL = "mongodb://127.0.0.1:27017/db-food-20025";

async function connectToDatabase() {
    try {
        let connection = await mongoose.connect(DB_URL)
        console.log("DB CONNECTED", connection.connection.name);
    } catch (error) {
        console.log(error);
    }
}

export { connectToDatabase }