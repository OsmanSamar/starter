import React, { useRef, useState } from "react";

import {
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
//import { SearchIcon } from "@chakra-ui/icons";
import { useHotkeys } from "react-hotkeys-hook";
import { useTheme } from "@react-navigation/native";

export const SearchBar = () => {
  // use the useDisclosure hook to manage the state of the modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // use the useRef hook to create a reference to the input element
  const inputRef = useRef();

  // use the useHotkeys hook to enable the keyboard shortcuts
  // press "/" to open and focus the modal
  useHotkeys("/", () => {
    onOpen();
    inputRef.current.focus();
  });

  // press "esc" to close the modal
  useHotkeys("esc", () => {
    onClose();
  });

  // use the useTheme hook to access the theme object
  const theme = useTheme();

  //Create a state variable to store the search input,
  const [searchQuery, setSearchQuery] = useState("");

  //Create a function to handle the search input,
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  //Create a function to filter the events based on the search input

  const filterEvents = (events) => {
    // store the result of the filterEvents function in a variable
    let filteredEvents = events.filter((event) => {
      return (
        // check if the name property exists and is a string before calling toLowerCase
        (typeof event.title === "string" &&
          event.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        // check if the description property exists and is a string before calling toLowerCase
        (typeof event.description === "string" &&
          event.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        // check if the categoryIds property exists and is an array before calling toString and toLowerCase
        (Array.isArray(event.categoryIds) &&
          event.categoryIds
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
      );
    });

    // return the filteredEvents array
    return filteredEvents;
  };

  return (
    <>
      {/* This is the icon button that opens the modal */}
      <IconButton
        aria-label="Search"
        icon={<CiSearch />}
        onClick={onOpen}
        // add some custom styles to the icon button
        sx={{
          // change the background color to transparent
          bg: "transparent",
          // change the icon color to white
          color: "white",
          // change the icon size to 24px
          fontSize: "24px",
          // add some margin to the right
          mr: "4",
          // remove the border and box shadow
          border: "none",
          boxShadow: "none",
          // change the hover and focus styles
          _hover: {
            // change the background color to a darker shade of gray
            bg: theme.colors.gray[700],
          },
          _focus: {
            // remove the outline and box shadow
            outline: "none",
            boxShadow: "none",
          },
        }}
      />

      {/* This is the modal that contains the input field and the close button */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          // add some custom styles to the modal content
          sx={{
            // set the width and height to 100%
            w: "100%",
            h: "100%",
            // set the background color to a lighter shade of gray
            bg: theme.colors.gray[100],
            // remove the border and box shadow
            border: "none",
            boxShadow: "none",
            // remove the padding
            p: "0",
          }}
        >
          <ModalCloseButton
            // add some custom styles to the close button
            sx={{
              // change the icon color to black
              color: "black",
              // change the icon size to 32px
              fontSize: "32px",
              // add some margin to the top and right
              mt: "4",
              mr: "4",
              // change the hover and focus styles
              _hover: {
                // change the background color to a lighter shade of gray
                bg: theme.colors.gray[200],
              },
              _focus: {
                // remove the outline and box shadow
                outline: "none",
                boxShadow: "none",
              },
            }}
          />
          {/* This is the input field that takes the search query */}
          <Input
            ref={inputRef}
            placeholder="Search the docs (Press '/' to focus)"
            // add some custom styles to the input field
            sx={{
              // set the width and height to 100%
              w: "100%",
              h: "100%",
              // set the font size to 48px
              fontSize: "48px",
              // set the font weight to bold
              fontWeight: "bold",
              // set the line height to 1
              lineHeight: "1",
              // set the text align to center
              textAlign: "center",
              // remove the border and box shadow
              border: "none",
              boxShadow: "none",
              // change the placeholder color to a darker shade of gray
              _placeholder: {
                color: theme.colors.gray[500],
              },
              // change the hover and focus styles
              _hover: {
                // remove the border and box shadow
                border: "none",
                boxShadow: "none",
              },
              _focus: {
                // remove the outline and box shadow
                outline: "none",
                boxShadow: "none",
              },
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
