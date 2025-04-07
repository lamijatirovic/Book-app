import express from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.js";
import authorRoutes from "./routes/author.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});