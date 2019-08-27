const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.port || 3000
const Book = require('./models/bookModel');

bookRouter.route('/books')
    .get((req, res) => {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            else{
                return res.json(books);
            }
        });
});

bookRouter.route('/books/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                return res.send(err);
            }
            else{
                return res.json(book);
            }
        });
});

app.use('/api', bookRouter);

app.get('/', (req,res) => {
    res.send('Welcome to my Nodemon API!');
})

var server = app.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:' + port)
})