const router = require('express').Router();
const{
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
} = require('../../controllers/thouhghtsController');

//api/thoughts
router.route('/').get(getThoughts).post(createThought);

//api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

//api/thoughts/:thoughtsId/reactions
router.route('/thoghtsId/reactions');

//api/thoughts/:thoughtsID/reactions/:reactionsId

module.exports = router;