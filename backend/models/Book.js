const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        coverImage: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            default: "Other"
        },

        source: {
            type: String,
            enum: ["external", "admin"],
            default: "external"
        },

        externalId: {
            type: String,
            default: null
        },

        pdfUrl: {
            type: String,
            default: null
        },

        audiobookUrl: {
            type: String,
            default: null
        },

    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;