const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
      }
    ],

    library: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
      }
    ],
    readingProgress: [
    {
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        },

        currentPage: {
            type: Number,
            default: 1
        },

        progress: {
            type: Number,
            default: 0
        }
    }
    ],
    audioProgress: [
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    },

    currentTime: {
      type: Number,
      default: 0
    }
  }
],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);