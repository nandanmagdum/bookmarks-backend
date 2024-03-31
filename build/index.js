"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
const skipauth_middleware_1 = require("./middlewares/skipauth.middleware");
dotenv_1.default.config();
// 
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Express Configurations
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set("PORT", "3000");
app.set("BASE_URL", "localhost");
// authentication middleware
app.use(skipauth_middleware_1.skipAuth);
// routes
app.use("/api/v1", router_1.default);
// connect to mongoDB
const mongo_db_url = process.env.MONGO_DB_URL;
if (!mongo_db_url) {
    console.log("MONGO DB URL not found !");
    process.exit(1);
}
mongoose_1.default.connect(mongo_db_url, {})
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
}
catch (error) {
    console.log(error);
}
exports.default = server;
