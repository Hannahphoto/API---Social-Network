const {ObjectId} = require('mongoose').Types;
const {Thoughts, Users}= require('../models');

//aggregate function to get the number of thoughts overall 
// const thoughtsCount = async () =>{
//     const numberOfThoughts = await Thoughts.aggregate();
    // return numberOfThoughts;
// };

module.exports={
    //get all Thoughts
    async getThoughts(req, res){
        try{
            const thoughts = await Thoughts.find();
            return res.json(thoughts);
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //get a single thought
    async getSingleThought(req, res){
        try{
        const thought = await Thoughts.findOne({_id:req.params.thoughtId})
        .select()
        if(!thought){
            return res.status(404).json({message: 'No thought with that ID'});
        }return res.json(thought);
    }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //create new thought
    async createThought(req, res){
        try{
            const thought = await Thoughts.create(req.body);
            res.json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },

    //delete a thought and remove it
    async deleteThought(req, res){
        try{
            const thought = await Thoughts.findOneAndDelete({_id: req.params.thoughtId});
            if(!thought){
                return res.status(404).json({message: "No such thought exits."})
            }
            res.json({message:'Thought successfully deleted.'});
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
        const user = await Users.findByIdAndUpdate(
            req.params.userId,
            {$pull: {users: req.params.thoughtId}},
            {new: true}
            )
        if(!user){
            return res.status(404).json({
                message: 'User deleted, no thought found',
            })
        }return res.json(user);
    },

    //Update Thought
    async updateThought(req, res){
        try{
            const thought = await Thoughts.findByIdAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {new: true},
                );
            if(!thought){
                return res.status(404).json({message: "No such thought exists."})
            } return res.json(thought);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },


};

