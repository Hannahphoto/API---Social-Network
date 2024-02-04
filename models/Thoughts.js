const {Schema, model} = require('mongoose');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true,
            //must be between 1 and 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now,//set value to current timestamp on query
        },
        username: {//the user that created this thought
            type: String,
            required: true,
        },
        reactions: {
            //array of nested documents created with the reactionSchema
        },
    },
//schema settings - create a virtual called friendCount that retrieves the length of the uses friends array field on query
    {
        toJSON:{
            virtruals: true
        },
    }
);
//schema settings - create a virtual called friendCount that retrieves the length of the uses friends array field on query

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;