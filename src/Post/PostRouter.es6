// @flow
import { Router } from "express";

import {
    get,
    getById,
    patch,
    post,
    preRequestById,
    put,
    remove
} from "./PostController";

const userRouter = Router();

userRouter.route("/posts/").post(post).get(get);

userRouter.use("/posts/:id", preRequestById);

userRouter
    .route("/posts/:id")
    .get(getById)
    .put(put)
    .patch(patch)
    .delete(remove);

export default userRouter;
