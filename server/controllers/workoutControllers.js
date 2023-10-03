const Workouts = require('../models/Workouts');
const mongoose = require('mongoose');
// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workouts.find({}).sort({createdAt: -1});
    // ^^^ leaving the find method obj blank to get ALL db entries (adding a rule will display entries who follow the rule)
    // ^^^ the sort properties will ensure the acquired list will be in descending order (newest to oldest)
    res.status(200).json(workouts);
}
// new single
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;
    //custom error:
    let emptyFields = [];
    if(!title){
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    // add doc to DB
    try {
        const workout = await Workouts.create({title, load, reps});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
// get single
const getWorkout = async (req, res) => {
    const { id } = req.params // all entry properties are stored in the params property of any request the server gets
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'});
    // ^^^ failsafe for a case were there is no id like the one the client sent
    const workout = await Workouts.findById(id);
    if (!workout) return res.status(404).json({error: 'No such workout'});
    res.status(200).json(workout);
}; 

// delete single
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'});
    const workout = await Workouts.findByIdAndDelete({_id: id}); // mongoose saves ids ad '_id', then we match the id for the object we want to DELETE with the req.params
    if(!workout) return res.status(404).json({error: 'No such workout'});
    res.status(200).json(workout);
};
// update single
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such workout'});
    const workout = await Workouts.findOneAndUpdate({_id:id}, {
        ...req.body
    });
    if(!workout) return res.status(404).json({error: 'No such workout'});
    res.status(200).json(workout);
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}