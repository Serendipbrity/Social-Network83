//  ----------- THIS FILE PACKAGES UP ALL MODELS--------------


// where to find/set up to use User model
const User = require('./User');
// where to find/set up to use Thought model
const Thought = require('./Thought');

// const Reaction = require('./Reaction');

module.exports = { User, Thought };