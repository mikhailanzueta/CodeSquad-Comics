// require 'express'
const express = require('express');
const { getBook, getAllBooks, createBook, editBook, deleteBook } = require('../controllers/bookController');
// require 'express.router'
const router = express.Router();

// -------------------------------------------------------------

// Copy all routes that begin with '/api/books' into this file. Remove the '/api/books' prefixes. Apply the correct CRUD methods:
router.get("/", getAllBooks)

router.get("/:id", getBook)

router.post("/create", createBook)

router.put("/edit/:id", editBook)

router.delete("/delete/:id", deleteBook)



// ------------------------------------------------------------

// Export the router:
module.exports = router;