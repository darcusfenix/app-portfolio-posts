// @flow
export const manageErrorHTTP = app => {
    app.get("*", (req, res, next) => {
        let err = new Error();
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        if (err.status !== 404) {
            return next();
        }

        res.statusCode = 404;

        res.json({ message: ":(" });
    });
};
