import mongoose from "mongoose";
import Book from "../models/book.js";
import Author from "../models/author.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.log("error in fetching books:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error("Error fetching book by ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;

    if (!isbn) {
      return res
        .status(400)
        .json({ success: false, message: "ISBN is required." });
    }

    const book = await Book.findOne({ isbn });

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.error("Error fetching book by ISBN:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createBook = async (req, res) => {
  const book = req.body;

  if (
    !book.title ||
    !book.isbn ||
    !book.pages ||
    !book.published ||
    !book.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newBook = new Book(book);

  try {
    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    console.error("Error in Create book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }
    await Author.updateMany({ books: id }, { $pull: { books: id } });
    await Book.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully." });
  } catch (error) {
    console.error("Error deleting book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAuthorsByBookId = async (req, res) => {
  try {
    const { idBook } = req.params;

    if (!mongoose.Types.ObjectId.isValid(idBook)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID." });
    }

    const book = await Book.findById(idBook).populate("authors");

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    res.status(200).json({ success: true, data: book.authors });
  } catch (error) {
    console.error("Error fetching authors for book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addAuthorToBook = async (req, res) => {
  try {
    const { idBook } = req.params;
    const { authorId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(idBook) ||
      !mongoose.Types.ObjectId.isValid(authorId)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book or author ID." });
    }

    const book = await Book.findById(idBook);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    const author = await Author.findById(authorId);
    if (!author) {
      return res
        .status(404)
        .json({ success: false, message: "Author not found." });
    }

    if (book.authors.includes(authorId)) {
      return res
        .status(409)
        .json({
          success: false,
          message: "Author is already linked to this book.",
        });
    }

    book.authors.push(authorId);
    await book.save();

    author.books.push(idBook);
    await author.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Author linked to book successfully.",
        data: author,
      });
  } catch (error) {
    console.error("Error linking author to book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeAuthorFromBook = async (req, res) => {
  try {
    const { idBook, idAuthor } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(idBook) ||
      !mongoose.Types.ObjectId.isValid(idAuthor)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book or author ID." });
    }

    const book = await Book.findById(idBook);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }

    const author = await Author.findById(idAuthor);
    if (!author) {
      return res
        .status(404)
        .json({ success: false, message: "Author not found." });
    }

    book.authors.pull(idAuthor);
    await book.save();

    author.books.pull(idBook);
    await author.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Author removed from book successfully.",
      });
  } catch (error) {
    console.error("Error removing author from book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
