const { connect } = require('mongoose');
const connection = require('../config/connection');
const {Users} = require('../models');
const {Thoughts} = require('../models/Thoughts')
const userData = require('./usersSeed');
const thoughtData = require('./thoughtsSeed');


connection.on('error', (err)=> err);

connection.once('open', async () => {
    console.log('connected');
    console.log(userData);
    
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


// let usersList = await connection.db.listCollections({name:'users'}).toArray();
// if (usersList.length){
//     await connection.dropCollection('users');
// }

// Users.insertMany(userData);

// let thoughtsList = await connection.db.listCollections({name: 'thoughts'}).toArray();
// if (thoughtsList){
//     await connection.dropCollection('thoughts');
// }

// await Thoughts.insertOne(thoughtData.map(id));    
// await Thoughts.insertOne({
//     thoughtText:
// })
