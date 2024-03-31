import { Router } from "express";
import { createBookmarkController, deleteBookmarkController, getABookmarkController, getAllBookmarksController, getAllBookmarksofUserController, updateBookmarkController } from "../controllers/bookmark.controller";
import { updateBookMarkRepo } from "../repositories/bookmark.repository";

const bookmarkRouter = Router();

bookmarkRouter.post("/", createBookmarkController);
bookmarkRouter.delete("/:id", deleteBookmarkController);
bookmarkRouter.patch("/", updateBookmarkController);
bookmarkRouter.get("/all", getAllBookmarksController);
bookmarkRouter.get("/all/:id", getAllBookmarksofUserController);
bookmarkRouter.get("/:id", getABookmarkController);
export default bookmarkRouter;