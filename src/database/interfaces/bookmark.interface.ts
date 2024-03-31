import { Document } from "mongoose";

export interface IBookMarkInterface extends Document {
    _id: string,
    url: string,
    title: string,
    folder: string,
    category: string,
    userId: string,
    tags : string[]
};

