const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')

const app = express();

const allowedOrigins = ['https://baivalentines.netlify.app/']
// app.use(cors({
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routesHandler);

//DB Connection
mongoose.connect(`${process.env.DB_URI}`)
  .then(() => {
    console.log('DB Connected!');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 4000; //Backend Routing Port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});