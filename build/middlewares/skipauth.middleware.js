"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skipAuth = void 0;
const auth_middleware_1 = __importDefault(require("./auth.middleware"));
const skipAuth = (req, res, next) => {
    console.log(req.path);
    if (req.path === "/api/v1/auth/login" || req.path === "/api/v1/auth/signup") {
        next();
    }
    else {
        (0, auth_middleware_1.default)(req, res, next);
    }
};
exports.skipAuth = skipAuth;
