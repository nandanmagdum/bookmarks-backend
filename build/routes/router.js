"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const bookmark_router_1 = __importDefault(require("./bookmark.router"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({ "Server": "Server is live !!!" });
});
router.use("/auth", user_route_1.default);
router.use("/bookmark", bookmark_router_1.default);
exports.default = router;
