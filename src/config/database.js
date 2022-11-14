const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/f8_education_dev");
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { connect };
