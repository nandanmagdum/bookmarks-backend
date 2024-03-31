import { Router , Request, Response} from "express";
import userRouter from "./user.route";
import bookmarkRouter from "./bookmark.router";

const router = Router();

router.get("/", (req:Request, res:Response) => {
    res.json({"Server": "Server is live !!!"});
});

router.use("/auth", userRouter);
router.use("/bookmark", bookmarkRouter);

export default router;  