const {Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
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
            type: Schema.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            //array of _id values referencing the User Model (self-reference)
  
            type: Schema.ObjectId,
            ref: 'User'
        }],
        tags: [{
            type: Schema.Types.ObjectId,
            ref: 'tag', //look like an _id, ObjectId
        }]
    },

    //schema settings - create a virtual called friendCount that retrieves the length of the uses friends array field on query
    {
        toJSON:{
            virtruals: true,
            // getters: true,
        },
    }

);

const Users = model('user', usersSchema);

module.exports = Users;
