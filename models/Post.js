const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
        unique: true
    },
    thumbnailImage: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false
    },
    username: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);