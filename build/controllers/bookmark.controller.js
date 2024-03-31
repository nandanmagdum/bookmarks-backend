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
exports.getAllBookmarksofUserController = exports.getAllBookmarksController = exports.getABookmarkController = exports.updateBookmarkController = exports.deleteBookmarkController = exports.createBookmarkController = void 0;
const bookmark_repository_1 = require("../repositories/bookmark.repository");
const user_repository_1 = require("../repositories/user.repository");
const createBookmarkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const bookmark = yield (0, bookmark_repository_1.createBookmarkRepo)(body);
        if (bookmark) {
            const success2 = yield (0, user_repository_1.updateUserWhenBookmarkCreatedRepo)(bookmark);
            if (success2) {
                res.status(200).json({ "Success": "Bookmark created and user updated" });
            }
            else {
                res.status(500).json({ "Success": "Bookmark created but user not updated" });
            }
        }
        else {
            res.status(500).json({ "Error": "Bookmark not created" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.createBookmarkController = createBookmarkController;
const deleteBookmarkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookmarkId = req.params.id;
    try {
        const success = yield (0, bookmark_repository_1.deleteBookmarkRepo)(bookmarkId);
        if (success) {
            const success2 = yield (0, user_repository_1.updateUserWhenBookmarkDeletedRepo)(success);
            if (success2) {
                res.status(200).json({ "Success": "Bookmark Deleted and bookmark updated" });
            }
            else {
                res.status(500).json({ "Success": "Bookmark Deleted but user not updated" });
            }
        }
        else {
            res.status(500).json({ "Error": "Bookmark not deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.deleteBookmarkController = deleteBookmarkController;
const updateBookmarkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const success = yield (0, bookmark_repository_1.updateBookMarkRepo)(body);
        if (success) {
            res.status(200).json({ "Success": "Bookmark Updated" });
        }
        else {
            res.status(500).json({ "Error": "Bookmark not Updated" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.updateBookmarkController = updateBookmarkController;
const getABookmarkController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookmarkId = req.params.id;
    try {
        const success = yield (0, bookmark_repository_1.getABookmarkRepo)(bookmarkId);
        if (success) {
            res.status(200).json({ "Bookmark": success });
        }
        else {
            res.status(500).json({ "Error": "Error getting bookmark" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.getABookmarkController = getABookmarkController;
const getAllBookmarksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield (0, bookmark_repository_1.getAllBookmarksRepo)();
        if (success) {
            res.status(200).json({ "All Bookmarks": success });
        }
        else {
            res.status(500).json({ "Error": "Error getting bookmark" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.getAllBookmarksController = getAllBookmarksController;
const getAllBookmarksofUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const success = yield (0, bookmark_repository_1.getAllBookmarksofUserRepo)(id);
        if (success) {
            res.status(200).json({ "All Bookmarks": success });
        }
        else {
            res.status(500).json({ "Error": "Error getting bookmarks" });
        }
    }
    catch (error) {
        res.status(500).json({ "Error": error });
    }
});
exports.getAllBookmarksofUserController = getAllBookmarksofUserController;
