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
exports.deleteAllBookMarksWhenUserDeleted = exports.getAllBookmarksofUserRepo = exports.getAllBookmarksRepo = exports.getABookmarkRepo = exports.updateBookMarkRepo = exports.deleteBookmarkRepo = exports.createBookmarkRepo = void 0;
const bookmark_model_1 = __importDefault(require("../database/models/bookmark.model"));
const createBookmarkRepo = (bookmark) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBookMark = yield bookmark_model_1.default.create(bookmark);
        if (newBookMark) {
            return newBookMark;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
exports.createBookmarkRepo = createBookmarkRepo;
const deleteBookmarkRepo = (bookmarkId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield bookmark_model_1.default.findByIdAndDelete(bookmarkId);
        if (success) {
            return success;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.deleteBookmarkRepo = deleteBookmarkRepo;
const updateBookMarkRepo = (bookmark) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedbookmark = yield bookmark_model_1.default.findByIdAndUpdate({ _id: bookmark._id }, bookmark, { new: true });
        if (updatedbookmark)
            return true;
        else
            return false;
    }
    catch (error) {
        console.log(":::::::::::::::::::::::", error);
        return false;
    }
});
exports.updateBookMarkRepo = updateBookMarkRepo;
const getABookmarkRepo = (bookmarkId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookmark = yield bookmark_model_1.default.findById(bookmarkId);
        if (bookmark) {
            return bookmark;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(":::::::::::::::", error);
        return null;
    }
});
exports.getABookmarkRepo = getABookmarkRepo;
const getAllBookmarksRepo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookmarks = yield bookmark_model_1.default.find();
        if (allBookmarks) {
            return allBookmarks;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
exports.getAllBookmarksRepo = getAllBookmarksRepo;
const getAllBookmarksofUserRepo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookmarks = yield bookmark_model_1.default.find({ userId: userId });
        if (allBookmarks) {
            return allBookmarks;
        }
        else {
            return null;
        }
    }
    catch (error) {
        return null;
    }
});
exports.getAllBookmarksofUserRepo = getAllBookmarksofUserRepo;
const deleteAllBookMarksWhenUserDeleted = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookmarks = yield bookmark_model_1.default.deleteMany({ userId: userId });
        if (allBookmarks) {
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
exports.deleteAllBookMarksWhenUserDeleted = deleteAllBookMarksWhenUserDeleted;
