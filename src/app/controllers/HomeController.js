const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../helpers/helper");

class HomeController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render("home", {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    search(req, res) {
        res.render("search");
    }
}

module.exports = new HomeController();