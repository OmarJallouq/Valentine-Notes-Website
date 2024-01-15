const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    // _id: ObjectId
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true}
});

const messageSchema = new Schema({
    // _id: ObjectId
    sender: {type: String, required:true},
    recipient: {type: Schema.Types.ObjectId, ref:'users'},
    message: {type: String, required: true},
    color: {type: String, required: true}
})

const Users = mongoose.model('users', userSchema, 'users');
const Messages = mongoose.model('messages', messageSchema, 'messages');
const mySchemas = {'Users': Users, 'Messages': Messages};

module.exports = mySchemas;