const router = require('express').Router();
const thoughtsRoutes = requier('./thoughtsRoutes');
const usersRoutes = require('./usersRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;

