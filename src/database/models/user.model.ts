import mongoose, { Schema, Document, SchemaType } from "mongoose";
import { IUserInterface } from "../interfaces/user.interface";
import { IBookMarkInterface } from "../interfaces/bookmark.interface";

const userSchema = new Schema<IUserInterface>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    bookmarks: [{type: Schema.Types.ObjectId, ref: "bookmarkModel", default: []}]
}, { timestamps: true });

const userModel = mongoose.model<IUserInterface>("userModel", userSchema);

export default userModel;