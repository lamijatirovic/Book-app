import { useBooksStore } from "@/store/books";
import {
  Box,
  Container,
  Text,
  Input,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const BookEditPage = () => {
  const { id } = useParams();

  const { fetchBook, book, editBook } = useBooksStore();

  const [newBook, setNewBook] = useState({
    isbn: "",
    title: "",
    pages: "",
    published: "",
    image: "",
  });

  useEffect(() => {
    fetchBook(id);
  }, []);

  useEffect(() => {
    if (book) {
      setNewBook({
        isbn: book.isbn || "",
        title: book.title || "",
        pages: book.pages || "",
        published: book.published || "",
        image: book.image || "",
      });
    }
  }, [book]);

  const navigate = useNavigate();

  const handleEditBook = async () => {
    const { success, message } = await editBook(id, newBook);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        duration: 5000,
      });
    } else {
      navigate(`/book/${id}`);
    }
  };
  return (
    <Container maxW="xl" py={12}>
      <VStack spacing={8}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="5vh">
          Edit book
        </Text>
        <Box w="full" bg="white" p={6} rounded="lg" shadow="md">
          <VStack spacing={4}>
            <Input
              placeholder="ISBN"
              name="isbn"
              value={newBook.isbn}
              onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
            />
            <Input
              placeholder="Title"
              name="title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <Input
              placeholder="Number of pages"
              name="pages"
              value={newBook.pages || ""}
              type="number"
              min={1}
              onChange={(e) =>
                setNewBook({ ...newBook, pages: e.target.value })
              }
            />
            <Input
              placeholder="Publication year"
              name="published"
              value={newBook.published || ""}
              type="number"
              min={1}
              onChange={(e) =>
                setNewBook({ ...newBook, published: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newBook.image || ""}
              onChange={(e) =>
                setNewBook({ ...newBook, image: e.target.value })
              }
            />
            <HStack>
              <Button w="50%" bg="blue.500" onClick={handleEditBook}>
                Save
              </Button>
              <Button
                w="50%"
                bg="red.500"
                onClick={() => navigate(`/book/${id}`)}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default BookEditPage;
