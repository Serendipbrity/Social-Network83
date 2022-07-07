const router = require('express').Router();
// const { addReaction, removeReaction } = require('../../controllers/reaction-controller');
const { createThought, deleteThought, addReaction, removeReaction, getAllThoughts,getThoughtById } = require('../../controllers/thought-controllers');


router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .delete(deleteThought);

router
    .route('/')
    .post(addReaction)
    .put(addReaction)
    .delete(deleteThought);;
 

router.route('./:userId:thoughtId/:reactionId').delete(removeReaction);
// router.route('/').post(createThought).get(getAllThoughts);

module.exports = router;