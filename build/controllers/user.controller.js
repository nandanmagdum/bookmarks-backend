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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getAllUsersController = exports.getUserController = exports.loginUserController = exports.createUserController = void 0;
const user_repository_1 = require("../repositories/user.repository");
const bookmark_repository_1 = require("../repositories/bookmark.repository");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.path);
    const body = req.body;
    try {
        const user = yield (0, user_repository_1.createUserRepo)(body);
        if (user) {
            res.status(201).json({ "New User Created !": user });
        }
        else {
            res.status(500).json({ "New User": "Not Created Error !" });
        }
    }
    catch (error) {
        res.status(500).json({ "Actual Error": "Error creating new user", "Error": error });
    }
});
exports.createUserController = createUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.path);
    const body = req.body;
    try {
        const token = yield (0, user_repository_1.loginUserRepo)(body.email, body.password);
        if (token) {
            res.status(200).json({ "token": token });
        }
        else {
            res.status(500).json({ "Error": "Error loging in user" });
        }
    }
    catch (error) {
        res.status(500).json({ "Actual Error": "Error loging new user", "Error": error });
    }
});
exports.loginUserController = loginUserController;
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield (0, user_repository_1.getUserRepo)(userId);
        if (user) {
            res.status(200).json({ "User Details": user });
        }
        else {
            res.status(500).json({ "Error": "Error getting user details" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.getUserController = getUserController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, user_repository_1.getAllUsersRepo)();
        if (allUsers) {
            return res.status(200).json({ "All Users": allUsers });
        }
        else {
            res.status(500).json({ "Error": "Error getting all users" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.getAllUsersController = getAllUsersController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const success = yield (0, user_repository_1.updateUserRepo)(body);
        if (success) {
            res.status(200).json({ "Success": "User Details Updated" });
        }
        else {
            res.status(500).json({ "Error": "Error updating user details" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const success1 = yield (0, user_repository_1.deleteUserRepo)(userId);
        if (success1) {
            const success2 = yield (0, bookmark_repository_1.deleteAllBookMarksWhenUserDeleted)(userId);
            if (success2) {
                res.status(200).json({ "Status": "User and all it's data deleted !" });
            }
            else {
                res.status(500).json({ "Status": "User deleted but it's data not deleted !" });
            }
        }
        else {
            res.status(500).json({ "Error": "Error deleting user" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.deleteUserController = deleteUserController;
