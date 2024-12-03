const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/testapp1")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to MongoDB: ", err));

// Define user schema with correct data types
const userSchema = mongoose.Schema({
    image: { type: String },
    email: { type: String },
    name: { type: String }
});

// Export the user model
module.exports = mongoose.model('user', userSchema);
