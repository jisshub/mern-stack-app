const expres = require('express');

const app = expres();

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})