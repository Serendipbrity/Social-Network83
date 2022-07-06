// ------ FILE FOR USER FUNCTIONALITY -----------
const { User, Thought } = require('../model');

const userController = {
    // functions as methods go here

    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id:-1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                // console.log(err);
                res.status(400).json(err);
            });
    },
    
    getUserById({params}, res) {
        User.findOne({ _id: params.id })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},

    //  create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update a user
    updateUser({ params, body, res }) {
              // needs third param of true otherwise will return original
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    //  delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;