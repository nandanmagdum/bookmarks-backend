import mongoose from "mongoose";
import { IUserInterface } from "../database/interfaces/user.interface";
import userModel from "../database/models/user.model";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import bookmarkModel from "../database/models/bookmark.model";
import { IBookMarkInterface } from "../database/interfaces/bookmark.interface";
dotenv.config();

const json_screat = process.env.JWT_SCREAT_KEY;
if(!json_screat){
    console.error("Json screat key not found");
    process.exit(1);
}

export const createUserRepo = async(user:IUserInterface):Promise<IUserInterface | null> => {
    const password = user.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    try {
        const newUser = await userModel.create(user);
        if(newUser){
            return newUser;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const loginUserRepo = async(email:string, password: string):Promise<string | boolean> => {
    console.log(email, password);
    try {
        const user = await userModel.findOne({email: email});
        console.log(user);
        if(!user){
            return false;
        }
        if (!await bcrypt.compare(password, user.password)){
            return false;
        }

        const token = await jsonwebtoken.sign({id: user._id,email: user.email, username: user.username, role: user.role}, json_screat, {expiresIn: 1000*300});
        console.log("Yay ! JWT Created !!!!");
        console.log(token);
        return token;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const updateUserWhenBookmarkCreatedRepo = async(bookmark:IBookMarkInterface):Promise<boolean> => {
    try {
        const success = await userModel.findByIdAndUpdate({_id: bookmark.userId}, {$push: {bookmarks: bookmark._id}});
        if(success){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const updateUserWhenBookmarkDeletedRepo = async(bookmark:IBookMarkInterface):Promise<boolean> => {
    try {
        const success = await userModel.findByIdAndUpdate({_id: bookmark.userId}, {$pull: {bookmarks: bookmark._id}});
        if(success){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getUserRepo = async(userId: string):Promise<IUserInterface | null> => {
    try {
        const user = await userModel.findById(userId);
        if(user){
            return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const getAllUsersRepo = async():Promise<IUserInterface[] | null> => {
    try {
        const allUsers = await userModel.find();
        if(allUsers){
            return allUsers;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

export const updateUserRepo = async(user:IUserInterface):Promise<boolean> => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate({_id:user._id}, user, {new: true});
        if(updatedUser){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export const deleteUserRepo = async(userId:string):Promise<boolean> => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if(deletedUser){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}