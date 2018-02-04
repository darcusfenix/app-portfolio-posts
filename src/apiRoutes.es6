// @flow
import PostRouter from "./Post/PostRouter";

export const apiRoutesConfig = app => {
    app.use(PostRouter);
};
