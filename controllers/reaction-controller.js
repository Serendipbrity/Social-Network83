// const { User, Thought, Reaction } = require('../model');

// const reactionController = {
//     addReaction({ params, body }, res) {
//         console.log(body)
//         Reaction.create(body)
//             .then(({ _id }) => {
//                 return Thought.findByIdAndUpdate(
//                     { _id: params.thoughtId },
//                     { $push: { reactions: _id } },
//                     { new: true }
//                 );
//             })
//             .then(dbThoughtData => {
//                 if (!dbThoughtData) {
//                     res.status(404).json({ message: 'No Thought found this this id' });
//                     return;
//                 }
//                 res.json(dbThoughtData);
//             })
//             .catch(err => res.json(err));
//     },
//     removeReaction({params}, res) {
//         Reaction.findOneAndDelete({ _id: params.thoughtId })
//             .then(deletedReaction => {
//                 if (!deletedReaction) {
//                     return res.status(404).json({ message: 'No thought found with this id' });
//                 }
//                 return Thought.findByIdAndUpdate(
//                     { _id: params.thoughtId },
//                     { $pull: { reactions: params.reactionId } },
//                     { new: true }
//                 );
//             })
//             .then(dbThoughtData => {
//                 if (!dbThoughtData) {
//                     res.status(404).json({ message: 'No thought found with this id' });
//                     return;
//                 }
//                 res.json(dbThoughtData);
//             })
//             .catch(err => res.json(err));
//     }
// };

// module.exports = reactionController;