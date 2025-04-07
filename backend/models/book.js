import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    pages: { type: Number, required: true },
    published: { type: Number, required: true },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }], 
    image: { type: String, require: true }
    },
    { timestamps: true } 
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
