// ------ Thought === Post ---------

// import dependencies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// const reactionSchema = require('./Reaction')

const reactionSchema = new Schema(
    {
    reactionId: {
        // ObjectId datatype
        type: Schema.Types.ObjectId,
        // default set to objectId
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: [true, 'this is required'],
        maxlength: [280]
    },

    username: {
        type: String,
        required: [true, 'username is required']
    },

    createdAt: {
        type: Date,
        default: Date.now,
        //  use getter method to format timestamp on query
        get: createdAtVal => dateFormat(createdAtVal)
    }
});

// schema set up
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        //  required
        required: [true, "is required"],
        // must be between 1 and 280 characters
       length: [1-128]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // use getter method to format the timestamp on query
        get: createdAtVal => dateFormat(createdAtVal)
    },
    // the user created this thought
    username: {
        type: String,
        // required
        required: [true, 'username is required']
    },
    // similar to replies
    reactions: [
      reactionSchema
    ]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

// get count of reactions on thought
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//  create the Thought model
const Thought = model('Thought', ThoughtSchema);

// export Thought model so you can use ti in other files
module.exports = Thought;