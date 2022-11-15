const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        slug: { type: String, slug: "name", unique: true },
        id_video: { type: String, maxLength: 255 },
        level: { type: String, maxLength: 255 },
    },
    {
        _id: false,
        timestamps: true,
    }
);


// Add plugin
Course.plugin(AutoIncrement);
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Course", Course);
