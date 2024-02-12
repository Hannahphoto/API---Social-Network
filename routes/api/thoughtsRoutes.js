const router = require('express').Router();
const{
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
} = require('../../controllers/thouhghtsController');

//api/users
router.route('/').get(getThoughts).post(createThought);

//api/users/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

module.exports = router;