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
    const userSender = req.body.senderInput;
    const userReceiverName = req.body.receiverInput;
    const userReceiver = Schemas.Users;
    console.log(`RECIEVER IS: ${userReceiverName}`);
    const userReceiverId = await userReceiver.findOne({name:userReceiverName}).exec();

    const newMessage = new Schemas.Messages({
        message: userMessage,
        sender: userSender,
        receiver: userReceiverId._id
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