const express = require('express');
const db = require('./config/connection');

//require model 
const {Users} = require('./models');

const {Thoughts} = require('./models');

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

// ???//Get all users

//Get single user by _id

//post a new user

//put - update user by _id

// delete - remove a user by _id???????

db.once('open', ()=>{
    app.listen(PORT, ()=>{
        console.log(`API server running on port ${PORT}`);
    });
});