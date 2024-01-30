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
    const BGColor = req.body.cardBackgroundColor || "rgb(255,255,255)";
    const Textcolor = req.body.textColor || "#000";
    
    const newMessage = new Schemas.Messages({
        message: userMessage,
        sender: userSender,
        recipient: userRecipientId._id,
        BGcolor: BGColor,
        TextColor: Textcolor,
    })

    newMessage.save().then(()=>{
        res.end();
    }).catch((err)=>{
        console.log(err);
        res.end('');
    })
})

router.post('/addUser', async (req, res) => {
    const passwordInput = (Math.floor(100000 + Math.random() * 900000)).toString();
    const emailInput = req.body.email;
    const nameInput = req.body.name;

    const user = {name: nameInput, email: emailInput, password: passwordInput};
    //const user = {name: 'nameexample', email: 'emailexample', password: 'passwordexample'};

    // newUser.save().then(()=>{
    //     res.redirect('/addUser');
    //     res.end();
    // }).catch((err)=>{
    //     console.log(err);
    //     res.redirect('/addUser');
    //     res.end('');
    // })
    try {
        const newUser = new Schemas.Users(user);       
        await newUser.save(); 
        console.log('New user created!');
        res.end('New user created!');
      } catch (err) {
        console.error(err);
        res.end('User not added!');
      }
});

module.exports = router;