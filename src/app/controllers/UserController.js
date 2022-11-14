const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../helpers/helper");

class UserController {
    // [GET] /me/stored/courses
    listCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty("_sort")) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render("user/list-courses", {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render("user/list-courses-deleted", {
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new UserController();
