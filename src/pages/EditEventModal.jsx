import React, { useState, useEffect } from "react";
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
  Text,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

export const EditeventModal = () => {
  // Call the useDisclosure hook and get the isOpen, onOpen, and onClose values
  const { isOpen, onOpen, onClose } = useDisclosure();

  // add the state and logic for the pop-up modal here
  const [editEvent, setEditEvent] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  });

  const toast = useToast(); // call the useToast hook here

  // Use the useEffect hook to set the editEvent state to the event prop
  useEffect(() => {
    if (event) {
      setEditEvent((prev) => ({
        ...prev,
        title: event.title,
        description: event.description,
        image: event.image,
        startTime: event.startTime,
        endTime: event.endTime,
        categoryIds: event.categoryIds,
      }));
    }
  }, []); // only run the effect on initial render

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser behavior
    try {
      // get the data from the form
      const { title, image, categoryIds, startTime, endTime, description } =
        EditEvent;

      console.log(EditEvent);

      // create an object with the data
      const eventData = {
        title,
        image,
        categoryIds: categoryIds.split(",").map((s) => parseInt(s)),

        startTime: new Date(startTime),
        endTime: new Date(endTime),
      };

      // Validate the input data
      // Send the Updated event data to the API or database
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT", // change the method to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      // Show a success message
      toast({
        // call the toast function here
        title: "Event edited.",
        description: "Your event has been successfully edited.",
        status: "success",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
      // Close the modal
      onClose();
    } catch (error) {
      // Show an error message
      toast({
        title: "An error occurred.",
        description: "Something went wrong while editing your event.",
        status: "error",
        duration: 3000,
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Edit an event
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="categoryIds" isRequired>
                <Text>CategoryIds</Text>
                <Input
                  type="text"
                  value={editEvent.categoryIds}
                  onChange={(e) =>
                    setEditEvent((prev) => ({
                      ...prev,
                      categoryIds: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="title" isRequired>
                <Text>Title</Text>
                <Input
                  type="text"
                  value={editEvent.title}
                  onChange={(e) =>
                    setEditEvent((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <Text>Description</Text>
                <Input
                  type="text"
                  value={editEvent.description}
                  onChange={(e) =>
                    setEditEvent((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="image" isRequired>
                <Text>Image URL</Text>
                <Input
                  type="text"
                  value={editEvent.image}
                  onChange={(e) =>
                    setEditEvent((prev) => ({
                      ...prev,
                      image: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl id="startTime" isRequired>
                <Text>Start time</Text>
                <Input
                  type="datetime-local"
                  value={editEvent.startTime}
                  onChange={(e) =>
                    setEditEvent((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl id="endTime" isRequired>
                <Text>End time</Text>
                <Input
                  type="datetime-local"
                  value={editEvent.endTime}
                  onChange={(e) =>
                    setEditEvent((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                />
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
