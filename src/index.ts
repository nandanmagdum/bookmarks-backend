import express, {Express, Request, Response} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import router from "./routes/router";
import authenticationMiddleWare from "./middlewares/auth.middleware";
import { skipAuth } from "./middlewares/skipauth.middleware";

dotenv.config();

// 
const app:Express = express();
const server = http.createServer(app);

// Express Configurations
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("PORT", "3000");
app.set("BASE_URL", "localhost");



// authentication middleware
app.use(skipAuth);

// routes
app.use("/api/v1", router);

// connect to mongoDB
const mongo_db_url = process.env.MONGO_DB_URL;
if(!mongo_db_url){
    console.log("MONGO DB URL not found !");
    process.exit(1);
}
mongoose.connect(mongo_db_url, {})
.then(() => {
    console.log("Mongo DB connected");
})
.catch((error) => {
    console.error("Mongo DB connection error");
});

// Start Server
try {
    const port = app.get("PORT");
    server.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
} catch (error) {
    console.log(error);
}

export default server;