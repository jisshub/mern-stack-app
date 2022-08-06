const express = require('express');
const Workout = require('../models/Workout');

// create routes instance
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "message": "welcome to workout app"
    })
});

// get a single workout
router.get('/:id', (req, res) => {
    res.json({
        "message": "get a single workout"
    })
});

// post a new workout
// @route POST /api/workouts
router.post('/', async (req, res) => { 
    try {
        const {title, load, reps}  = req.body;
        const workout = await Workout.create({title, reps, load})   
        res.status(201).json({
            "message": "workout created",
            "workout": workout
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// update a workout
router.patch('/:id', (req, res) => { 
    res.json({
        "message": "update a workout"
    })
});
// delete a workout
router.delete('/:id', (req, res) => { 
    res.json({
        "message": "delete a workout"
    })
})

module.exports = router;