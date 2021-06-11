// Import Packages
const express = require('express');

// Import Router
const indexRouter = require('');

// Create Express Application
const app = express();

// Setting Express value
app.set('port', process.env.PORT || 3000);

// Conneting Router
app.use('/', indexRouter);


// Start Server
app.listen(app.get('port'), () => {
    console.log(`Starting Server at http://localhost:${app.get('port')}`);
});