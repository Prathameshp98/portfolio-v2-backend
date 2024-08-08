const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const port = 8282;

app.use(express.json());
dotenv.config();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});