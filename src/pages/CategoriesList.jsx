import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";

//To display the fetched events on the users’ screen
export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");

  return {
    categories: await categories.json(),
  };
};

export const CategoriesList = ({ onSelectCategory }) => {
  const { categories } = useLoaderData();

  return (
    <>
      <HStack>
        {categories.map((category) => (
          <lo key={category.id}>
            <Link to={`/event/${category.id}`}>
              <Button
                colorScheme="teal"
                bg="#008080"
                boxShadow="0 5px 15px rgba(0,0,0,0.5)"
                bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
                //position="absolute"
                // padding="3"
                top="0.5"
                ml="13"
                onClick={() => onSelectCategory(category.id)}
              >
                {category.name}
              </Button>
            </Link>
          </lo>
        ))}
      </HStack>
    </>
  );
};
