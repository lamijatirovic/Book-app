import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";
import Navbar from "./components/Navbar";
import AuthorsPage from "../pages/AuthorsPage";
import BookDetailsPage from "../pages/BookDetailsPage";
import BookCreatePage from "../pages/BookCreatePage";
import BookEditPage from "../pages/BookEditPage";
import AuthorCreatePage from "../pages/AuthorCreatePage";
import AuthorDetailsPage from "../pages/AuthorDetailsPage";
import AuthorEditPage from "../pages/AuthorEditPage";

function App() {
  return (
    <Box
      minH={"100vh"}
      bgGradient="to-b"
      gradientFrom="white"
      gradientTo="blue.300"
    >
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/books" element={<BooksPage />} />
        <Route path="/book/:id" element={<BookDetailsPage />} />
        <Route path="/book/create" element={<BookCreatePage />} />
        <Route path="/book/edit/:id" element={<BookEditPage />} />

        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/author/create" element={<AuthorCreatePage />} />
        <Route path="/author/:id" element={<AuthorDetailsPage />} />
        <Route path="/author/edit/:id" element={<AuthorEditPage />} />
      </Routes>
    </Box>
  );
}

export default App;
