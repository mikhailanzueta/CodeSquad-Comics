// require 'express'
const express = require('express');
const { getBook, getAllBooks, createBook, editBook, deleteBook } = require('../controllers/bookController');
// require 'express.router'
const router = express.Router();
const { upload } = require('../config/cloudinary');

// -------------------------------------------------------------

// Copy all routes that begin with '/api/books' into this file. Remove the '/api/books' prefixes. Apply the correct CRUD methods:
router.get("/", getAllBooks)

router.get("/:id", getBook)

router.post("/create", upload.single('image'), (req, res, next) => {
    if (!req.file) {
        console.log('File not received by Multer')
    } else {
        console.log('File received!: ', req.file)
    }
    next();
}, createBook);

router.put("/edit/:id", (req, res, next) => {
    console.log("Edit route hit with ID:", req.params.id);
    next();
}, editBook);


router.delete("/delete/:id", deleteBook)



// ------------------------------------------------------------

// Export the router:
module.exports = router;