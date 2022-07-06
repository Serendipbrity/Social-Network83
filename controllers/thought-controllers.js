//  -------- FILE FOR THOUGHT FUNCTIONALITY -----------

// const { Thought, User } = require('../model');


// const thoughtController = {
//     // functions go in here as methods
//     addThought() {

//     },
//     removeThought() {
        
//     }
// };

// module.exports = thoughtController;

// ------ FILE FOR USER FUNCTIONALITY -----------
const { User, Thought } = require('../model');

const thoughtController = {
    // functions as methods go here

    // get all users
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
            // .then(dbThoughtData => res.json(dbThoughtData))
            // .catch(err => {
            //     console.log(err);
            //     res.status(400).json(err);
            // });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                // if no user found send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //  create a thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );

            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id' })
                    return;
                }
                    
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // update a thought
    updateThought({ params, body, res }) {
        // needs third param of true otherwise will return original
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //  delete user by id
    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: req.body.userId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' })
                    return;
                }
                return User.findByIdAndUpdate(
                    { _id: req.body.userId },
                    { $pull: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No Thought found this this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;