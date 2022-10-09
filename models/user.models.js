const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    mobile: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);