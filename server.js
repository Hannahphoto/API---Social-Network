const express = require('express');
const db = require('./config/connection');

//require model 
const {Users} = require('./models');

const {Thoughts} = require('./models');
const { deleteUser } = require('./controllers/usersController');

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
app.get('/users/:id', async (req, res)=>{
    try{
        //using model in users route to find one user via id
        const user = await Users.findOne({});
        console.log(user);
        res.status(200).json(user);
    }catch (err){
        res.status(500).json({message: 'Internal server error'});
    }
});

//post a new user
app.post('/createUser', async (req, res)=>{
    //insert new user into model users route
    try{
        const newUser = Users.create({
            username: req.body.username, 
            email: req.body.email,
        });
        console.log(newUser);
        res.status(200).json(newUser);
    }catch(err){
        res.status(500).json({messge: 'Internal server error'})
    }
});

//put - update user by _id
app.put('/users/:usersId', async (req, res)=>{
    try{
        //update user is model route
        const updateUser = await Users.findOneAndUpdate(
        {
            username: req.body.username, 
            email: req.body.email
        },
        );
        console.log(updateUser);
        res.status(200).json(updateUser);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Bad request"})
    }
});

// delete - remove a user by _id???????
app.delete('/users/:userId', async (req, res)=>{
    //delete user by _id
    try{
        const deleteUser = await Users.findOneAndDelete({
            _id: req.params.userId
        });
        console.log(deleteUser);
        res.status(200).json(deleteUser);
    }catch(err){
        res.status(500).json({message: 'Internal server error'})
    }
});

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

//post create thought(add a thought to a user?)

//get a single thought by thought _id

//update thought by thought _id

//delete thought by thought _id

db.once('open', ()=>{
    app.listen(PORT, ()=>{
        console.log(`API server running on port http://localhost:${PORT}`);
    });
});