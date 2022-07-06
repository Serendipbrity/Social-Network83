// import dependencies
const { Schema, model } = require('mongoose');

// schema set up
const UserSchema = new Schema({
    username: {
        type: String,
        // make it required
        required:  "Username is required",
        // take away white space
        trim: true,
        // make it unique
        unique: true
        
    },
    email: {
        type: String,
        //  required
        required: [true, "is required"],
        //  unique
        unique: true,
        // match valid email address
        match: [/.+\@.+\..+/, "please enter a valid email address"]
    },
    thoughts: [
        {
        // array of _id values matching Thought model
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }]
    ,
    friends: [
        {
        //  array of _id values referencing the User model (self reference)
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
    toJSON:{

        virtuals: true,
        },
        id: false
});

UserSchema.virtual('friendCount').get(function () {
    return this.thoughts.reduce(
        (total, thought) => total + thought.reactions.length + 1,
        0
    );
});

//  create the user model using UserSchema
const User = model('User', UserSchema);

// export the user model so you can use it in other files
module.exports = User;