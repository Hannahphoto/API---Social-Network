const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true,
            //must be between 1 and 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now(), 
        },
        username: {//the user that created this thought
            type: String,
            required: true,
        },
        reactions: [
            //array of nested documents created with the reactionSchema
            reactionSchema,
        ],
    },
//schema settings - create a virtual called friendCount that retrieves the length of the uses friends array field on query
    {
        toJSON:{
            virtruals: true,
            getters: true,
        },
        id: false,
    }
);
//schema settings - create a virtual called friendCount that retrieves the length of the uses friends array field on query

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;