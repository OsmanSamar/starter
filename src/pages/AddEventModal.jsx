import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  useDisclosure,
  FormLabel,
  useMediaQuery,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export const AddEventModal = () => {
  const navigate = useNavigate(); //Relaoed the page.

  // Call the useDisclosure hook and get the isOpen, onOpen, and onClose values
  const { isOpen, onOpen, onClose } = useDisclosure();

  // To Make the pop-up modal responsive.
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const toast = useToast(); // Call the useToast hook here

  // Add the state and logic for the pop-up modal here
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    location: "",
    categoryIds: "",
  });

  //To validate the form field
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isCategoryIdsValid, setIsCategoryIdsValid] = useState(true);
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isStarttimeValid, setIsStarttimeValid] = useState(true);
  const [isEndtimeValid, setIsEndtimeValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser behavior
    try {
      // Get the data from the form

      const {
        title,
        image,
        categoryIds,
        startTime,
        endTime,
        location,
        description,
      } = newEvent;

      console.log(newEvent);

      // validate the form fields
      if (!title) {
        setIsTitleValid(false);
        return;
      }

      if (!description) {
        setIsDescriptionValid(false);
        return;
      }

      if (!categoryIds) {
        setIsCategoryIdsValid(false);
        return;
      }

      if (!image) {
        setIsImageValid(false);
        return;
      }

      if (!location) {
        setIsLocationValid(false);
        return;
      }

      if (!startTime) {
        setIsStarttimeValid(false);
        return;
      }

      if (!endTime) {
        setIsEndtimeValid(false);
        return;
      }

      // Create an object with the data
      const eventData = {
        title,
        image,
        categoryIds: categoryIds.split(",").map((s) => parseInt(s)),
        description,
        location,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      };

      // Send the new event data to the API or database
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      // Show a success message
      toast({
        // call the toast function here
        title: "Event added.",
        description: "Your event has been successfully created.",
        status: "success",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
      // Close the modal
      onClose();
      // To realod the events page after a delay of 2 seconds.
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      // Show an error message
      toast({
        title: "An error occurred.",
        description: "Something went wrong while adding your event.",
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        colorScheme="teal"
        bg="#008080"
        boxShadow="0 5px 15px rgba(0,0,0,0.5)"
        bgImg="linear-gradient(0deg, #FF7F50 , transparent)"
        position="absolute"
        top="0.5"
        onClick={onOpen}
      >
        Add event
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={isSmallScreen ? "sm" : "md"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl
                id="categoryIds"
                isRequired
                isInvalid={!isCategoryIdsValid}
              >
                <FormLabel>CategoryIds</FormLabel>
                <Input
                  type="text"
                  value={newEvent.categoryIds}
                  onChange={(e) => {
                    setNewEvent((prev) => ({
                      ...prev,
                      categoryIds: e.target.value,
                    }));
                    setIsCategoryIdsValid(true);
                  }}
                />
                {!isCategoryIdsValid && (
                  <FormErrorMessage>CategoryIds is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="title" isRequired isInvalid={!isTitleValid}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => {
                    setNewEvent((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                    setIsTitleValid(true);
                  }}
                />
                {!isTitleValid && (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="description"
                isRequired
                isInvalid={!isDescriptionValid}
              >
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={newEvent.description}
                  onChange={(e) => {
                    setNewEvent((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                    setIsDescriptionValid(true);
                  }}
                />
                {!isDescriptionValid && (
                  <FormErrorMessage>Description is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="location"
                isRequired
                isInvalid={!isLocationValid}
              >
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => {
                    setNewEvent((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }));
                    setIsLocationValid(true);
                  }}
                />
                {!isLocationValid && (
                  <FormErrorMessage>Location is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="image" isRequired isInvalid={!isImageValid}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  placeholder="https://"
                  value={newEvent.image}
                  onChange={(e) => {
                    setNewEvent((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }));
                    setIsImageValid(true);
                  }}
                />
                {!isImageValid && (
                  <FormErrorMessage>Image URL is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                id="starttime"
                isRequired
                isInvalid={!isStarttimeValid}
              >
                <FormLabel>Start time</FormLabel>

                <Input
                  type="datetime-local"
                  value={newEvent.startTime}
                  onChange={(e) => {
                    setNewEvent((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }));
                    setIsStarttimeValid(true);
                  }}
                />
                {!isStarttimeValid && (
                  <FormErrorMessage>Start time is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="endTime" isRequired isInvalid={!isEndtimeValid}>
                <FormLabel>End time</FormLabel>
                <Input
                  type="datetime-local"
                  value={newEvent.endTime}
                  onChange={(e) => {
                    setNewEvent((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }));
                    setIsEndtimeValid(true);
                  }}
                />
                {!isEndtimeValid && (
                  <FormErrorMessage>End time is required.</FormErrorMessage>
                )}
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
