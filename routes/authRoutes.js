const express = require('express');
const passport = require('passport');
const { loginLocalFailed, logOutRequest, signupRequest } = require('../controllers/authController')

const router = express.Router();

router.post('/login/local', passport.authenticate('local', 
    {failureRedirect: '/login/local/failed'}), (request, response, next) => {
        response.status(200).json({success:{message: "User logged in"}, 
        data: {
            username: request.user.username,
            firstName: request.user.firstName,
            lastName: request.user.lastName,
        }, statusCode: 200,}
        )
    })

router.get('/login/local/failed', loginLocalFailed);
router.get('/logout', logOutRequest);
router.post('/signup', signupRequest);

// Stage the three github routes in order to activate the github strategy:
router.get('login/github', passport.authenticate('github'));

router.get('/login/github/failed', (res, req, next) => {
    res.json({message: 'There is a problem with Github authentication.'})
});
router.get('/auth/github', passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login/github/failed'
}));

router.get('/login/google', passport.authenticate('google'))

router.get('/login/google/failed', (request, response, next) => {
    response.status(401).json({message: "There is a problem with google authentication"})
})

router.get('/auth/google', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login/local/failed'
}))

module.exports = router;