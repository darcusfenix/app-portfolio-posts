// @flow
require('dotenv').config();
import bodyParser from "body-parser";
import express from "express";
import log4js from "log4js";
import expressValidator from "express-validator";
import helmet from "helmet";
import { EXPRESS_PORT } from "app-portfolio-core/config";
import { apiRoutesConfig } from "./apiRoutes";
import { manageErrorHTTP } from "./errorHttp";

log4js.configure({
    appenders: {
        out: { type: "stdout" },
        app: { type: "file", filename: "application.log" }
    },
    categories: {
        default: { appenders: ["out", "app"], level: "debug" }
    }
});
const app = express(),
    log = log4js.getLogger("app");

app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(bodyParser.json());

apiRoutesConfig(app);
manageErrorHTTP(app);

app.listen(EXPRESS_PORT, err => {
    if (err) {
        log.error(err);
    } else {
        let message = `SE INICIÓ EL SERVIDOR EN EL PUERTO:  ${EXPRESS_PORT}`;
        log.debug(message);
    }
});
