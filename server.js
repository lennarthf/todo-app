require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('coonnected to mongoDB');
    })
    .catch((err) => {
        console.log('MongoDB connectior error:', err);
    });

const todoRoutes = require('./routes/todoRoutes')
app.use('/api/todos', todoRoutes)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});