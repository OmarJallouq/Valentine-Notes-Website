const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler')
const mongoose = require('mongoose');
require('dotenv/config')


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

//DB Connection
mongoose.connect(process.env.DB_URI)
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

const PORT = process.env.PORT || 4000; //Backend Routing Port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});