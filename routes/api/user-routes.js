const router = require('express').Router();

//  import functionality
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers')

// set up all get and post at /api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//  set up GET one, PUT and DELETE at /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;
    