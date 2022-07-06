const router = require('express').Router();
// const { addReaction, removeReaction } = require('../../controllers/reaction-controller');
const { createThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thought-controllers');

// /api/reactions/thoughtId
router.route('/:userId').post(createThought);

// /api/reactions/thoughtId/reactionId
router.route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(deleteThought);


router.route('./:userId:thoughtId/:reactionId').delete(removeReaction);
// router.route('/').post(createThought).get(getAllThoughts);

module.exports = router;