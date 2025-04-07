import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Spinner,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useBooksStore } from "@/store/books";
import { Link } from "react-router-dom";
import BookCard from "@/components/BookCard";

const BooksPage = () => {
  const { fetchBooks, books, isLoading } = useBooksStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <HStack w="full" justify="space-between" align="center" mb="5vh">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Books
          </Text>
          <Link to={`/book/create`}>
            <HStack spacing={2} align="center">
              <Icon as={FaPlus} boxSize={5} color="blue.500" />
              <Text color="blue.500" cursor="pointer">
                Add new book
              </Text>
            </HStack>
          </Link>
        </HStack>

        {isLoading ? (
          <Spinner size="xl" color="blue.500" />
        ) : (
          <SimpleGrid
            columns={{
              base: 2,
              md: 3,
              lg: 6,
            }}
            gap={15}
            w="full"
          >
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
            {books.length === 0 && (
              <Text
                fontSize="xl"
                textAlign="center"
                fontWeight="bold"
                color="gray.500"
              >
                No books found.
              </Text>
            )}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default BooksPage;
