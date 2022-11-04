const express = require('express');
const app = express();
app.use(express.json());

const userData = require('./userData.json');

let statusCode = 200;
let port = process.env.PORT || 3001;

app.get('/users', (req, res) => {
    res.json(userData);
});

app.post('/users',  (req, res) => {
    //Grab data sent by client
    const newUser = req.body;
    //Add data to userList
    userList.push(newUser);
    //Return new list
    res.json(userData);
});

app.put('/users', (req, res) => {
    //Grab the new name
    const newName = req.body.newName;
    //Loop through list and update the names
    for (let i = 0; i < userList.length; i++){
        userData[i].name = newName;
    }
    //Return the new List
    res.json(userList);
});

app.delete('/users/:id', (req, res) => {
    //Get the id
    const id = req.params.id;
    let foundID = false;
    //Delete user with id
    for(let i = 0; i < userList.length; i++){
        if (userList[i].id == id){
            userData.splice(i, 1);
            foundID = true;
        }
    }
    //Return list
    if (!foundID){
        res.status(404).json({error: "User ID not foud" });
    } else{
        res.status(statusCode).json(userList);
    }
});

app.listen(port, () => {
    console.log('Server running on port ${port}');
});