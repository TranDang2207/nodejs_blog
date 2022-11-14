const Course = require("../models/Course");
const { mongooseToObject } = require("../helpers/helper");

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // [GET] /courses/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render("courses/edit", { course: mongooseToObject(course) })
            )
            .catch(next);
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.id_video}/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDxXDRpZBoqHgZvlvcmDuTCAT30Vg`;
        const course = new Course(req.body);
        course
            .save()
            .then((course) => res.redirect("/"))
            .catch((err) => {});
    }

    // [PUT] /courses/update
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
    }

    // [PATCH] /courses/trash
    trash(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [PATCH] /courses/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [DELETE] /courses/delete
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/delete-many
    trashMany(req, res, next) {
        Course.delete({ _id: { $in: req.body.courseIds } })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/restore-many
    restoreMany(req, res, next) {
        Course.restore({ _id: { $in: req.body.courseIds } })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/delete-many
    deleteMany(req, res, next) {
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
            .then(() => res.redirect("back"))
            .catch(next);
    }
}

module.exports = new CourseController();
