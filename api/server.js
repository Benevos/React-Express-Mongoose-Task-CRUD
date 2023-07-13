import express from 'express';
import connectToMongoDB from "./database.js";
import indexRoutes from './routes/index.routes.js'
import { PORT } from './config.js';

const db = await connectToMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(indexRoutes);

app.listen(PORT);

console.log('Server started on port: ' + PORT);

/* const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";
const targetDatabse = process.env.DB || "mongo-test";

mongoose.connect(uri + targetDatabse);

const db = mongoose.connection;

db.on('connected', () =>
{
    console.log("Connected to DB:", db.name);
})

db.on('error', () =>
{
    console.error.bind(console, "Connection error:");
}) */

/*
import expressWs from 'express-ws';
import webSockets from './controllers/websocket-controller.js'

app.use(webSockets);
*/