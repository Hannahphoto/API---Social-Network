const {Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280, //is this correct for max character?
        },
        username:{
            type: String,
            required: true,
        },
        createdAt: {
            date: Date,
            default: Date.now,
            //use a getter method to format the timestamp on query
        }
    },
    {
        toJSON:{
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;