// Require the book model:
const Book = require('../models/bookModel');
const mongoose = require('mongoose')
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
// create an asynchronous handler function called 'getAllBooks':
const getAllBooks = async (request, response, next) => {
    const books = await Book.find({})
    try {
        if (books) {
            response.status(200).json(books)
        } else {
            response.status(400).json({message: "Books could not be found"})
        }
    } catch(error) {
        console.log(error)
    }
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
    const { title, author, publisher, genre, pages, rating, synopsis} = request.body;

    try {
        // Check if an image is uploaded
        let imageUrl = null;
        if (request.file) {
            imageUrl = request.file.path; // Multer stores the uploaded file URL here via Cloudinary
        }

        // Create a new book object
        const newBook = new Book({
            title,
            author,
            publisher,
            genre,
            pages,
            rating,
            synopsis,
            image: imageUrl // Store the image URL in the book document
        });

        // Save the new book to the database
        await newBook.save();
        response.status(201).json({
            success: { message: "A new book is created!" },
            data: newBook,
            statusCode: 201
        });
    } catch (error) {
        console.error(error);
        response.status(400).json({
            error: { message: "Something went wrong creating a book!" },
            statusCode: 400
        });
    }
}

// Create an asynchronous handler function called 'editBook':
const editBook = async (req, res) => {
    try {
        const { id } = req.params;
        // Define our future form keys to capture user input that will be stored in a future database. Equate them to the 'req.body' object:
        const { title, author, publisher, genre, pages, rating, synopsis, image } = req.body;
        

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
            synopsis,
            image
        }}, { new: true });

        if (!updatedBook) {
            return res.status(404).send({ message: 'Book not found' });
        } else {
            res.status(200).json(updatedBook);
        }
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