import React from "react";
import { Container, Flex, Image, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxW="container.md" py={10}>
      <Flex justify="center" gap={["5", "8"]} flexWrap="wrap">
        <Box
          bg="white"
          p={4}
          rounded="lg"
          shadow="md"
          textAlign="center"
          w={["100%", "40%"]}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Image
            src="https://t3.ftcdn.net/jpg/09/54/38/76/360_F_954387661_BNppWGmskfseOAjjDW6WG1oQbFf5rHkG.jpg"
            alt="Stack of Books"
            rounded="lg"
            mb={3}
            maxW="60%"
            objectFit="cover"
            mx="auto"
          />
          <Button as={Link} to="/books" bg="blue.700" mt="auto">
            Check books
          </Button>
        </Box>

        <Box
          bg="white"
          p={4}
          rounded="lg"
          shadow="md"
          textAlign="center"
          w={["100%", "40%"]}
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <Image
            src="https://www.kindpng.com/picc/m/139-1390994_write-writing-conclusion-clipart-author-clipart-hd-png.png"
            alt="Author writing"
            rounded="lg"
            mb={3}
            maxW="60%"
            objectFit="cover"
            mx="auto"
          />
          <Button as={Link} to="/authors" mt="auto">
            Check authors
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
