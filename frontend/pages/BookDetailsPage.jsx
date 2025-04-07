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
import SelectAuthorContent from "@/components/SelectAuthorContent";
import DeleteBookContent from "@/components/DeleteBookContent";
import { Link } from "react-router-dom";

const BookDetailsPage = () => {
  const { id } = useParams();

  const {
    fetchBook,
    book,
    isLoading,
    fetchAuthorsForBook,
    bookAuthors,
    isLoadingAuthors,
    removeAuthorFromBook,
  } = useBooksStore();
  const { fetchAuthors, authors } = useAuthorsStore();

  useEffect(() => {
    fetchBook(id);
    fetchAuthorsForBook(id);
    fetchAuthors();
  }, []);

  const navigate = useNavigate();

  const handleRemoveAuthor = async (bid, aid) => {
    const { success, message } = await removeAuthorFromBook(bid, aid);
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
              {book.title}
            </Text>

            <HStack
              gap={5}
              align="center"
              justify="center"
              w={{ base: "full", md: "auto" }}
            >
              <Button
                onClick={() => navigate(`/book/edit/${id}`)}
                bg="transparent"
                _hover={{ bg: "blue.100" }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={FaEdit} boxSize={5} color="blue.500" />
                <Text color="blue.500">Edit</Text>
              </Button>

              <DeleteBookContent book={book} />
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
                src={book.image}
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
                <strong>ISBN:</strong> {book.isbn}
              </Text>
              <Text fontSize="md">
                <strong>Pages:</strong> {book.pages}
              </Text>
              <Text fontSize="md">
                <strong>Published:</strong> {book.published}.
              </Text>
              <Text fontSize="md">
                <strong>Authors:</strong>
              </Text>
              {isLoadingAuthors ? (
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
                  {bookAuthors.map((author) => (
                    <Tag.Root size="xl" rounded="full" key={author._id} p={4}>
                      <Tag.Label>
                        <Link to={`/author/${author._id}`}>
                          {author.firstName} {author.lastName}
                        </Link>
                      </Tag.Label>
                      <Tag.EndElement>
                        <Tag.CloseTrigger
                          _hover={{
                            bg: "gray.200",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveAuthor(id, author._id)}
                        />
                      </Tag.EndElement>
                    </Tag.Root>
                  ))}
                </Flex>
              )}
              <SelectAuthorContent authors={authors} book={book} />
            </Box>
          </SimpleGrid>
        </VStack>
      )}
    </Container>
  );
};

export default BookDetailsPage;
