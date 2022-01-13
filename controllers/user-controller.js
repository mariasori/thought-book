const { User, Thought } = require('../models');

const userController = {
//  getAllUsers
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then((dbUserData) => {
                res.json(dbUserData)
            })
            .catch((err) => {
                cosole.log(err);
                res.status(400).json(err)
            })
    },

//   getUserById
//   GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .select('-__v')
        .populate([
            {
                path: 'thoughts',
                select: '-__v'
            },
            {
                path: 'friends',
                select: '-__v'
            }
        ])
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id'})
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

//   createUser
//   POST a new user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(400).json(err))
    },

//   updateUser
//   PUT to update a user by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true, runValidators: true})
            .then((dbUserData) => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this id' });
                        return;
                    }
                    res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },
   
//   deleteUser
//   DELETE to remove user by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this id' });
                        return;
                    }
                    res.json({ message: 'User successfully deleted!'})
            })
            .catch(err => res.status(400).json(err))
    },
 
// /api/users/:userId/friends/:friendId

// addFriend
// POST to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends: params.friendId }},
            { new: true, runValidators: true}
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id'});
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            });
    },

// deleteFriend
// DELETE to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if(!dbUserData) {
                    return res
                        .status(404)
                        .json({ message: 'No user found with this id'});
                }
                res.json({ message: 'Friend successfully deleted!'});
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            });
    }
};

module.exports = userController;