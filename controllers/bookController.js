// Require the book model:
const Book = require('../models/bookModel');
const mongoose = require('mongoose')

// create an asynchronous handler function called 'getAllBooks':
const getAllBooks = async (request, response, next) => {
    await Book.find({}).then((books) => {
        response.status(200).json({success: {message: "This route points to the books page with all the books."}, 
        data: books, statusCode: 200})
    })
}

// Create an asynchronous handler function called 'getBook':
const getBook = async (request, response, next) => {
    const { id } = request.params;
    console.log(id)
    // stage a try/catch statement:
    try {
        // console.log(`Number of books in collection: ${await Book.estimatedDocumentCount()}`)
        const matchedBook = await Book.findById(id)
        if (matchedBook) {
            response.status(200).json(matchedBook)
        } else {
            response.status(400).json({message: "Book not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

// Create an asynchronous handler function called 'createBook':
const createBook = async (request, response, next) => {
    // Define our future form keys to capture user input that will be stored in a future database. Equate them to the 'req.body' object:
    const { title, author, publisher, genre, pages, rating, synopsis } = request.body;

    // create a variable called 'newBook' and equate that to a constructor object called new Book() with keys that are 
    // the same as the keys in 'data.js' file:
    const newBook = new Book({
        title: title,
        author: author,
        publisher: publisher,
        genre: genre,
        pages: pages,
        rating: rating,
        synopsis: synopsis
    });

    // Stage a try/catch statement:
    try {
        // save the new book:
        await newBook.save();
        response.status(201).json({success: {message: "A new book is created!"}, data: newBook, statusCode: 201})
    } catch (error) {
        response.status(400).json({error: {message: "Something went wrong creating a book!"}, statusCode: 400})
    }
}

// Create an asynchronous handler function called 'editBook':
const editBook = async (req, res) => {
    try {
        const { id } = req.params;
        // Define our future form keys to capture user input that will be stored in a future database. Equate them to the 'req.body' object:
        const { title, author, publisher, genre, pages, rating, synopsis } = request.body;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ObjectId format' });
        }
        console.log("ID received in request:", id); 

        // Find and update the book by ObjectId
        const updatedBook = await Book.findByIdAndUpdate(id, {$set: {
            title,
            author,
            publisher,
            genre,
            pages,
            rating,
            synopsis
        }}, { new: true });

        if (!updatedBook) {
            return res.status(404).send({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).send({ message: `Error updating the book: ${error.message}` });
    }
};
// Create an asynchronous handler function called 'deleteBook':
const deleteBook = async (request, response, next) => {
    const {id} = request.params;

    // Stage a try/catch statement:
    try {
        // For this one, add the await keyword. Then, connect the Book object to use the findByIdAndDelete() method  1 parameter, id.
        await Book.findByIdAndDelete(id);
        response.status(200).json({success: {message: "Book deleted successfully!"}, statusCode: 200});
    } catch (error) {
        response.status(400).json({error: {message: "Something went wrong while deleting the book!"}, statusCode: 400});
    }
}

// Export all of the handler functions with module.exports:
module.exports = { getAllBooks, getBook, createBook, editBook, deleteBook };