"use strict";

const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const app = express();
const port = 3000;
const route = require("./routes/web");
const db = require("./config/database");
const methodOverride = require("method-override");
db.connect();

// Use to request form with PUT, PATCH, DELETE method
app.use(methodOverride("_method"));

// Use static folder
app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
// app.use(morgan("combined"));

// Config template engine
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
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
