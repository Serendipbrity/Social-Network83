// ------- Reaction === Comment -----------

const { Schema, Types, model } = require('mongoose');

//  reaction schema set up

const reactionSchema = new Schema({
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
        default: Date.now
        //  use getter method to format timestamp on query
    }
});

// const Reaction = model('Reaction', reactionSchema);

module.exports = reactionSchema;