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