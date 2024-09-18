// require mongoose:
const mongoose = require('mongoose');

const {Schema} = mongoose;


// create a book Schema
const bookSchema = new Schema({


    title: {
        type: String   
    },
    author: {
        type: String
    },
    publisher: {
        type: String
    },
    genre: {
        type: String
    },
    pages: {
        type: Number
    },
    rating: {
        type: Number
    },
    synopsis: {
        type: String
    },
    image: {
        type: String
    }
});

// Create a new variable called Book that has the Mongoose model as the value. The model should be able to create a collection called ‘Book’ and also use the bookSchema for the collection structure
const Book = mongoose.model("Book", bookSchema);

// export 'Book'
module.exports = Book;