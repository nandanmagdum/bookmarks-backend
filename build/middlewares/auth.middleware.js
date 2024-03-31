"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const screat_key = process.env.JWT_SCREAT_KEY;
if (!screat_key) {
    process.exit(1);
}
const authenticationMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    // check if token is present
    if (!token) {
        return res.status(401).json({ "Authentication Error": "User is not authenticated" });
    }
    // if present verify the token
    const verfication = yield jsonwebtoken_1.default.verify(token, screat_key, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401).json({ "Authentication Error": "The token is invalid !" });
        }
        else {
            if (decoded) {
                // req.user = decoded;
                next();
            }
            else {
                res.status(401).json({ "Authentication Error": "Unknown auth error" });
            }
        }
    });
    // if(!verfication){
    //     return res.status(401).json({"Authentication Error": "User is not authenticated"});
    // } else {
    //     next();
    // }
});
exports.default = authenticationMiddleWare;
