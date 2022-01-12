const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// GET all users and POST (add) user 
// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// GET single user, PUT (update) user, and DELETE user  
// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//POST and DELETE friend
// /api/<userId>/friends/<friendId>
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;