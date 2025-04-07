import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Text,
  Image,
  Container,
  VStack,
  Spinner,
  SimpleGrid,
  HStack,
  Icon,
  Flex,
  Box,
  Tag,
  Button,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useBooksStore } from "@/store/books";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthorsStore } from "@/store/authors";
import SelectBookContent from "@/components/SelectBookContent";
import DeleteAuthorContent from "@/components/DeleteAuthorContent";
import { formatDate } from "@/store/dateFormat";
import { Link } from "react-router-dom";

const AuthorDetailsPage = () => {
  const { id } = useParams();

  const {
    fetchAuthor,
    author,
    isLoading,
    fetchBooksForAuthor,
    authorBooks,
    isLoadingBooks,
    removeBookFromAuthor,
  } = useAuthorsStore();
  const { fetchBooks, books } = useBooksStore();

  useEffect(() => {
    fetchAuthor(id);
    fetchBooksForAuthor(id);
    fetchBooks();
  }, []);

  const navigate = useNavigate();

  const handleRemoveBook = async (aid, bid) => {
    const { success, message } = await removeBookFromAuthor(aid, bid);
    toaster.create({
      type: success ? "success" : "error",
      title: success ? "Success" : "Error",
      description: message,
      duration: 5000,
    });
  };

  return (
    <Container maxW="container.xl" py={12}>
      {isLoading ? (
        <VStack w="full">
          <Spinner size="xl" color="blue.500" />
        </VStack>
      ) : (
        <VStack w="full">
          <Flex
            w="full"
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            mb="5vh"
            gap={{ base: 4, md: 0 }}
          >
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {author.firstName} {author.lastName}
            </Text>

            <HStack
              gap={5}
              align="center"
              justify="center"
              w={{ base: "full", md: "auto" }}
            >
              <Button
                onClick={() => navigate(`/author/edit/${id}`)}
                bg="transparent"
                _hover={{ bg: "blue.100" }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={FaEdit} boxSize={5} color="blue.500" />
                <Text color="blue.500">Edit</Text>
              </Button>

              <DeleteAuthorContent author={author} />
            </HStack>
          </Flex>
          <SimpleGrid
            columns={{
              base: 1,
              md: 1,
              lg: 2,
            }}
            gap={10}
            w="full"
          >
            <Box
              textAlign="center"
              w="100%"
              display="flex"
              flexDirection="column"
              flexGrow={1}
            >
              <Image
                src={author.image}
                alt="Book image"
                rounded="lg"
                mb={3}
                h="300px"
                objectFit="cover"
                mx="auto"
              />
            </Box>
            <Box
              p={4}
              w={["100%"]}
              display="flex"
              flexDirection="column"
              flexGrow={1}
            >
              <Text fontSize="md">
                <strong>Date of birth:</strong> {formatDate(author.dob)}
              </Text>
              <Text fontSize="md">
                <strong>Books:</strong>
              </Text>
              {isLoadingBooks ? (
                <VStack w="full">
                  <Spinner size="md" color="blue.500" />
                </VStack>
              ) : (
                <Flex
                  direction={{ base: "column", md: "row" }}
                  wrap="wrap"
                  gap={2}
                  w="full"
                >
                  {authorBooks.map((book) => (
                    <Tag.Root size="xl" rounded="full" key={book._id} p={4}>
                      <Tag.Label>
                        <Link to={`/book/${book._id}`}>{book.title}</Link>
                      </Tag.Label>
                      <Tag.EndElement>
                        <Tag.CloseTrigger
                          _hover={{
                            bg: "gray.200",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveBook(id, book._id)}
                        />
                      </Tag.EndElement>
                    </Tag.Root>
                  ))}
                </Flex>
              )}
              <SelectBookContent books={books} author={author} />
            </Box>
          </SimpleGrid>
        </VStack>
      )}
    </Container>
  );
};

export default AuthorDetailsPage;
