//ObjectId() method for converting usersId string into an ObjectId for querying database
const {ObjectId} = require('mongoose');
const {Users, Thoughts} = require('../models');

//aggregate function to get the number of users overall 
// const usersCount = async () =>{
//     const numberOfUsers = await Users.aggregate();
//     return numberOfUsers;
// };

module.exports = {
    //get all users
    async getUsers(req, res){
        try{
            const users = await Users.find()
            return res.json(users);
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get a single user
    async getSingleUser(req, res){
        try{
        
        const user = await Users.findOne({_id: req.params.userId})
        .populate('friends')
        .select()
        .lean();
        if(!user){
            return res.status(404).json({message: 'No user with that ID'});
        }  return res.json(user);
    }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
      
    },

    //create new user
    async createUser(req, res){
        try{
            const user = await Users.create(req.body);
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //delete a user and remove them
    async deleteUser(req, res){
        try{
            const user = await Users.findOneAndDelete({_id: req.params.userId});
            if(!user){
                return res.status(404).json({message: "No such user exits."})
            }return res.json({message: 'User successfully deleted', user});
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Update user
    async updateUser(req, res){
        try{
            const user = await Users.findByIdAndUpdate(
                req.params.userId,
                {
                username: req.body.username, 
                email: req.body.email,
                },
                {
                new: true,
                }
                );
            if(!user){
                return res.status(404).json({message: "No such user exists."})
            } return res.json(user);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Add a thought to a user
    async addThought(req, res){
        try{
            console.log('you are adding an assignment');
            const user = await Users.findByIdAndUpdate(
                req.params.userId,
                {$addToSet: {thought: req.body}},
                {runValidators: true, new: true}
            );
            if(!user){
                return res
                .status(404)
                .json({message: "No user found with that Id"});
            }
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //Remove a thought from a user
    async removeThought(req, res){
        try{
            const user = await Users.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {thought: {thoughtId: req.params.thoughtId}}},
                {runValidators: true, new: true}
            );
            if(!user){
                return res
                .status(404)
                .json({message: "No user found with that Id"});
            }
            res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
    };

    // const thought = await Thoughts.findOneAndUpdate(
    //     {users: req.params.userId},
    //     {$pull: {users: req.params.userId}},
    //     {new: true}
    //     )
    // if(!thought){
    //     return res.status(404).json({
    //         message: 'User deleted, nut no thought found',
    //     })
    // }//return both the updated user and the thought
    // console.log(thought);

    
    // const thought = await Thoughts.findOneAndUpdate(
    //     {users: req.params.userId},
    //     {$pull: {users: req.params.userId}},
    //     {new: true}
    //     )
    // if(!thought){
    //     return res.status(404).json({
    //         message: 'User deleted, nut no thought found',
    //     })
    // }res.json({message:'User successfully deleted.'});