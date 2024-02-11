const {Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        // userId: {type:Schema.Types.ObjectId},
        username: {
            type: String,
            required: true,
            Unique: true,
            trimmed: true,
             
        },
        email: {
            type: String, 
            required: true,
            Unique: true,
            //much mach valid email address (look into mongoose's matching validation)
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
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
    },

    //schema settings - create a virtual called friendCount that retrieves the length of the uses friends array field on query
    {
        toJSON:{
            virtruals: true,
            // getters: true,
        },
    }

);

const Users = model('User', usersSchema);

module.exports = Users;
