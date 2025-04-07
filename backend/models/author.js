import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    image: { type: String, required: true } 
    },
    { timestamps: true } 
);

const Author = mongoose.model('Author', authorSchema);

export default Author;