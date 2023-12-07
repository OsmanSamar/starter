import { Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
//import { categories } from "./data"; // your data source
import { useLoaderData, Link } from "react-router-dom";
import React, { useState } from "react";

//To display the fetched events on the users’ screen
export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");

  return {
    categories: await categories.json(),
  };
};

export const FilterCategories = () => {
  const { categories } = useLoaderData();

  //Create a state variable to store the search input,
  const [searchCatego, setSearchCatego] = useState("");

  //Create a function to handle the search input,
  const handleSearchCatego = (e) => {
    setSearchCatego(e.target.value);
  };

  return (
    <CheckboxGroup onChange={handleSearchCatego} value={Categories}>
      <Stack direction="column">
        {categories.map((category) => (
          <Checkbox key={category.id} value={category.id}>
            {category.name}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};
