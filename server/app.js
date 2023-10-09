const express = require('express');
const app = express();
const workoutsRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
require('dotenv').config();
// middleware:
app.use(express.json());

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();})
// routes:
app.use('/api/workouts',workoutsRoutes);
app.use('/api/user/', userRoutes);
//connect to DB:
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // req listener:
    app.listen(process.env.PORT, () => {
    console.log(`connected to DB & listening on port: ${process.env.PORT}`);
});
    })
    .catch((error) => {
        console.log(error)
    });


