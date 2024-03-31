import { Request, Response } from "express";
import { createUserRepo, deleteUserRepo, getAllUsersRepo, getUserRepo, loginUserRepo, updateUserRepo } from "../repositories/user.repository";
import { deleteAllBookMarksWhenUserDeleted, getAllBookmarksofUserRepo } from "../repositories/bookmark.repository";

export const createUserController = async(req:Request, res:Response) => {
    console.log(req.path);
    
    const body = req.body;
    try {
        const user = await createUserRepo(body);
        if(user){
            res.status(201).json({"New User Created !" : user});
        } else {
            res.status(500).json({"New User": "Not Created Error !"});
        }
    } catch (error) {
        res.status(500).json({"Actual Error" : "Error creating new user","Error" : error});
    }
}

export const loginUserController = async(req:Request, res:Response) => {
    console.log(req.path);

    const body = req.body;
    try {
        const token = await loginUserRepo(body.email, body.password);
        if(token){
            res.status(200).json({"token": token});
        } else {
            res.status(500).json({"Error": "Error loging in user"});
        }
    } catch (error) {
        res.status(500).json({"Actual Error" : "Error loging new user","Error" : error});
    }
}

export const getUserController = async(req:Request, res:Response) => {
    const userId = req.params.id;
    try {
        const user = await getUserRepo(userId);
        if(user){
            res.status(200).json({"User Details": user});
        } else {
            res.status(500).json({"Error" : "Error getting user details"});
        }
    } catch (error) {
        res.status(500).json({"Error" : error});
    }
}

export const getAllUsersController = async(req:Request, res:Response) => {
    try {
        const allUsers = await getAllUsersRepo();
        if(allUsers){
            return res.status(200).json({"All Users": allUsers});
        } else {
            res.status(500).json({"Error" : "Error getting all users"});
        }
    } catch (error) {
        res.status(500).json({"Error" : error});
    }
}

export const updateUserController = async(req:Request, res:Response) => {
    const body = req.body;
    try {
        const success = await updateUserRepo(body);
        if(success){
            res.status(200).json({"Success": "User Details Updated"});
        } else {
            res.status(500).json({"Error": "Error updating user details"});
        }
    } catch (error) {
        res.status(500).json({"Error" : error});
    }
}

export const deleteUserController = async(req:Request, res:Response) => {
    const userId = req.params.id;
    try {
        const success1 = await deleteUserRepo(userId);
        if(success1){
            const success2 = await deleteAllBookMarksWhenUserDeleted(userId);
            if(success2) {
                res.status(200).json({"Status": "User and all it's data deleted !"});
            } else{
                res.status(500).json({"Status": "User deleted but it's data not deleted !"});
            }
        } else {
            res.status(500).json({"Error": "Error deleting user"});
        }
    } catch (error) {
        res.status(500).json({"Error" : error});
    }
}