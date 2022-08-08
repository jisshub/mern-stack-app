const Workout = require('../models/Workout');
const mongoose = require('mongoose');

// GET /api/workouts
// Get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1});
        res.status(200).json({
            "message": "workouts found",
            workouts});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// GET /api/workouts/:Id
// Get a single workout
const getAWorkout = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "Invalid ID. Check given id is a valid mongoose Object Id"});
        }
        const workout = await Workout.findById(id);
        if (!workout) {
            res.status(404).json({error: "workout not found"});
        } else {
        res.status(200).json({
            "message": "workout found",
            workout});
        }
    } catch (err) {
        res.status(400).json({error: err.message});
    }

}

// POST /api/workouts
// Create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;
    try {
        const newWorkout = await Workout.create({title, load, reps});
        res.status(201).json({
            "message": "workout created",
            newWorkout});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// update a workout
// PATCH /api/workouts/:id
const updateWorkout = async (req, res) => {
    const {id} = req.params;
    const {title, load, reps} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "Invalid ID. Check given id is a valid mongoose Object Id"});
        }
        const workout = await Workout.findByIdAndUpdate(id, {title, load, reps}, {new: true});
        res.status(200).json({
            "message": "workout updated",
            workout});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// delete a workout
// DELETE /api/workouts/:id
const deleteWorkout = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "Invalid ID. Check given id is a valid mongoose Object Id"});
        }
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
            res.status(404).json({error: "workout not found"});
        }            
        res.status(200).json({
            "message": "workout deleted"
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = {getAllWorkouts, getAWorkout, createWorkout, updateWorkout, deleteWorkout};
