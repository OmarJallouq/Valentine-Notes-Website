const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    // _id: ObjectId
    name: {type: String},
    email: {type: String,},
    password: {type: String,}
});

const messageSchema = new Schema({
    // _id: ObjectId
    sender: {type: Schema.Types.ObjectId, ref:'users'},
    reciever: {type: String}, //TODO: Make this into a ref to users, and implement everything
    message: {type: String, required: true}
})

const Users = mongoose.model('users', userSchema, 'users');
const Messages = mongoose.model('messages', messageSchema, 'messages');
const mySchemas = {'Users': Users, 'Messages': Messages};

module.exports = mySchemas;