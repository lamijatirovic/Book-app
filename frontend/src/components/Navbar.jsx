import { Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          textTransform={"uppercase"}
          textAlign={"center"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          Personal Library <span style={{ color: "black" }}>📚</span>
        </Text>
        <HStack gap={["10px", "20px", "30px", "40px"]} alignItems="center">
          <Text as={Link} to="/" fontWeight="bold" color={"blue.700"}>
            Home
          </Text>
          <Text as={Link} to="/books" fontWeight="bold" color={"blue.700"}>
            Books
          </Text>
          <Text as={Link} to="/authors" fontWeight="bold" color={"blue.700"}>
            Authors
          </Text>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
