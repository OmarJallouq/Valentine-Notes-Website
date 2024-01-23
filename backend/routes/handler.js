const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas');

router.get('/inbox', async (req, res) => {
    const messages = Schemas.Messages;

    const userMessages = await messages.find({}).populate("recipient").then((messageData) => {
        res.end(JSON.stringify(messageData));
    }).catch((err) =>{
        res.end(err);
    });
})


router.get('/users', async (req, res) => {
    const users = Schemas.Users;

    const users1 = await users.find({}).then((userData) => {
        res.end(JSON.stringify(userData));
    }).catch((err) =>{
        res.end(err);
    });
})

router.post('/sendMessage', async (req, res) => {
    const userMessage = req.body.messageInput;
    var userSender = req.body.senderInput || "Anonymous";
    const userRecipientName = req.body.recipientInput;
    const userRecipient = Schemas.Users;
    const userRecipientId = await userRecipient.findOne({name:userRecipientName}).exec();
    const BGcolor = req.body.cardBackgroundColor || "rgb(255,255,255)";
    const TextColor = req.body.textColor;
    
    const newMessage = new Schemas.Messages({
        message: userMessage,
        sender: userSender,
        recipient: userRecipientId._id,
        BGcolor: BGcolor,
        TextColor: TextColor,
    })

    newMessage.save().then(()=>{
        res.redirect('/send-a-message');
        res.end();
    }).catch((err)=>{
        console.log(err);
        res.redirect('/send-a-message');
        res.end('');
    })
})

router.get('/addUser', async (req, res) => {
    const user = {name: 'Laith Bulbul', email: 'laith@gmail.com', password: 'abcd1234'};
    //const newUser = new Schemas.Users(user);

    try {
        const newUser = await Schemas.Users.create(user);        
        console.log('New user created!');
        res.end('New user created!');
      } catch (err) {
        console.error(err);
        res.end('User not added!');
      }
});

module.exports = router;