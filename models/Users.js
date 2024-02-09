const {Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        // _id:{
        //     type: Schema.Types.ObjectId,
        //     auto: true,
        //     required: true,
        // },
        username: {
            type: String,
            required: true, 
        },
        email: {
            type: String, 
            required: true,
            //much mach valid email address (look into mongoose's matching validation)
        },
        thoughts: [{
            //array of _id values referencing the Thought model 
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            //array of _id values referencing the User Model (self-reference)
  
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },

    //schema settings - create a virtual called friendCount that retrieves the length of the uses friends array field on query
    {
        toJSON:{
            virtruals: true
        },
    }

);

const Users = model('user', usersSchema);

module.exports = Users;
