// @flow
import log4js from "log4js";
import { getPostModel } from "./PostFactory";
import { PostValidation } from "app-portfolio-core/module/Post";

const log = log4js.getLogger("USER-CONTROLLER");

export const get = async (req, res) => {
        const Post = await getPostModel();

        let query = {};

        if (req.query.name) {
            query.name = req.query.name;
        }

        Post.find(query, (err, catalogTypes) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(catalogTypes);
            }
        });
    },
    getById = (req, res) => {
        if (req.user === null) {
            res.statusCode = 404;
            res.json({ message: "not found" });
        } else {
            res.json(req.user);
        }
    },
    preRequestById = async (req, res, next) => {
        const Post = await getPostModel();
        const query = Post.findById({ _id: req.params.id });
        query
            .exec()
            .then(user => {
                req.user = user;
                log.debug(user);
                next();
            })
            .catch(error => {
                log.error(error);
                res.statusCode = 404;
                res.json({ message: error });
            });
    };
