import mongoose from "mongoose";
import Book from "../models/book.js";
import Author from "../models/author.js";

export const getAuthors = async (req, res) => {
	try {
		const authors = await Author.find({}).sort({ createdAt: -1 });;
		res.status(200).json({ success: true, data: authors });
	} catch (error) {
		console.log("error in fetching authors:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getAuthorById = async (req, res) => {
	try {
		const { id } = req.params; 

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ success: false, message: "Invalid author ID." });
		}

		const author = await Author.findById(id);

		if (!author) {
			return res.status(404).json({ success: false, message: "Author not found." });
		}

		res.status(200).json({ success: true, data: author });
	} catch (error) {
		console.error("Error fetching author by ID:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createAuthor = async (req, res) => {
	const { firstName, lastName, dob, image } = req.body;

	if (!firstName || !lastName || !dob || !image) {
		return res.status(400).json({ success: false, message: "Please provide all required fields." });
	}

	try {
		const existingAuthor = await Author.findOne({ firstName, lastName, dob });

		if (existingAuthor) {
			return res.status(409).json({ success: false, message: "An author with this name and date of birth already exists." });
		}

		const newAuthor = new Author({ firstName, lastName, dob, image});

		await newAuthor.save();
		res.status(201).json({ success: true, data: newAuthor });

	} catch (error) {
		console.error("Error in creating author:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateAuthor = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, dob, image, books } = req.body;

		if (!firstName || !lastName || !dob || !image) {
			return res.status(400).json({ success: false, message: "Please fill in all the fields." });
		}

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ success: false, message: "Invalid author ID." });
		}

		const author = await Author.findById(id);
		if (!author) {
			return res.status(404).json({ success: false, message: "Author not found." });
		}

		const existingAuthor = await Author.findOne({ firstName, lastName, dob, _id: { $ne: id } });

		if (existingAuthor) {
			return res.status(409).json({ success: false, message: "An author with this name and date of birth already exists." });
		}

		const updatedAuthor = await Author.findByIdAndUpdate(
			id,
			{ firstName, lastName, dob, image, books },
			{ new: true }
		);

		res.status(200).json({ success: true, data: updatedAuthor });
	} catch (error) {
		console.error("Error updating author:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid author ID." });
        }
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ success: false, message: "Author not found." });
        }
        await Book.updateMany(
            { authors: id },
            { $pull: { authors: id } } 
        );
        await Author.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Author deleted successfully." });
    } catch (error) {
        console.error("Error deleting author:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getBooksByAuthorId = async (req, res) => {
  try {
	const { idAuthor } = req.params;

	if (!mongoose.Types.ObjectId.isValid(idAuthor)) {
	  return res
		.status(400)
		.json({ success: false, message: "Invalid author ID." });
	}

	const author = await Author.findById(idAuthor).populate("books");

	if (!author) {
	  return res
		.status(404)
		.json({ success: false, message: "Author not found." });
	}

	res.status(200).json({ success: true, data: author.books });
  } catch (error) {
	console.error("Error fetching books for authors:", error.message);
	res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addBookToAuthor = async (req, res) => {
  try {
	const { idAuthor } = req.params;
	const { idBook } = req.body;

	if (
	  !mongoose.Types.ObjectId.isValid(idAuthor) ||
	  !mongoose.Types.ObjectId.isValid(idBook)
	) {
	  return res
		.status(400)
		.json({ success: false, message: "Invalid book or author ID." });
	}

	const author = await Author.findById(idAuthor);
	if (!author) {
	  return res
		.status(404)
		.json({ success: false, message: "Author not found." });
	}

	const book = await Book.findById(idBook);
	if (!book) {
	  return res
		.status(404)
		.json({ success: false, message: "Book not found." });
	}

	if (author.books.includes(idBook)) {
	  return res
		.status(409)
		.json({
		  success: false,
		  message: "Book is already linked to this author.",
		});
	}

	author.books.push(idBook);
	await author.save();

	book.authors.push(idAuthor);
	await book.save();

	res
	  .status(200)
	  .json({
		success: true,
		message: "Book linked to author successfully.",
		data: book,
	  });
  } catch (error) {
	console.error("Error linking book to author:", error.message);
	res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeBookFromAuthor = async (req, res) => {
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

	const author = await Author.findById(idAuthor);
	if (!author) {
	  return res
		.status(404)
		.json({ success: false, message: "Author not found." });
	}

	const book = await Book.findById(idBook);
	if (!book) {
	  return res
		.status(404)
		.json({ success: false, message: "Book not found." });
	}

	author.books.pull(idBook);
	await author.save();

	book.authors.pull(idAuthor);
	await book.save();

	res
	  .status(200)
	  .json({
		success: true,
		message: "Book removed from author successfully.",
	  });
  } catch (error) {
	console.error("Error removing book from author:", error.message);
	res.status(500).json({ success: false, message: "Server Error" });
  }
};