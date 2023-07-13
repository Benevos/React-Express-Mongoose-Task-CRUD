import mongoose from "mongoose";
import { DB, MONGODB_URI } from "./config.js";

const connectToMongoDB = async () =>
{
    try
    {
        await mongoose.connect(MONGODB_URI + DB);

        const db = mongoose.connection;

        console.log('DB connected to', db.name);

        return db;
    }
    catch(e)
    {
        console.log(e);
    }
}

export default connectToMongoDB;

/*import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);

async function run() 
{
    try 
    {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) 
    {
        console.log(err.stack);
    }
    finally 
    {
        await client.close();
    }
}

run().catch(console.dir); */