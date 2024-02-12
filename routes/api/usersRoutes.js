const router = require('express').Router();
const{
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addThought,
    removeThought,
} = require('../../controllers/usersController');

//api/users
router.route('/').get(getUsers).post(createUser);

//api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

//api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

//api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

//api/users/:userId/friends/:friendId

module.exports = router;