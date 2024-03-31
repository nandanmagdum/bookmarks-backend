import { Request, Response } from "express";
import { IUserInterface } from "../database/interfaces/user.interface";
import { IBookMarkInterface } from "../database/interfaces/bookmark.interface";
import userModel from "../database/models/user.model";
import bookmarkModel from "../database/models/bookmark.model";
import { createBookmarkRepo, deleteBookmarkRepo, getABookmarkRepo, getAllBookmarksRepo, getAllBookmarksofUserRepo, updateBookMarkRepo } from "../repositories/bookmark.repository";
import { updateUserWhenBookmarkCreatedRepo, updateUserWhenBookmarkDeletedRepo } from "../repositories/user.repository";

export const createBookmarkController = async(req:Request, res:Response) => {
    const body = req.body;
    try {
        const bookmark = await createBookmarkRepo(body);
        if(bookmark){
            const success2 = await updateUserWhenBookmarkCreatedRepo(bookmark);
            if(success2) {
                res.status(200).json({"Success": "Bookmark created and user updated"});
            } else {
                res.status(500).json({"Success": "Bookmark created but user not updated"});
            }
        } else {
        res.status(500).json({"Error": "Bookmark not created"});
        }
    } catch (error) {
        res.status(500).json({"Error": error});
    }
}

export const deleteBookmarkController = async(req:Request, res:Response) => {
    const bookmarkId = req.params.id;
    try {
        const success = await deleteBookmarkRepo(bookmarkId);
        if(success){
            const success2 = await updateUserWhenBookmarkDeletedRepo(success);
            if(success2){
                res.status(200).json({"Success": "Bookmark Deleted and bookmark updated"});
            } else {
                res.status(500).json({"Success": "Bookmark Deleted but user not updated"});
            }
        } else {
        res.status(500).json({"Error": "Bookmark not deleted"});
        }
    } catch (error) {
        res.status(500).json({"Error": error});
    }
}

export const updateBookmarkController = async(req:Request, res:Response) => {
    const body = req.body;
    try {
        const success = await updateBookMarkRepo(body);
        if(success){
            res.status(200).json({"Success": "Bookmark Updated"});
        } else {
            res.status(500).json({"Error": "Bookmark not Updated"});
        }
    } catch (error) {
        res.status(500).json({"Error": error});
    }
}

export const getABookmarkController = async(req:Request, res:Response) => {
    const bookmarkId = req.params.id;
    try {
        const success = await getABookmarkRepo(bookmarkId);
        if(success){
            res.status(200).json({"Bookmark": success});
        } else {
            res.status(500).json({"Error": "Error getting bookmark"});
        }
    } catch (error) {
        res.status(500).json({"Error": error});
    }
}

export const getAllBookmarksController = async(req:Request, res:Response) => {
    try {
        const success = await getAllBookmarksRepo();
        if(success){
            res.status(200).json({"All Bookmarks": success});
        } else {
            res.status(500).json({"Error": "Error getting bookmark"});
        }
    } catch (error) {
        res.status(500).json({"Error": error});
    }
}

export const getAllBookmarksofUserController = async(req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const success = await getAllBookmarksofUserRepo(id);
        if(success){
            res.status(200).json({"All Bookmarks": success});
        } else {
            res.status(500).json({"Error": "Error getting bookmarks"});
        }
    } catch (error) {
        res.status(500).json({"Error": error});
    }
}