require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workouts');
const connectDb = require('./db');
const path = require('path');

const app = express();

connectDb()
// middleware
app.use((req, res, next)=>{
    console.log(`${req.path}, ${req.method}`);
    next();
});

// middleware 2
app.use(express.json());

app.use('/api/workouts', workoutRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join('/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve('frontend', 'build', 'index.html'))
    )
} else {
    app.get('*', (req, res)=>{
        res.send('API is running');
    })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)