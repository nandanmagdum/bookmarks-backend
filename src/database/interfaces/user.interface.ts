import { Document } from "mongoose";
import { IBookMarkInterface } from "./bookmark.interface";

export interface IUserInterface extends Document {
    username : string,
    email : string,
    password : string,
    name : string,
    role : string,
    bookmarks : IBookMarkInterface[]
}