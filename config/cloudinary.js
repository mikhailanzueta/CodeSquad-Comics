const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for file storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'codesquad-comics', // Folder in Cloudinary to store images
        allowed_formats: ['jpg', 'png', 'svg'],
        public_id: (request, file) => file.originalname.split('.')[0], // Use the original name as the public ID (without extension)
    },
});
  
const upload = multer({ storage });
module.exports = {cloudinary, upload};
