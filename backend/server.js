require('dotenv').config();
const expres = require('express');
const workoutRoutes = require('./routes/workouts');
const connectDb = require('./db');
connectDb()

const app = expres();

// middleware
app.use((req, res, next)=>{
    console.log(`${req.path}, ${req.method}`);
    next();
});

// middleware 2
app.use(expres.json());

app.use('/api/workouts', workoutRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
});