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
        thoughts: {
            //array of _id values referencing the Thought model 
        },
        friends: {
            //array of _id values referencing the User Model (self-reference)
        },
        // _id: {// do i need this?
        //     type: Number,
        //     required: true,
        // }
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
