import { Box, Heading, HStack, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg="white"
    >
      <Image src={book.image} h="250px" w="250px" objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {book.title}
        </Heading>

        <HStack spacing={2}>
          <Link to={`/book/${book._id}`}>
            <Text color="blue.500" cursor="pointer">
              Details
            </Text>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};
export default BookCard;
