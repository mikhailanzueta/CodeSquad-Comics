// require monggose
const mongoose = require('mongoose');

const {Schema} = mongoose;

// Create a userSchema:
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Buffer
    },
    salt: {
        type: Buffer
    },
    // strategy: {
    //     type: String,
    //     required: true
    // }
});

// Create a new variable called User that has the Mongoose model as the value:
const User = mongoose.model("User", userSchema);

// export 'User'
module.exports = User;