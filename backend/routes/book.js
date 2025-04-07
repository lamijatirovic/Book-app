import express from "express";

import { createBook, getBooks, getBookByISBN, getBookById, updateBook, deleteBook, getAuthorsByBookId, addAuthorToBook, removeAuthorFromBook } from "../controllers/book.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.get("/isbn/:isbn", getBookByISBN);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/:idBook/authors", getAuthorsByBookId);
router.post("/:idBook/authors", addAuthorToBook);
router.delete("/:idBook/authors/:idAuthor", removeAuthorFromBook);

export default router;