const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const introRoutes = require('./routes/routes');

app.use(express.json());
dotenv.config();    

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_CLUSTER}/${process.env.MONGO_DATABASE_NAME}`;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', introRoutes);

mongoose.connect(
    MONGODB_URI + '?retryWrites=true&w=majority'
    )
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App started on port ${process.env.PORT}`);
        });   
    })
    .catch(err => console.log(err));
