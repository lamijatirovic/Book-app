import { useState } from "react";
import { Text, Icon } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  NativeSelect,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAuthorsStore } from "@/store/authors";

const SelectBookContent = ({ books, author }) => {
  const [selectedBook, setSelectedBook] = useState("");

  const { addBookToAuthor } = useAuthorsStore();

  const handleAddBook = async (aid, bid) => {
    const { success, message } = await addBookToAuthor(aid, bid);
    toaster.create({
      type: success ? "success" : "error",
      title: success ? "Success" : "Error",
      description: message,
      duration: 5000,
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          bg="transparent"
          _hover={{ bg: "blue.100" }}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Icon as={FaPlus} boxSize={3} color="blue.500" />
          <Text color="blue.500">Add author books</Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>
                Add books for {author.firstName} {author.lastName}{" "}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <NativeSelect.Root size="sm" width="240px">
                <NativeSelect.Field
                  placeholder="Select book"
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.currentTarget.value)}
                >
                  {books.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.title}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              <Text mt="20px">No book you are looking for? </Text>
              <Link to="/book/create">
                <Text color="blue.500" cursor="pointer">
                  Add new book
                </Text>
              </Link>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => handleAddBook(author._id, selectedBook)}>
                ADD
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SelectBookContent;
