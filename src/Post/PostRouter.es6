// @flow
import { Router } from "express";

import {
    get,
    getById,
    preRequestById
} from "./PostController";

const userRouter = Router();

userRouter.route("/posts/").get(get);
userRouter.use("/posts/:id", preRequestById);
userRouter.route("/posts/:id").get(getById);

export default userRouter;
