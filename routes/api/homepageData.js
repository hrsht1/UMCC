const express = require("express");
const router = express.Router();

//load homepageData model
const HomepageData = require("../../models/homepageData")

//test homepageData route
router.get("/test", (req, res) => res.send("homepageData route testing!"));


router.get("/", (req, res) => {
    HomepageData.find()
        .then((homepageDatas) => res.json(homepageDatas))
        .catch((err) => res.status(404).json({ nohomepageDatasfound: "No homepageDatas found" }));
});

//add homepageData
router.post("/", (req, res) => {
    console.log(req.body);
    HomepageData.create(req.body)
        .then((homepageData) => res.json({ msg: "homepageData added successfully" }))
        .catch((err) =>
            res.status(400).json({ error: "Unable to add this homepageData" })
        );
});

//get homepageData
router.get("/:id", (req, res) => {
    HomepageData.findById(req.params.id)
        .then((homepageData) => res.json(homepageData))
        .catch((err) => res.status(404).json({ nohomepageDatafound: "No homepageData found" }));
});

//update homepageData
router.put("/:id", (req, res) => {
    HomepageData.findByIdAndUpdate(req.params.id, req.body)
        .then((homepageData) => res.json({ msg: "Updated successfully" }))
        .catch((err) =>
            res.status(400).json({ error: "Unable to update the Database" })
        );
});

module.exports = router;