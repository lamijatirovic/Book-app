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
import { useAuthorsStore } from "@/store/authors";
import { Link } from "react-router-dom";
import AuthorCard from "@/components/AuthorCard";

const AuthorsPage = () => {
  const { fetchAuthors, authors, isLoading } = useAuthorsStore();

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <HStack w="full" justify="space-between" align="center" mb="5vh">
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Authors
          </Text>
          <Link to={`/author/create`}>
            <HStack spacing={2} align="center">
              <Icon as={FaPlus} boxSize={5} color="blue.500" />
              <Text color="blue.500" cursor="pointer">
                Add new author
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
            {authors.map((author) => (
              <AuthorCard key={author._id} author={author} />
            ))}
            {authors.length === 0 && (
              <Text
                fontSize="xl"
                textAlign="center"
                fontWeight="bold"
                color="gray.500"
              >
                No authors found.
              </Text>
            )}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default AuthorsPage;
