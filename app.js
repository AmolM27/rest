const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.port || 3000
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', bookRouter);

app.get('/', (req,res) => {
    res.send('Welcome to my Nodemon API!');
})

var server = app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:' + port)
})
