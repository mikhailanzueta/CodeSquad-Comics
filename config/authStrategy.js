const passport = require("passport"); 
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
 //define GitHub strategy
const GithubStrategy = require('passport-github').Strategy;
//define Google strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// require the 'user' model:
const User = require('../models/userModel')

// implement the local strategy:
passport.use(new LocalStrategy((
    verify = (username, password, done) => {
        User.findOne({username: username}).then((user) => {
            if (!user) {
                return done(null, false, {message: "User not found"})
            }
            const hashedPassword = user.password.toString()
            const providedPassword = password.toString()

            console.log("password from DB: ", hashedPassword)
            console.log("password provided: ", providedPassword)
            bcrypt.compare(providedPassword, hashedPassword, (error, result) => {
                if (error) {
                    return done(error)
                }
                return done(null, user)
            })
        })
        .catch((error) => console.log(`User not found ${error}`));
    }
)))

// Github Strategy
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/'
    },
    (accessToken, refreshToken, profile, done) => { 
        console.log(profile); 
        return done(null, profile); 
    })
);

// Google Strategy"
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(null, profile)
    })
)

// Implement the serializeUser/deserializeUser functions:
passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})