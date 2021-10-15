const mongoose = require("mongoose");

const HomepageDataSchema = new mongoose.Schema({
    banner: String,
    background: String,
    description: String,
});

module.exports = HomepageData = mongoose.model("homepageData", HomepageDataSchema);