const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought, 
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// GET all thoughts and CREATE thought
// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// GET, PUT (update), and DELETE single thought
// /api/thoughts/<thoughtId>
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// POST reaction by thoughtId
// /api/thoughts/<thoughtId>/reactions    
router
    .route('/:thoughtId/:reactions')
    .post(createReaction);

// DELETE reaction 
// /api/thoughts/<thoughtId>/reactions/<reactionId>
router
    .route('/:thoughtId/reactions/:reactionsId')
    .delete(deleteReaction);

module.exports = router;