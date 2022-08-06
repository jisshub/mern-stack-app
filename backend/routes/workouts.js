const express = require('express');

// create routes instance
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "message": "welcome to workout app"
    })
}
)

module.exports = router;