const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

router.get("/create", courseController.create);
router.get("/edit/:id", courseController.edit);
router.post("/store", courseController.store);
router.post("/trash-many", courseController.trashMany);
router.post("/restore-many", courseController.restoreMany);
router.post("/delete-many", courseController.deleteMany);
router.put("/update/:id", courseController.update);
router.patch("/trash/:id", courseController.trash);
router.patch("/restore/:id", courseController.restore);
router.delete("/delete/:id", courseController.delete);
router.get("/:slug", courseController.show);

module.exports = router;
