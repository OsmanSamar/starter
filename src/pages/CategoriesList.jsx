import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

//To display the fetched events on the users’ screen
export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");

  return {
    categories: await categories.json(),
  };
};

export const CategoriesList = ({ onSelectCategory }) => {
  const { categories } = useLoaderData();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // const filteredEvents = selectedCategory
  //   ? events.filter((event) => {
  //     const category = categories.find(
  //       (category) => category.id === event.categoryIds[0]
  //     );
  //    return category.name === selectedCategory;
  //   })
  //  : events;

  return (
    <>
      <Flex justifyContent="center">
        {categories.map((category) => (
          <lo key={category.id}>
            <Link to={`/event/${category.id}`}>
              <Button
                colorScheme="teal"
                bg="#008080"
                boxShadow="0 5px 15px rgba(0,0,0,0.5)"
                bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
                padding="1"
                paddingX="2"
                mb="2"
                mx="5"
                top="0.5"
                ml="13"
                onClick={() => handleSelectCategory(category.id)}
              >
                {category.name}
              </Button>
            </Link>
          </lo>
        ))}
        <Button
          colorScheme="teal"
          bg="#008080"
          boxShadow="0 5px 15px rgba(0,0,0,0.5)"
          bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
          padding="1"
          top="0.5"
          ml="13"
          paddingX="2"
          mx="5"
        >
          All
        </Button>
      </Flex>
    </>
  );
};
