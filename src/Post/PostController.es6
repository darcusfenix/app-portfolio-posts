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
    patch = (req, res) => {
        if (req.body._id) {
            delete req.body._id;
        }

        for (const property in req.body) {
            if (req.body.hasOwnProperty(property)) {
                req.user[property] = req.body[property];
            }
        }

        const promise = req.user.save();
        promise.then(user => {
            res.json(user);
        });

        promise.catch(error => {
            res.statusCode = 505;
            res.json({ message: error });
        });
    },
    post = async (req, res) => {
        const delayResponse = response => {
            setTimeout(() => {
                response();
            }, 1000);
        };

        const { email } = req.body;

        let Post, errors, user, result;

        Post = await getPostModel();

        req.checkBody(PostValidation);

        result = await req.getValidationResult();
        errors = result.array();

        if (errors.length > 0) {
            log.error(errors);
            res.status(401).json(errors);
            return;
        }

        const existingPost = await Post.findOne({ email: email }).exec();

        if (existingPost) {
            return delayResponse(() =>
                res
                    .status(409)
                    .send(
                        `The specified email ${email} address already exists.`
                    )
            );
        }

        user = new Post(req.body);

        user.save(err => {
            if (err) {
                log.error(err);
                delayResponse(() => res.status(401).json(err));
            } else {
                delayResponse(() => res.status(201).json(user));
            }
        });
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
    },
    put = (req, res) => {
        req.user.title = req.body.title;
        req.user.duration = req.body.duration;
        req.user.description = req.body.description;
        req.user.rate = req.body.rate;

        const promise = req.user.save();

        promise.then(user => {
            res.json(user);
        });
        promise.catch(error => {
            res.statusCode = 505;
            res.json({ message: error });
        });
    },
    remove = (req, res) => {
        const promise = req.user.remove();
        promise.then(() => {
            res.statusCode = 204;
            res.json({ message: "removed" });
        });
        promise.catch(error => {
            log.error(error);
            res.statusCode = 505;
            res.json({ message: error });
        });
    };
