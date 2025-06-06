import { useAuthorsStore } from "@/store/authors";
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
import { formatDate } from "@/store/dateFormat";

const AuthorEditPage = () => {
  const { id } = useParams();

  const { fetchAuthor, author, editAuthor } = useAuthorsStore();

  const [newAuthor, setNewAuthor] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    image: "",
  });

  useEffect(() => {
    fetchAuthor(id);
  }, []);

  useEffect(() => {
    if (author) {
      setNewAuthor({
        firstName: author.firstName || "",
        lastName: author.lastName || "",
        dob: formatDate(author.dob) || "",
        image: author.image || "",
      });
    }
  }, [author]);

  const navigate = useNavigate();

  const handleEditAuthor = async () => {
    const { success, message } = await editAuthor(id, newAuthor);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        duration: 5000,
      });
    } else {
      navigate(`/author/${id}`);
    }
  };
  return (
    <Container maxW="xl" py={12}>
      <VStack spacing={8}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="5vh">
          Edit author
        </Text>
        <Box w="full" bg="white" p={6} rounded="lg" shadow="md">
          <VStack spacing={4}>
            <Input
              placeholder="First Name"
              name="firstName"
              value={newAuthor.firstName}
              onChange={(e) =>
                setNewAuthor({ ...newAuthor, firstName: e.target.value })
              }
            />
            <Input
              placeholder="Last Name"
              name="lastName"
              value={newAuthor.lastName}
              onChange={(e) =>
                setNewAuthor({ ...newAuthor, lastName: e.target.value })
              }
            />
            <Input
              name="dob"
              value={newAuthor.dob || ""}
              type="date"
              onChange={(e) =>
                setNewAuthor({ ...newAuthor, dob: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newAuthor.image || ""}
              onChange={(e) =>
                setNewAuthor({ ...newAuthor, image: e.target.value })
              }
            />
            <HStack>
              <Button w="50%" bg="blue.500" onClick={handleEditAuthor}>
                Save
              </Button>
              <Button
                w="50%"
                bg="red.500"
                onClick={() => navigate(`/author/${id}`)}
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

export default AuthorEditPage;
