// ----- import all api routes --------

const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
// const reactionRoutes = require('./reaction-routes');


// add prefix of /users to routes created in user-routes.js
router.use('/users', userRoutes);

// router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;