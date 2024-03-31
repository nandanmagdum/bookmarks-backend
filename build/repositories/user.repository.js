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
exports.deleteUserRepo = exports.updateUserRepo = exports.getAllUsersRepo = exports.getUserRepo = exports.updateUserWhenBookmarkDeletedRepo = exports.updateUserWhenBookmarkCreatedRepo = exports.loginUserRepo = exports.createUserRepo = void 0;
const user_model_1 = __importDefault(require("../database/models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const json_screat = process.env.JWT_SCREAT_KEY;
if (!json_screat) {
    console.error("Json screat key not found");
    process.exit(1);
}
const createUserRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const password = user.password;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    user.password = hashedPassword;
    try {
        const newUser = yield user_model_1.default.create(user);
        if (newUser) {
            return newUser;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
exports.createUserRepo = createUserRepo;
const loginUserRepo = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email, password);
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        console.log(user);
        if (!user) {
            return false;
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return false;
        }
        const token = yield jsonwebtoken_1.default.sign({ id: user._id, email: user.email, username: user.username, role: user.role }, json_screat, { expiresIn: 1000 * 300 });
        console.log("Yay ! JWT Created !!!!");
        console.log(token);
        return token;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
exports.loginUserRepo = loginUserRepo;
const updateUserWhenBookmarkCreatedRepo = (bookmark) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield user_model_1.default.findByIdAndUpdate({ _id: bookmark.userId }, { $push: { bookmarks: bookmark._id } });
        if (success) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserWhenBookmarkCreatedRepo = updateUserWhenBookmarkCreatedRepo;
const updateUserWhenBookmarkDeletedRepo = (bookmark) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield user_model_1.default.findByIdAndUpdate({ _id: bookmark.userId }, { $pull: { bookmarks: bookmark._id } });
        if (success) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUserWhenBookmarkDeletedRepo = updateUserWhenBookmarkDeletedRepo;
const getUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId);
        if (user) {
            return user;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
exports.getUserRepo = getUserRepo;
const getAllUsersRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_model_1.default.find();
        if (allUsers) {
            return allUsers;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
exports.getAllUsersRepo = getAllUsersRepo;
const updateUserRepo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_model_1.default.findByIdAndUpdate({ _id: user._id }, user, { new: true });
        if (updatedUser) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.updateUserRepo = updateUserRepo;
const deleteUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_model_1.default.findByIdAndDelete(userId);
        if (deletedUser) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.deleteUserRepo = deleteUserRepo;
