require('dotenv').config();
require('./config/connection');
require('./config/authStrategy');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
// REQUIRE PATH MODULE
const path = require('node:path');
// USE JSON
app.use(express.json());
// Encode forms
app.use(express.urlencoded({ extended: true }));
// Use the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use(cors);
app.use(helmet({contentSecurityPolicy: false}));


// -------------------------------------------------------------

// Define routes:
const bookRoutes = require('./routes/booksRoutes');
const authRoutes = require('./routes/authRoutes');


// -------------------------------------------------------------

// create 5 'GET' routes
app.get("/", (request, response, next) => {
    //response.send("This route points to the Home page")
    //REFACTOR
    response.status(200).json({success: {message: "Index page was successful!"}, statusCode: 200})
})

// -----------------------------------------------------------------------
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session())
// Route paths using the app.use() method:
app.use("/api/books", bookRoutes);
app.use('/', authRoutes);


// -----------------------------------------------------------------------

// CREATE SERVER
app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}!`)
    console.log(`http://localhost:${PORT}/`);
    
})