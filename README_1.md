# mern-stack-app

Playlist Link: https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE

![](./images/image1.png)

- On front end we use React.js and on back end we use Node.js and Express.js.
- We use MongoDB as a database.

## Workflow:

When we want to show data on our website, we sent a request to our backend. Backend is an express app running on Node.js environment. express is a framework for Node.js to create APIs.
Node and express handles the request on our backend and interact with database to get the data.
backend also handles authentication and authorization for the user. also protects the api from unauthenticated users. once backend got the datas from database, it sends the response to the frontend. React app will render the data on the frontend.

<b>Why use backend node.js and express.js instead reaching directly to database from front end?<b>

If we do that we are putting sensitive user data in our front end. instead we put them in backend. thus hiding it from front end.

## Express App Set Up

create backend folder and create server.js file in it.

move to backend folder and 

```bash
npm init
```

create express app.

install express package.

```sh
npm i express
```

install nodemon package.


```sh

npm i nodemon
```

create a dev script in package.json file.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
```

run the node server.

```sh
npm run dev
```

run the localhost in browser.

http://localhost:4000/


<b>create environment variables<b>

environment variables are remain hidden when we push the code to github.

install dotenv package.

dotenv package loads the environment variables from .env file into process.env object.

```sh
npm i dotenv
```

create environment variables in .env file.

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

<b>open postman<b>

set up first get request.

![](./images/image2.png)


<b>Set up the middleware<b>

**app.js**

```js
app.use((req, res, next)=>{
    console.log(`${req.path}, ${req.method}`);
    next();
})
```

## Express Routes & API Routes

![](./images/image3.png)

create new folder called routes in backend and create workouts.js file in it.

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

import this router in server.js file. set path to /api/workouts.

**server.js**

```js
const workoutRoutes = require('./routes/workouts');
// use the workout routes
app.use('/api/workouts', workoutRoutes);
```

<b>Creating different routes<b>

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

<b>Add a middleware<b>

when we deal with patch or post request where we sent data to backend, we can access the data in req.body. But we can only access that if we use a middleware.

**server.js**

```js
app.use(express.json())
```

*express.json()* is a middleware that parses the request body and puts it into req.body.

<b>Set all request in postman<b>

![](./images/image4.png)

## MongoDB Atlas & Mongoose

- create a cluster in mongoDB Atlas.
- click connect to cluster.
- choose connect your application.

![](./images/image5.png)

- copy the connection string.

![](./images/image6.png)

- Go to .env file and paste the connection string. change username and password.

**.env**

```env
MONGO_URI = mongodb+srv://jissmon:jissmon123@cluster0.hkuhz.mongodb.net/blogs?retryWrites=true&w=majority
```

- Create a db.js file in backend folder.

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

- Import the db.js file in server.js file.

**server.js**

```js
const connectDb = require('./db');
connectDb()
```

- Finaly run the server. You will see this message

Server is running on port 4000

MongoDB Connected: cluster0-shard-00-02.hkuhz.mongodb.net



## Models & Schemas

<b>Create Schema and model<b>

1. create a *models* folder in backend folder.
2. create a *Workouts.js* file in models folder.

**Workouts.js**

```js

```




