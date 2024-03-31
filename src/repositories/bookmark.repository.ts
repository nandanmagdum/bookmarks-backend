import mongoose from "mongoose";
import { IUserInterface } from "../database/interfaces/user.interface";
import { IBookMarkInterface } from "../database/interfaces/bookmark.interface";
import userModel from "../database/models/user.model";
import bookmarkModel from "../database/models/bookmark.model";

export const createBookmarkRepo = async(bookmark:IBookMarkInterface) => {
    try {
        const newBookMark = await bookmarkModel.create(bookmark);
        if(newBookMark){
            return newBookMark;
        } else {
            return null;
        }
    } catch (error) {
        return null ;
    }
}

export const deleteBookmarkRepo = async(bookmarkId: string):Promise<IBookMarkInterface | null> => {
    try {
        const success = await bookmarkModel.findByIdAndDelete(bookmarkId);
        if(success){
            return success;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateBookMarkRepo = async(bookmark:IBookMarkInterface):Promise<boolean> => {
    try {
        const updatedbookmark = await bookmarkModel.findByIdAndUpdate({_id: bookmark._id}, bookmark, {new: true});
        if(updatedbookmark) return true;
        else return false;
    } catch (error) {
        console.log(":::::::::::::::::::::::",error);
        return false;
    }
}

export const getABookmarkRepo = async(bookmarkId: string):Promise<IBookMarkInterface | null> => {
    try {
        const bookmark = await bookmarkModel.findById(bookmarkId);
        if(bookmark){
            return bookmark;
        } else {
            return null;
        }
    } catch (error) {
        console.log(":::::::::::::::", error);
        return null;
    }
}

export const getAllBookmarksRepo = async():Promise<IBookMarkInterface[] | null> => {
    try {
        const allBookmarks = await bookmarkModel.find();
        if(allBookmarks){
            return allBookmarks;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const getAllBookmarksofUserRepo = async(userId:string):Promise<IBookMarkInterface[] | null> => {
    try {
        const allBookmarks = await bookmarkModel.find({userId: userId});
        if(allBookmarks){
            return allBookmarks;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const deleteAllBookMarksWhenUserDeleted = async(userId:string):Promise<boolean> => {
    try {
        const allBookmarks = await bookmarkModel.deleteMany({userId:userId});
        if(allBookmarks){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}