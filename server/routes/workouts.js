const express = require('express');
const router = express.Router();
const { 
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers');
// get all workouts:
router.get('/', getWorkouts);
// get single workout:
router.get('/:id', getWorkout);
// post new workout:
router.post('/', createWorkout);
// delete workout:
router.delete('/:id',deleteWorkout);
// update a workout:
router.patch('/:id', updateWorkout);

module.exports = router;