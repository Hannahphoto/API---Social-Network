const { connect } = require('mongoose');
const connection = require('../config/connection');
const {Users} = require('../models');
const userData = require('./usersSeed');


connection.on('error', (err)=> err);

connection.once('open', async () => {
    console.log('connected');
    console.log(userData);
    
    let usersList = await connection.db.listCollections({name:'users'}).toArray();
    if (usersList.length){
        await connection.dropCollection('users');
    }
   Users.insertMany(userData);
    // let thoughtsList = await connection.db.listCollections({name: 'thoughts'}).toArray();
    // if (thoughtsList){
    //     await connection.dropCollection('thoughts');
    // }

    
})