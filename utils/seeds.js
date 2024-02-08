const { connect } = require('mongoose');
const connection = require('../config/connection');
const {Users, Thoughts} = require('../models');
const userData = require('./usersSeed');
const thoughtData = require('./thoughtsSeed');


connection.on('error', (err)=> err);

connection.once('open', async () => {
    console.log('connected');
    console.log(userData);
    console.log(thoughtData);
    
    try{
        //drop collections if they exist
        await connection.db.dropCollection('users');
        await connection.db.dropCollection('thoughts');

        //insert user data
        await Users.insertMany(userData);

        //insert thought data
        await Thoughts.insertMany(thoughtData);

        console.log('Seeding completed.')
    }catch(error){
        console.error('Error seeding database', error);
    }    
});


