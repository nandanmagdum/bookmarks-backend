import mongoose, { Schema } from "mongoose";
import { IBookMarkInterface } from "../interfaces/bookmark.interface";
import {v4} from "uuid";

export const bookmarkSchema = new Schema<IBookMarkInterface>({
    url: {type: String, required: true},
    title: {type: String, required: true},
    folder: {type: String, default: null},
    category: {type: String, default: null},
    userId: {type: String, required : true},
    tags: {type: [String], default : []},
});

const bookmarkModel = mongoose.model<IBookMarkInterface>("bookmarkModel", bookmarkSchema);

export default bookmarkModel;