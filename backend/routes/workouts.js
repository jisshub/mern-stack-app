const express = require('express');
const Workout = require('../models/Workout');

const {createWorkout, getAllWorkouts, getAWorkout, updateWorkout, deleteWorkout} 
= require('../controllers/WorkoutsController');
// create routes instance
const router = express.Router();

// get all workouts
router.get('/', getAllWorkouts);

// get a single workout
router.get('/:id', getAWorkout);

// post a new workout
router.post('/', createWorkout);

// update a workout
router.patch('/:id', updateWorkout);

// delete a workout
router.delete('/:id', deleteWorkout);

module.exports = router;