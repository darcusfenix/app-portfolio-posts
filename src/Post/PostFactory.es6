// @flow
import { PostModel } from "app-portfolio-core/module/Post";
import { connect } from "app-portfolio-core/db";

export const getPostModel = async () => {
    try {
        const conn = await connect();

        return conn.model("Post", PostModel);
    } catch (err) {
        throw err;
    }
};
