import express from "express";

import { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor, getBooksByAuthorId, addBookToAuthor, removeBookFromAuthor } from "../controllers/authors.js";

const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get("/:idAuthor/books", getBooksByAuthorId);
router.post("/:idAuthor/books", addBookToAuthor);
router.delete("/:idAuthor/books/:idBook", removeBookFromAuthor);

export default router;