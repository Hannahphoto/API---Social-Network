const express = require('express');
const db = require('./config/connection');

//require model 
const {Users} = require('./models');

const {Thoughts} = require('./models');

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

//Get all users
app.get('/users', async (req, res)=>{
    try{
        //using model in users route to find all users
        const users = await Users.find({});
        console.log(users);
        res.status(200).json(users);
    }catch (err){
        res.status(500).json({message:'Internal server error'});
    }
});

//Get single user by _id

//post a new user

//put - update user by _id

// delete - remove a user by _id???????


//get all thoughts
app.get('/thoughts', async (req, res)=>{
    try{
        const thoughts = await Thoughts.find({});
        console.log(thoughts);
        res.status(200).json(thoughts);
    }catch (err){
        res.status(500).json({message: 'Internal server error'});
    }
});

db.once('open', ()=>{
    app.listen(PORT, ()=>{
        console.log(`API server running on port http://localhost:${PORT}`);
    });
});