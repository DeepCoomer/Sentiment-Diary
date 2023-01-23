const express = require('express');
const Diary = require('../models/Diary')
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

const router = express.Router()


// Route 1: Get all Diaries using GET "/api/diary/fetchalldiaries".

router.get("/fetchalldiaries", fetchuser, async (req, res) => {
    try {
        const diaries = await Diary.find({ user: req.user.id });
        res.json(diaries);
    } catch (error) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Create an Diary using POST "api/diary/adddiary".

router.post("/adddiary", fetchuser, [
    body('title', 'Enter a minimum Title').isLength({ min: 3 }),
    body('record', 'Record must be of atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, record } = req.body;

        // If there is an error return the bad request and the error

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const diary = new Diary({
            title, record, user: req.user.id
        })

        const savedDiary = await diary.save();

        res.json(savedDiary);
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }

})

// Route 3: Updating an existing diary using PUT "/api/diary/updatediary/:id". Login Required

router.put("/updatediary/:id", fetchuser, async (req, res) => {

    try {
        const { title, record } = req.body;

        // Create a new Note object

        const newDiary = {};
        if (title) {
            newDiary.title = title;
        }
        if (record) {
            newDiary.record = record;
        }

        // find the diary to be updated and update it

        let diary = await Diary.findById(req.params.id);

        if (!diary) {
            return res.status(404).send("Not Found");
        }

        if (diary.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        diary = await Diary.findByIdAndUpdate(req.params.id, { $set: newDiary }, { new: true })
        res.json({ diary })
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4: Deleting an existing Diary using DELETE "/api/diary/deletediary/:id". Login Required

router.delete("/deletediary/:id", fetchuser, async (req, res) => {

    try {

        // find the diary to be deleted and delete it

        let diary = await Diary.findById(req.params.id);

        if (!diary) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns this diary

        if (diary.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        diary = await Diary.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Diary has been deleted" });
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 5: Find a Diary using POST "/api/diary/finddiary/:id". Login Required

router.get("/finddiary/:id", fetchuser, async (req, res) => {
    try {
        let diary = await Diary.findById(req.params.id);
        if (!diary) {
            return res.status(404).send("Not Found");
        }
        if (diary.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        else {
            res.send(diary);
        }
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }
})

// Route 6: Analsye a Diary using POST "api/diary/analysediary/:id". Login Required

router.post("/analysediary/:id", fetchuser, async (req, res) => {
    try {
        let diary = await Diary.findById(req.params.id);
        if (!diary) {
            return res.status(404).send("Not Found");
        }
        if (diary.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        else {
            const result = sentiment.analyze(diary.record)
            res.json(result);
        }
    } catch (e) {
        console.error(e.messsage);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router;