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
import { useBooksStore } from "@/store/books";

const SelectAuthorContent = ({ authors, book }) => {
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const { addAuthorToBook } = useBooksStore();

  const handleAddAuthor = async (bid, aid) => {
    const { success, message } = await addAuthorToBook(bid, aid);
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
          <Text color="blue.500">Add book authors</Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add authors for {book.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <NativeSelect.Root size="sm" width="240px">
                <NativeSelect.Field
                  placeholder="Select author"
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.currentTarget.value)}
                >
                  {authors.map((author) => (
                    <option key={author._id} value={author._id}>
                      {author.firstName} {author.lastName}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>

              <Text mt="20px">No author you are looking for? </Text>
              <Link to="/author/create">
                <Text color="blue.500" cursor="pointer">
                  Add new author
                </Text>
              </Link>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Close</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => handleAddAuthor(book._id, selectedAuthor)}>
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

export default SelectAuthorContent;
