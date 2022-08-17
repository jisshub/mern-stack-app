# mern-stack-app

[1. Workflow](#1-workflow)

[2. Express App Set Up](#2-Express-App-Set-Up)

[3. Express Routes & API Routes](#3-Express-Routes-&-API-Routes)

[4. MongoDB Atlas & Mongoose](#4-MongoDB-Atlas-&-Mongoose)

[5. Models & Schemas](#5-Models-&-Schemas)

[6. Controllers PART 1 & PART 2](#6-Controllers-PART-1-&-PART-2)

[7. Making a React App](#7-making-a-react-app)

[8. Fetching Data](#8-fetching-data)

[9. Create Workout Form](#9-create-workout-form)

[10. Adding React Context](#10-adding-react-context)

[11. Deleting Data](#11-Deleting-Data)


Playlist Link: https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE

![](./images/image1.png)

- On front end we use React.js and on back end we use Node.js and Express.js.
- We use MongoDB as a database.

# 1. Workflow

When we want to show data on our website, we sent a request to our backend. Backend is an express app running on Node.js environment. express is a framework for Node.js to create APIs.
Node and express handles the request on our backend and interact with database to get the data.
backend also handles authentication and authorization for the user. also protects the api from unauthenticated users. once backend got the datas from database, it sends the response to the frontend. React app will render the data on the frontend.

<b>Why use backend node.js and express.js instead reaching directly to database from front end?<b>

If we do that we are putting sensitive user data in our front end. instead we put them in backend. thus hiding it from front end.

# 2. Express App Set Up

1. create backend folder and create server.js file in it.

2. move to backend folder and 

```bash
npm init
```

3. create express app.

4. install express package.

```sh
npm i express
```

5. install nodemon package.

```sh

npm i nodemon
```

6. create a dev script in package.json file.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
```

7. run the node server.

```sh
npm run dev
```

run the localhost in browser.

http://localhost:4000/


## create environment variables

- environment variables are remain hidden when we push the code to github.

1. install dotenv package.

dotenv package loads the environment variables from .env file into process.env object.

```sh
npm i dotenv
```

2. create environment variables in .env file.

```env
PORT=4000
```

**app.js** file

```js
require('dotenv').config();
const expres = require('express');

const app = expres();

app.get('/', (req, res) => {
    res.json({
        "message": "welcome to app"
    })
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 4000');
})
```

## open postman

set up first get request.

![](./images/image2.png)


## Set up the middleware

**app.js**

```js
app.use((req, res, next)=>{
    console.log(`${req.path}, ${req.method}`);
    next();
})
```

# 3. Express Routes & API Routes

![](./images/image3.png)

1. create new folder called routes in backend and create workouts.js file in it.

**workouts.js** file

```js
const express = require('express');
const workouts = express.Router();

workouts.get('/', (req, res) => {
    res.json({
        "message": "welcome to workouts"
    })
}
)

module.exports = workouts;
```

2. import this router in server.js file. set path to /api/workouts.

**server.js**

```js
const workoutRoutes = require('./routes/workouts');
// use the workout routes
app.use('/api/workouts', workoutRoutes);
```

3. Creating different routes for different endpoints.

**routes/workouts.js**

```js
const express = require('express');

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
router.post('/', (req, res) => { 
    res.json({
        "message": "post a new workout"
    })
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
```

4. Add a middleware

when we deal with patch or post request where we sent data to backend, we can access the data in req.body. But we can only access that if we use a middleware.

**server.js**

```js
app.use(express.json())
```

*express.json()* is a middleware that parses the request body and puts it into req.body.

<b>Set all request in postman<b>

![](./images/image4.png)

# 4. MongoDB Atlas & Mongoose

1. create a cluster in mongoDB Atlas.
2. click connect to cluster.
3. choose connect your application.

![](./images/image5.png)

4. copy the connection string.

![](./images/image6.png)

5. Go to .env file and paste the connection string. change username and password.

**.env**

```env
MONGO_URI = mongodb+srv://jissmon:jissmon123@cluster0.hkuhz.mongodb.net/blogs?retryWrites=true&w=majority
```

6. Create a db.js file in backend folder.

**db.js**

```js
const mongoose = require('mongoose');
const connectDb = async() => {
    try{
        const connectDb = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${connectDb.connection.host}`);
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectDb;
```

7. Import the db.js file in server.js file.

**server.js**

```js
const connectDb = require('./db');
connectDb()
```

8. Finaly run the server. You will see this message

Server is running on port 4000

MongoDB Connected: cluster0-shard-00-02.hkuhz.mongodb.net


# 5. Models & Schemas

## Create Schema and model

1. create a *models* folder in backend folder.
2. create a *Workouts.js* file in models folder.

**Workouts.js**

```js
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: {  
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Workout', workoutSchema);
```

* Here, *timestamps* is a plugin that automatically adds *createdAt* and *updatedAt* fields to the schema.

* Schema is a structure of the document we want to store in the collection.

* We use this model to interact with collection called *workouts*.

* *Workout* collection is created in our database.

## Create a new workout document

* Import this model in routes/workouts.js file.

**routes/workouts.js**


```js
// @route POST /api/workouts
router.post('/', async (req, res) => { 
    try {
        // destructure the body of the request
        const {title, load, reps}  = req.body;
        // create a new workout document with the body of the request
        const workout = await Workout.create({title, reps, load})   
        // send the response
        res.status(201).json({
            "message": "workout created",
            "workout": workout
        });
    } catch (error) {
        // send the error response
        res.status(400).json({error: error.message});
    }
});
```

## Send POST request in postman

![](./images/image7.png)


# 6. Controllers PART 1 & PART 2

* Create a *controllers* folder in backend folder. create a *WorkoutController.js* file in controllers folder.

**WorkoutController.js**

```js
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
```


### Error:

```json
{
    "error": "Cast to ObjectId failed for value \"777\" (type string) at path \"_id\" for model \"Workout\""
}
```

This error is because we are trying to find a workout with an id that is not the kind of mongoose object id.

**Solution:**

```js
if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "Invalid ID. Check given id is a valid mongoose object id"});
}
```

It means that the id is not a valid mongoose object id. If yes, then we return an error. If not, we continue to the next step.

![](./images/image8.png)


### Update routes/workouts.js file

**routes/workouts.js**

```js
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
```

# 7. Making a React App

https://www.youtube.com/watch?v=bx4nk7kBS10&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=8

### Create a React Application.

```bash
npx create-react-app frontend
cd frontend
npm run start
```

- Delete *src/App.css* file.
- Delete *src/App.test.js* file.
- Delete *src/logo.svg* file.
- Delete *src/reportWebvitals.js* file.
- Delete *src/setupTests.js* file.

Clear the most part of code from App.js file.

**App.js**

```js
function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
```

## Adding react routers

<b>Install React Router<b>

```bash
npm install react-router-dom@5.1
```

**App.js**

```js
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route path="/">
            <Home />
          </Route>
      </BrowserRouter>
    </div>
  );
}
```

**Home.js**

```js
const Home = () => {
    return (
        <div className='home'>
            <h1>Home</h1>
        </div>
     );
}
 
export default Home;
```

## Create components

### 1. Navbar Component


**Navbar.js**

```js
import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <div className='container'>
            <Link to='/'>
                <h1>Workout Buddy</h1>
            </Link>
        </div>
     );
}
 
export default Navbar;
```

- Import the component in the App.js file.

**App.js**

```js
<div className="App">
    <BrowserRouter>
    <Navbar />
    <div className='pages'>
        <Route path="/">
        <Home />
        </Route>
    </div>
    </BrowserRouter>
</div>
```

# 8. Fetching Data

**Home.js**

```js
const Home = () => {
    const [workouts, setWorkouts] = useState(null);
    useEffect(() => {
        const fetchWorkout = async () => {
        // get response
        const response = await fetch('/api/workouts');
        // pass json
        const finalData = json.workouts;
        if (response.ok) {
            // set the state
            setWorkouts(finalData);
        }
      }
        fetchWorkout();
    }, [])
    
    return (
        <div className='home'>
            <div className='workouts'>
                 {workouts && workouts.map(workout => (
                    // pass workout to WorkoutDetail component as a prop
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
        </div>
     );
}
```

## Create WorkoutDetails Component

**WorkoutDetails.js**

- Set workout as a prop.

```js
const WorkoutDetails = ({ workout }) => {
    return (  
        <div className='workouts-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Number of reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
        </div>
    );
}
 
export default WorkoutDetails;
```

### Update package.json file with proxy property

- Add proxy property at begining of the package.json file.

**package.json**

```json
{
  "proxy": "http://localhost:4000"
  "name": "frontend",
  "version": "0.1.0",
  ---
  ---
  --
}
```

# 9. Create Workout Form


**components/WorkoutForm.js**

```js
import { useState } from 'react';

const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoads] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {
            title,
            load,
            reps
        }
        // const res = await axios.post('/api/workouts', workout);

        // fetch request to post workout to database
        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        if(!res.ok) {
            setError(json.error)
            throw new Error(json.message)
        }
        if (res.ok) {
            setTitle('');
            setLoads('');
            setReps('');
            setError(null);
            console.log('Workout Added!', json);
        }
    }
    return ( 
        <form className='create' onSubmit={handleSubmit}>
            <h3>
                Add a New Workout
            </h3>
            <label>
                Exercise Title:
            </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>
                Load (in Kg):
            </label>
            <input type="text" value={load} onChange={(e) => setLoads(e.target.value)} />
            <label>
                Reps:
            </label>
            <input type="text" value={reps} onChange={(e) => setReps(e.target.value)} />
            <button>
                Add Workout
            </button>
            {error && <div className='error'>{error}</div>}
        </form>
     );
}
 
export default WorkoutForm;
```

# 10. Adding React Context

- Add react context thus avoiding the developer to reload the page when the data is updated.

Link: https://www.youtube.com/watch?v=NKsVV7wJcDM&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=11

- create a context procider component.

**WorkoutContext.js**

```js
import { createContext } from 'react';

export const WorkoutContext = createContext();

export const WorkoutContextProvider = () => {
    return (
        <WorkoutContext.Provider value={WorkoutContext}>
            
        </WorkoutContext.Provider>
    );
}
```

- Inject the workout context provider around App component.

**index.js**

```js
import { WorkoutContextProvider } from './components/WorkoutContext';   

    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
```

- Destructure the *children prop* from the context provider.
- *children prop* represents whatever component is wrapped around the context provider.

**WorkoutContext.js**

```js
export const WorkoutContextProvider = ({children}) => {
    return (
        <WorkoutContext.Provider value={WorkoutContext}>
            { children }
        </WorkoutContext.Provider>
    );
}
```

## Recap

- Create a custom context provider component which returns an actual provider of the context we created.

- *WorkoutContext Provider* wraps the components that need to access the context it represents.

- Wraps the *children property* take into the component as props.

- This *children property* represents whatever component this custom provider wraps around.

- This children prop really wraps the root App component in *index.js* file.

- So the *workout context provider* wraps the *App component* which in turn wraps all the component in our application.

- Thus all the components in our application can access the *workout context*.


## Using useReducer hook.

- Define a useReducer hook.

- Pass 2 arguments to the useReducer hook.
    1) reducer function name.
    2) initial value for the state.(an object with a workouts property set to null)

- We update the state by calling the dispatch function.

- Inside dispatch function we pass an object as argument.

- Inside object we pass an action type and an optional payload.
    1) *type* represents the type of action we want to dispatch.
    2) *payload* represents the data we want to pass to the reducer.

- Create the reducer function next.

```js
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUT':
            return {
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        default:
            return state;
    }
}
```

- Pass state and dispatch property as props to value attribute of the context provider.

**WorkoutContextProvider.js**

```js
return (
        <WorkoutContext.Provider value={{state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    );
```

- *state* represents the state of the application.
- *dispatch* represents the dispatch function which we use to update the state.

## Create custom hooks for the context

- Create a hooks folder.

**useWorkoutsContext.js**

```js
import { WorkoutsContext } from '../context/WorkoutContext';
import { useReducer } from 'react';

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);
    if (!context) {
        throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
    }
    return workouts;
}
```

## Consume the context using the custom hooks

- Update thee Home component to consume the context.

**Home.js**

```js
const Home = () => {
    // destructure the state and dispatch property from the context.
    const {workouts, dispatch} = useWorkoutsContext();
    useEffect(() => {
        const fetchWorkouts = async () => {
          const response = await fetch('/api/workouts')
          const json = await response.json()
          const finalData = json.workouts;
          if (response.ok) {
            // dispatch an action to update the state. set the type to SET_WORKOUT & payload to the final data.
            dispatch({type: 'SET_WORKOUT', payload: finalData})
          }
        } 
    
        fetchWorkouts()
    }, [])
}
```

- Update the workouts context custom hook.

**useWorkoutsContext.js**

```js
import { WorkoutsContext } from '../context/WorkoutsContext';
import { useContext } from 'react';

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);
    if (!context) {
        throw new Error('useWorkoutsContext must be used within a WorkoutsContextProvider');
    }
    return context;
}
```

**WorkoutsContext.js**

```js
export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUT':
            return {
                workouts: action.payload
            };
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    }); 
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    );
}
```

## Update the context state and render the new data.

- Now everything working fine except the workouts are not being updated and rendered on the web page.
- we need to go to workout form.
- when we add a new workout, we have to dispatch an action to update the context state. 
- This will add the new workout to the global context state.
- This way we keep our UI and database in sync.

**WorkoutForm.js**

```js
const WorkoutForm = () => {
    // destructure the dispatch property from the context.
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoads] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {
            title,
            load,
            reps
        }

        // fetch request to post workout to database
        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await res.json();

        if(!res.ok) {
            setError(json.error)
            throw new Error(json.message)
        }
        if (res.ok) {
            setTitle('');
            setLoads('');
            setReps('');
            setError(null);
            // dispatch an action to create a workout. set the type to CREATE_WORKOUT & payload to the json.
            dispatch({type: 'CREATE_WORKOUT', payload: json});
            console.log('Workout Added!', json);
        }
    }
}
```

- So now we dispatch the action and it update the context state, the workouts are updated and rendered on the web page.


# Deleting Data

