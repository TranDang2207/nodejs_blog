"use strict";

const newsRoute = require("./news");
const homeRoute = require("./home");

const route = (app) => {
    app.use("/news", newsRoute);
    app.use("/", homeRoute);
};

module.exports = route;
