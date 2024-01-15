const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas');

router.get('/inbox', async (req, res) => {
    const messages = Schemas.Messages;

    const userMessages = await messages.find({}).populate("user").then((messageData) => {
        res.end(JSON.stringify(messageData));
    }).catch((err) =>{
        res.end(err);
    });
})

router.post('/sendMessage', async (req, res) => {
    const userMessage = req.body.messageInput;
    const userReciever = req.body.recieverInput;
    const user = Schemas.Users;
    const userId = await user.findOne({email:"omar.jallouq@studbocconi.it"}).exec();

    const newMessage = new Schemas.Messages({
        message: userMessage,
        sender: userId._id,
        reciever: userReciever
    })

    newMessage.save().then(()=>{
        res.redirect('/sendMessage');
        res.end();
    }).catch((err)=>{
        console.log(err);
        res.redirect('/sendMessage');
        res.end('');
    })
})

router.get('/addUser', async (req, res) => {
    const user = {name: 'Sara Macaya', email: 'sara@gmail.com', password: 'Password123'};
    //const newUser = new Schemas.Users(user);

    try {
        const newUser = await Schemas.Users.create(user);        
        console.log('New user created!');
        res.end('New user created!');
      } catch (err) {
        console.error(err);
        res.end('User not added!');
      }
});// TODO: Doesnt work idk why

module.exports = router;