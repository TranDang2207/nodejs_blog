"use strict";

const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const app = express();
const port = 3000;
const route = require("./routes/web");
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middlewares/SortMiddleware");
const db = require("./config/database");
db.connect();

// Use to request form with PUT, PATCH, DELETE method
app.use(methodOverride("_method"));

// Use static folder
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware global
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan("combined"));

// Config template engine
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (column, sort) => {
                const sortType = column === sort.column ? sort.type : 'default'
                const icons = {
                    default: "bi bi-chevron-expand",
                    asc: "bi bi-sort-down",
                    desc: "bi bi-sort-up",
                };
                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                };

                const icon = icons[sortType];
                const type = types[sort.type];

                return `<a href="?_sort&column=${column}&type=${type}">
                            <i class="${icon} text-dark"></i>
                        </a>`;
            },
        },
    })
);

// Register template engine
app.set("view engine", ".hbs");

// Register location view folder
app.set("views", path.join(__dirname, "resources", "views"));

// Register middleware to access prop of object
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//Register Router folder
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
