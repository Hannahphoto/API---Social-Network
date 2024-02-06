// const {ObjectId} = require('mongoose').Types;
const {Thoughts, Users}= require('../models');

module.exports={
    //get all Thoughts
    async getThoughts(req, res){
        try{
            const thoughts = await Thoughts.find();
            const thoughtsObj = {
                thoughts, 
                thoughtsCount: await thoughtsCount(),
            };
            return res.json(thoughtsObj);
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
        }}catch(err){
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
            const thought = await Thoughts.findOneAndRemove({_id: req.params.thoughtId});
            if(!thought){
                return res.status(404).json({message: "No such thought exits."})
            }

            const user = await Users.findOneAndUpdate(
                {users: req.params.userId},
                {$pull: {users: req.params.thoughtId}},
                {new: true}
                )
            if(!thought){
                return res.status(404).json({
                    message: 'User deleted, nut no thought found',
                })
            }
            
            res.json({message:'User successfully deleted.'});
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    },

};

