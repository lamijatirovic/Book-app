import { Text, Icon } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useBooksStore } from "@/store/books";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DeleteBookContent = ({ book }) => {
  const { deleteBook } = useBooksStore();

  const navigate = useNavigate();

  const handleDeleteBook = async (bid) => {
    const { success, message } = await deleteBook(bid);
    if (success) {
      navigate("/books");
    } else {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        duration: 5000,
      });
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          bg="transparent"
          _hover={{ bg: "red.100" }}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Icon as={FaTrash} boxSize={5} color="red.500" />
          <Text color="red.500">Delete</Text>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete book</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>Are you sure you want to delete {book.title}?</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">NO</Button>
              </Dialog.ActionTrigger>
              <Button onClick={() => handleDeleteBook(book._id)}>YES</Button>
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

export default DeleteBookContent;
