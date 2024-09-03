const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

// create an async function called 'loginLocalFailed'
const loginLocalFailed = async (req, res, next) => {
    res.status(401).json({error: {message: "Username or password is incorrect."}, statusCode: 401})
}


// create an async function called 'logoutRequest'
const logOutRequest = async (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error); // Pass the error to the next middleware or error handler
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(400).json({ error: { message: "Failed to destroy session!" }, statusCode: 400 });
            }
            res.clearCookie('connect.sid'); // clear the session cookie
            res.status(200).json({ success: { message: "User logged out!" }, statusCode: 200 });
        });
    });
};

// create an async function called 'signupRequest'
const signupRequest = async (req, res, next) => {
    // define future form keys and in order to capture user input for our database:
    const { firstName, lastName, username, password } = req.body;
    console.log(req.body)
     bcrypt.hash(password, 10, async (error, hashedPassword) => {
        if(error) {
            return next(error)
        }
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword
        })

        try {
            // save the new user:
            await newUser.save();
            req.login(newUser, (error) => {
                if(error) {
                    res.status(400).json({error: {message: "Something went wrong while signing up!"}, statusCode: 400})
                } else {
                    res.status(200).json({success: {message: "User signed up and logged in!"}, statusCode: 200, data: {
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        username: newUser.username
                    }})
                }
            })
        } catch(error) {
            console.log(error)
            const errorCode = error.code
            if (errorCode === 11000 && error.keyPattern.username) {
                res.status(400).json({error: {message: "Username already exists"}, statusCode: 400})
            } else {
                res.status(500).json({error: {message: "Internal server error"}, statusCode: 500})
            }
        }
     })
};

module.exports = { loginLocalFailed, logOutRequest, signupRequest };